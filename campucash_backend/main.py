from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from database import (
    users_collection,
    transactions_collection,
    reports_collection,
    departments_collection,
    budgets_collection,
    notifications_collection
)
from auth import router as auth_router, get_current_user
from bson import ObjectId
from datetime import datetime
import uuid
from fastapi.responses import FileResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

app = FastAPI()

# ================= CORS (FIXED) =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")


# ================= SAFE USER (IMPORTANT FIX) =================
def safe_user(request: Request):
    try:
        return get_current_user(request)
    except:
        raise HTTPException(status_code=401, detail="Invalid or missing token")


# ================= SERIALIZER =================
def serialize_doc(doc):
    if isinstance(doc, list):
        return [serialize_doc(d) for d in doc]

    if isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if isinstance(v, ObjectId):
                new_doc[k] = str(v)
            elif isinstance(v, (dict, list)):
                new_doc[k] = serialize_doc(v)
            else:
                new_doc[k] = v
        return new_doc

    return doc


# ================= ROLE CHECK =================
ROLE_PERMISSIONS = {
    "admin": ["ALL"],
    "finance_officer": ["ALL"],
    "accountant": ["add_transaction", "view"],
    "dept_head": ["view"],
    "lab_incharge": ["view"]
}

def check_permission(user, perm):
    return (
        "ALL" in ROLE_PERMISSIONS.get(user["role"], []) or
        perm in ROLE_PERMISSIONS.get(user["role"], [])
    )


# ================= NOTIFICATIONS (FIXED) =================
@app.get("/api/auth/notifications")
async def get_notifications(request: Request):
    user = safe_user(request)

    data = await notifications_collection.find(
        {"department": user["department"]}
    ).to_list(100)

    return serialize_doc(data)


# ================= TRANSACTIONS =================
@app.post("/api/transactions")
async def add_transaction(data: dict, request: Request):

    user = safe_user(request)

    if not check_permission(user, "add_transaction"):
        raise HTTPException(403, "Not allowed")

    amount = float(data["amount"])

    tx = {
        "amount": amount,
        "type": data["type"],
        "purpose": data["purpose"],
        "status": "pending",
        "department": user["department"],
        "lab": user.get("lab"),
        "created_by": user["user_id"],
        "created_at": datetime.utcnow()
    }

    result = await transactions_collection.insert_one(tx)
    tx["_id"] = str(result.inserted_id)

    await budgets_collection.update_one(
        {"department": user["department"]},
        {"$inc": {"used": amount, "remaining": -amount}}
    )

    return serialize_doc(tx)


@app.get("/api/transactions")
async def get_transactions(request: Request):

    user = safe_user(request)

    data = await transactions_collection.find(
        {"department": user["department"]}
    ).to_list(500)

    for d in data:
        d["_id"] = str(d["_id"])
        if "created_at" in d:
            d["created_at"] = d["created_at"].isoformat()

    return serialize_doc(data)


@app.delete("/api/transactions/{id}")
async def delete_transaction(id: str):

    res = await transactions_collection.delete_one({"_id": ObjectId(id)})

    if res.deleted_count == 0:
        raise HTTPException(404, "Not found")

    return {"message": "Deleted"}


@app.put("/api/transactions/{id}/status")
async def update_status(id: str, data: dict, request: Request):

    user = safe_user(request)

    if user["role"] not in ["admin", "finance_officer"]:
        raise HTTPException(403, "Not allowed")

    await transactions_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": data.get("status")}}
    )

    return {"message": "Status updated"}


# ================= DASHBOARD =================
@app.get("/api/dashboard")
async def dashboard(request: Request):

    user = safe_user(request)

    tx = await transactions_collection.find(
        {"department": user["department"]}
    ).to_list(500)

    total_spent = sum(t.get("amount", 0) for t in tx)

    category = {}
    for t in tx:
        key = t.get("purpose", "Other")
        category[key] = category.get(key, 0) + t.get("amount", 0)

    category_data = [
        {"name": k, "value": v} for k, v in category.items()
    ]

    return {
        "total_transactions": len(tx),
        "total_spent": total_spent,
        "category": category_data,
        "department": user["department"]
    }
from fastapi import APIRouter, HTTPException, Request, Depends
from database import (
    users_collection,
    transactions_collection,
    reports_collection,
    departments_collection,
    budgets_collection,
    notifications_collection
)
from models import UserSignup, UserLogin
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import uuid
import hashlib
from bson import ObjectId

router = APIRouter()

# ================= CONFIG =================
SECRET_KEY = "SECRET123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ================= PASSWORD =================
def hash_password(password: str):
    password = password.strip()

    if len(password.encode("utf-8")) > 72:
        password = hashlib.sha256(password.encode()).hexdigest()

    return pwd_context.hash(password)


def verify_password(plain, hashed):
    plain = plain.strip()

    if len(plain.encode("utf-8")) > 72:
        plain = hashlib.sha256(plain.encode()).hexdigest()

    return pwd_context.verify(plain, hashed)

# ================= TOKEN =================
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ================= AUTH =================
def get_current_user(request: Request):
    token = request.headers.get("Authorization")

    if not token:
        raise HTTPException(status_code=401, detail="Token missing")

    try:
        token = token.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if "user_id" not in payload:
            raise HTTPException(status_code=401, detail="Invalid token")

        return payload

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ================= NOTIFICATIONS =================
@router.get("/notifications")
async def get_notifications(user=Depends(get_current_user)):

    notifications = await notifications_collection.find(
        {"department": user["department"]}
    ).to_list(100)

    for n in notifications:
        n["_id"] = str(n["_id"])

    return notifications
@router.post("/notifications")
async def add_notification(data: dict):
    await notifications_collection.insert_one(data)
    return {"msg": "created"}

# ================= REGISTER =================
@router.post("/register")
async def register(user: UserSignup):

    if await users_collection.find_one({"email": user.email}):
        raise HTTPException(400, "User already exists")

    new_user = {
        "user_id": "USER-" + str(uuid.uuid4())[:6],
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role,
        "department": user.department,
        "lab": user.lab,
        "created_at": datetime.utcnow()
    }

    await users_collection.insert_one(new_user)

    return {"message": "User registered successfully"}

# ================= LOGIN =================
@router.post("/login")
async def login(user: UserLogin):

    db_user = await users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(404, "User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(401, "Invalid password")

    token = create_access_token({
        "user_id": db_user["user_id"],
        "role": db_user["role"],
        "department": db_user["department"],
        "lab": db_user.get("lab")
    })

    return {
        "access_token": token,
        "role": db_user["role"],
        "department": db_user["department"],
        "name": db_user["name"]
    }

# ================= REPORTS =================
@router.post("/reports")
async def create_report(data: dict, user=Depends(get_current_user)):

    if "type" not in data or "title" not in data:
        raise HTTPException(422, "title and type required")

    transactions = await transactions_collection.find(
        {"department": user["department"]}
    ).to_list(500)

    for t in transactions:
        t["_id"] = str(t["_id"])

    report_type = data["type"]

    if report_type == "Summary":
        report_data = {
            "total_spent": sum(t.get("amount", 0) for t in transactions),
            "count": len(transactions)
        }

    elif report_type == "Detailed":
        report_data = {"transactions": transactions}

    elif report_type == "Category":
        breakdown = {}
        for t in transactions:
            k = t.get("purpose", "Other")
            breakdown[k] = breakdown.get(k, 0) + t.get("amount", 0)

        report_data = breakdown

    elif report_type == "Audit":
        report_data = {
            "logs": transactions,
            "generated_by": user["user_id"]
        }

    else:
        raise HTTPException(400, "Invalid type")

    report = {
        "id": "REP-" + str(uuid.uuid4())[:6],
        "title": data["title"],
        "type": report_type,
        "department": user["department"],
        "data": report_data,
        "created_at": datetime.utcnow()
    }

    await reports_collection.insert_one(report)

    return report

# ================= GET REPORTS =================
@router.get("/reports")
async def get_reports(user=Depends(get_current_user)):

    data = await reports_collection.find(
        {"department": user["department"]}
    ).to_list(500)

    for d in data:
        d["_id"] = str(d["_id"])

    return data

# ================= DEPARTMENTS =================
@router.post("/departments")
async def add_department(data: dict, user=Depends(get_current_user)):

    if user["role"] != "admin":
        raise HTTPException(403, "Admin only")

    dept = {
    "id": "DEP-" + str(uuid.uuid4())[:6],
    "name": data["name"],
    "budget": data.get("budget", 0),   # ADD THIS
    "labs": data.get("labs", []),
    "created_at": datetime.utcnow()
}

    await departments_collection.insert_one(dept)

    return dept
@router.get("/departments")
async def get_departments(user=Depends(get_current_user)):

    data = await departments_collection.find().to_list(100)

    for d in data:
        d["_id"] = str(d["_id"])

    return data
@router.delete("/departments/{id}")
async def delete_department(id: str, user=Depends(get_current_user)):

    if user["role"] != "admin":
        raise HTTPException(403, "Admin only")

    res = await departments_collection.delete_one({"_id": ObjectId(id)})

    if res.deleted_count == 0:
        raise HTTPException(404, "Not found")

    return {"message": "Deleted"}
@router.get("/budgets")
async def get_budgets(user=Depends(get_current_user)):

    budgets = await budgets_collection.find(
        {"department": user["department"]}
    ).to_list(100)

    for b in budgets:
        b["_id"] = str(b["_id"])

    return budgets
@router.post("/budgets/init")
async def init_budget(user=Depends(get_current_user)):

    existing = await budgets_collection.find_one(
        {"department": user["department"]}
    )

    if existing:
        return {"message": "Already exists"}

    budget = {
        "department": user["department"],
        "allocated": 100000,
        "spent": 0,
        "created_at": datetime.utcnow()
    }

    await budgets_collection.insert_one(budget)

    return budget
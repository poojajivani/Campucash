from pydantic import BaseModel, EmailStr, field_validator, constr
from typing import Optional, List


# ================= USER =================
class UserSignup(BaseModel):
    name: str
    email: EmailStr

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v):
        return v.lower().strip()

    password: constr(min_length=6, max_length=72)

    role: str
    department: str
    lab: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=6, max_length=72)


# ================= TRANSACTION =================
class Transaction(BaseModel):
    amount: float
    type: str   # income / expense

    department: str
    lab: Optional[str] = None

    purpose: str


# ================= REPORT =================
class Report(BaseModel):
    title: str
    department: str
    lab: Optional[str] = None

    transactions: Optional[List[str]] = None
    summary: Optional[str] = None


# ================= DEPARTMENT =================
class Department(BaseModel):
    name: str
    labs: List[str]
    budget: Optional[float] = 0
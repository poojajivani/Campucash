from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27018"

client = AsyncIOMotorClient(MONGO_URL)

db = client["campucash_db"]

transactions_collection = db["transactions"]
reports_collection = db["reports"]
departments_collection = db["departments"]
users_collection = db["users"]
budgets_collection = db["budgets"]
notifications_collection = db["notifications"]
from fastapi import APIRouter, Depends
from auth import get_current_student
from models import User

router = APIRouter()

@router.get("/dashboard")
async def get_student_dashboard(current_user: User = Depends(get_current_student)):
    """Get student dashboard data."""
    return {
        "message": f"Welcome to student dashboard, {current_user.full_name or current_user.username}!",
        "user": {
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "role": current_user.role
        }
    }
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_chatbot():
    """Get chatbot - placeholder."""
    return {"message": "Chatbot endpoints - coming soon"}
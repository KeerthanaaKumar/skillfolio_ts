from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_events():
    """Get events - placeholder."""
    return {"message": "Events endpoints - coming soon"}
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_portfolios():
    """Get portfolios - placeholder."""
    return {"message": "Portfolio endpoints - coming soon"}
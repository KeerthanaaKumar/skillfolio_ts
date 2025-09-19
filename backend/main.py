from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, students, faculty, portfolio, chatbot, events

app = FastAPI(title="SkillFolio API", version="1.0.0")

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(students.router, prefix="/students", tags=["students"])
app.include_router(faculty.router, prefix="/faculty", tags=["faculty"])
app.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"])
app.include_router(events.router, prefix="/events", tags=["events"])

@app.get("/")
async def root():
    return {"message": "Welcome to SkillFolio API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
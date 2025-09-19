#!/usr/bin/env python3
"""
Script to run the SkillFolio FastAPI server
"""
import uvicorn
from database import create_tables

if __name__ == "__main__":
    # Create database tables
    print("Creating database tables...")
    create_tables()
    print("Database tables created successfully!")
    
    # Run the server
    print("Starting SkillFolio API server...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
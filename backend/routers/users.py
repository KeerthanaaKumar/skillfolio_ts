from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User, StudentProfile, FacultyProfile
from schemas import (
    UserCreate, UserLogin, UserResponse, UserWithProfile, 
    Token, StudentProfileCreate, FacultyProfileCreate
)
from auth import (
    get_password_hash, authenticate_user, create_access_token,
    get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES,
    get_user_by_username, get_user_by_email
)

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user (student or faculty)."""
    
    # Check if username already exists
    if get_user_by_username(db, user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email already exists
    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Validate role
    if user.role not in ["student", "faculty"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be either 'student' or 'faculty'"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role,
        full_name=user.full_name
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create profile based on role
    if user.role == "student":
        student_profile = StudentProfile(user_id=db_user.id)
        db.add(student_profile)
    elif user.role == "faculty":
        faculty_profile = FacultyProfile(user_id=db_user.id)
        db.add(faculty_profile)
    
    db.commit()
    
    return db_user

@router.post("/login", response_model=Token)
async def login_user(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user and return JWT token."""
    
    user = authenticate_user(db, user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is inactive"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserWithProfile)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information with profile."""
    return current_user

@router.get("/profile")
async def get_user_profile(current_user: User = Depends(get_current_user)):
    """Get user profile based on role."""
    if current_user.role == "student":
        return current_user.student_profile
    elif current_user.role == "faculty":
        return current_user.faculty_profile
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )

@router.put("/profile")
async def update_user_profile(
    profile_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile based on role."""
    
    if current_user.role == "student":
        profile = db.query(StudentProfile).filter(
            StudentProfile.user_id == current_user.id
        ).first()
        
        if not profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Student profile not found"
            )
        
        # Update allowed fields
        allowed_fields = ["student_id", "major", "year_of_study", "gpa", "university", "bio"]
        for field, value in profile_data.items():
            if field in allowed_fields and hasattr(profile, field):
                setattr(profile, field, value)
    
    elif current_user.role == "faculty":
        profile = db.query(FacultyProfile).filter(
            FacultyProfile.user_id == current_user.id
        ).first()
        
        if not profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Faculty profile not found"
            )
        
        # Update allowed fields
        allowed_fields = ["employee_id", "department", "position", "university"]
        for field, value in profile_data.items():
            if field in allowed_fields and hasattr(profile, field):
                setattr(profile, field, value)
    
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user role"
        )
    
    db.commit()
    db.refresh(profile)
    
    return {"message": "Profile updated successfully", "profile": profile}
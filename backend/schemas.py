from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str  # 'student' or 'faculty'

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Student Profile schemas
class StudentProfileBase(BaseModel):
    student_id: Optional[str] = None
    major: Optional[str] = None
    year_of_study: Optional[str] = None
    gpa: Optional[str] = None
    university: Optional[str] = None
    bio: Optional[str] = None

class StudentProfileCreate(StudentProfileBase):
    pass

class StudentProfileResponse(StudentProfileBase):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

# Faculty Profile schemas
class FacultyProfileBase(BaseModel):
    employee_id: Optional[str] = None
    department: Optional[str] = None
    position: Optional[str] = None
    university: Optional[str] = None

class FacultyProfileCreate(FacultyProfileBase):
    pass

class FacultyProfileResponse(FacultyProfileBase):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

# Complete User with Profile
class UserWithProfile(UserResponse):
    student_profile: Optional[StudentProfileResponse] = None
    faculty_profile: Optional[FacultyProfileResponse] = None
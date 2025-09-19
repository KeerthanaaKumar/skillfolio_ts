#!/usr/bin/env python3
"""
Test script for SkillFolio API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    print("🚀 Testing SkillFolio API...")
    
    # Test 1: Health check
    print("\n1. Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"✅ Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return
    
    # Test 2: Register student
    print("\n2. Registering student...")
    student_data = {
        "username": "john_student",
        "email": "john@student.edu",
        "password": "password123",
        "role": "student",
        "full_name": "John Student"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/users/register", json=student_data)
        if response.status_code == 200:
            print(f"✅ Student registered: {response.json()['username']}")
        else:
            print(f"⚠️ Student registration: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Student registration failed: {e}")
    
    # Test 3: Register faculty
    print("\n3. Registering faculty...")
    faculty_data = {
        "username": "prof_smith",
        "email": "smith@faculty.edu",
        "password": "password123",
        "role": "faculty",
        "full_name": "Professor Smith"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/users/register", json=faculty_data)
        if response.status_code == 200:
            print(f"✅ Faculty registered: {response.json()['username']}")
        else:
            print(f"⚠️ Faculty registration: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Faculty registration failed: {e}")
    
    # Test 4: Login student
    print("\n4. Testing student login...")
    login_data = {
        "username": "john_student",
        "password": "password123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/users/login", json=login_data)
        if response.status_code == 200:
            student_token = response.json()["access_token"]
            print(f"✅ Student login successful")
            
            # Test 5: Get student info
            print("\n5. Testing /users/me for student...")
            headers = {"Authorization": f"Bearer {student_token}"}
            response = requests.get(f"{BASE_URL}/users/me", headers=headers)
            if response.status_code == 200:
                user_info = response.json()
                print(f"✅ Student info: {user_info['username']} ({user_info['role']})")
            else:
                print(f"❌ Get student info failed: {response.status_code}")
                
            # Test 6: Access student dashboard
            print("\n6. Testing student dashboard...")
            response = requests.get(f"{BASE_URL}/students/dashboard", headers=headers)
            if response.status_code == 200:
                print(f"✅ Student dashboard: {response.json()['message']}")
            else:
                print(f"❌ Student dashboard failed: {response.status_code}")
                
        else:
            print(f"❌ Student login failed: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Student login failed: {e}")
    
    # Test 7: Login faculty
    print("\n7. Testing faculty login...")
    login_data = {
        "username": "prof_smith",
        "password": "password123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/users/login", json=login_data)
        if response.status_code == 200:
            faculty_token = response.json()["access_token"]
            print(f"✅ Faculty login successful")
            
            # Test 8: Get faculty info
            print("\n8. Testing /users/me for faculty...")
            headers = {"Authorization": f"Bearer {faculty_token}"}
            response = requests.get(f"{BASE_URL}/users/me", headers=headers)
            if response.status_code == 200:
                user_info = response.json()
                print(f"✅ Faculty info: {user_info['username']} ({user_info['role']})")
            else:
                print(f"❌ Get faculty info failed: {response.status_code}")
                
            # Test 9: Access faculty dashboard
            print("\n9. Testing faculty dashboard...")
            response = requests.get(f"{BASE_URL}/faculty/dashboard", headers=headers)
            if response.status_code == 200:
                print(f"✅ Faculty dashboard: {response.json()['message']}")
            else:
                print(f"❌ Faculty dashboard failed: {response.status_code}")
                
        else:
            print(f"❌ Faculty login failed: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Faculty login failed: {e}")
    
    print("\n🎉 API testing completed!")

if __name__ == "__main__":
    test_api()
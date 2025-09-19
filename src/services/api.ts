import axios, { AxiosResponse, AxiosError } from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  role: 'student' | 'faculty';
  is_active: boolean;
  created_at: string;
  student_profile?: StudentProfile;
  faculty_profile?: FacultyProfile;
}

export interface StudentProfile {
  id: number;
  user_id: number;
  student_id?: string;
  major?: string;
  year_of_study?: string;
  gpa?: string;
  university?: string;
  bio?: string;
}

export interface FacultyProfile {
  id: number;
  user_id: number;
  employee_id?: string;
  department?: string;
  position?: string;
  university?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'student' | 'faculty';
  full_name?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// API functions
export const authAPI = {
  // Register new user
  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post<User>('/users/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/users/login', data);
    return response.data;
  },

  // Get current user info
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  // Get user profile
  getUserProfile: async (): Promise<StudentProfile | FacultyProfile> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (data: Partial<StudentProfile | FacultyProfile>) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
};

export const studentAPI = {
  // Get student dashboard
  getDashboard: async () => {
    const response = await api.get('/students/dashboard');
    return response.data;
  },
};

export const facultyAPI = {
  // Get faculty dashboard
  getDashboard: async () => {
    const response = await api.get('/faculty/dashboard');
    return response.data;
  },
};

// Utility functions
export const setAuthToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export default api;
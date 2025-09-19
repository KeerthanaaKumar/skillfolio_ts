import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { GraduationCap, Users } from 'lucide-react';

interface LoginProps {
  onLogin: (userType: 'student' | 'faculty', credentials: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [studentForm, setStudentForm] = useState({ email: '', password: '' });
  const [facultyForm, setFacultyForm] = useState({ email: '', password: '' });

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('student', studentForm);
  };

  const handleFacultyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('faculty', facultyForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome to Skillfolio</CardTitle>
          <CardDescription className="text-gray-600">
            Smart Student Hub - Manage your academic achievements
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </TabsTrigger>
              <TabsTrigger value="faculty" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Faculty</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@university.edu"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Enter your password"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Login as Student
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="faculty">
              <form onSubmit={handleFacultyLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty-email">Email</Label>
                  <Input
                    id="faculty-email"
                    type="email"
                    placeholder="faculty@university.edu"
                    value={facultyForm.email}
                    onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faculty-password">Password</Label>
                  <Input
                    id="faculty-password"
                    type="password"
                    placeholder="Enter your password"
                    value={facultyForm.password}
                    onChange={(e) => setFacultyForm({ ...facultyForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Login as Faculty
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Demo credentials: student@demo.com / faculty@demo.com (password: demo123)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
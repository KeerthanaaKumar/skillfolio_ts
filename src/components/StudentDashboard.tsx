import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Calendar, Briefcase, Heart, TrendingUp, Star } from 'lucide-react';

export function StudentDashboard() {
  const student = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    avatar: "/api/placeholder/100/100",
    impactIndex: 8.7,
    yearOfStudy: "3rd Year",
    major: "Computer Science"
  };

  const quickStats = [
    { label: "Certifications Earned", value: 12, icon: Award, color: "text-blue-600" },
    { label: "Events Attended", value: 28, icon: Calendar, color: "text-teal-600" },
    { label: "Internships Completed", value: 2, icon: Briefcase, color: "text-purple-600" },
    { label: "Volunteering Hours", value: 145, icon: Heart, color: "text-orange-600" }
  ];

  const participationData = [
    { name: 'Conferences', value: 8, color: '#2563EB' },
    { name: 'Certifications', value: 12, color: '#14B8A6' },
    { name: 'Competitions', value: 5, color: '#f59e0b' },
    { name: 'Leadership', value: 3, color: '#8b5cf6' },
    { name: 'Community Service', value: 6, color: '#ef4444' }
  ];

  const monthlyTrends = [
    { month: 'Jan', activities: 4 },
    { month: 'Feb', activities: 6 },
    { month: 'Mar', activities: 8 },
    { month: 'Apr', activities: 5 },
    { month: 'May', activities: 9 },
    { month: 'Jun', activities: 7 }
  ];

  const recentAchievements = [
    { title: "AWS Cloud Practitioner", type: "Certification", date: "2 days ago", status: "verified" },
    { title: "Tech Conference 2024", type: "Conference", date: "1 week ago", status: "verified" },
    { title: "Hackathon Winner", type: "Competition", date: "2 weeks ago", status: "pending" },
    { title: "Food Bank Volunteer", type: "Community Service", date: "3 weeks ago", status: "verified" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {student.name}!</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Impact Index</p>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-2xl font-bold text-gray-900">{student.impactIndex}</span>
          </div>
        </div>
      </div>

      {/* Profile Summary Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-blue-100">{student.major} • {student.yearOfStudy}</p>
              <p className="text-blue-200 text-sm">{student.email}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{student.impactIndex}</div>
              <p className="text-blue-200 text-sm">Impact Index</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Participation</CardTitle>
            <CardDescription>Breakdown of your activities by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={participationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {participationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity Trends</CardTitle>
            <CardDescription>Your activity participation over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activities" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Recent Achievements</span>
          </CardTitle>
          <CardDescription>Your latest accomplishments and their verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.type} • {achievement.date}</p>
                </div>
                <Badge 
                  variant={achievement.status === 'verified' ? 'default' : 'secondary'}
                  className={achievement.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {achievement.status === 'verified' ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
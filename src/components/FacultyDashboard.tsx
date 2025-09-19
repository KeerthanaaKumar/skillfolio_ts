import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { CheckCircle, XCircle, Clock, Users, FileText, TrendingUp, Download, Eye } from 'lucide-react';

export function FacultyDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const pendingSubmissions = [
    {
      id: 1,
      studentName: "Alex Johnson",
      studentId: "CS2021001",
      title: "Hackathon Winner Certificate",
      type: "Competitions",
      dateSubmitted: "2024-01-05",
      description: "First place winner in university hackathon",
      document: "hackathon-winner.pdf"
    },
    {
      id: 2,
      studentName: "Sarah Chen",
      studentId: "CS2021002", 
      title: "Google Data Analytics Certificate",
      type: "Certifications",
      dateSubmitted: "2024-01-08",
      description: "Google Career Certificate in Data Analytics",
      document: "google-cert-data.pdf"
    },
    {
      id: 3,
      studentName: "Mike Rodriguez",
      studentId: "CS2020045",
      title: "Student Council President",
      type: "Leadership",
      dateSubmitted: "2024-01-10",
      description: "Elected as Student Council President for academic year 2024",
      document: "election-certificate.pdf"
    },
    {
      id: 4,
      studentName: "Emily Davis",
      studentId: "CS2021078",
      title: "Food Bank Volunteer",
      type: "Community Service",
      dateSubmitted: "2024-01-12",
      description: "150 hours of community service at local food bank",
      document: "volunteer-hours.pdf"
    }
  ];

  const verificationStats = {
    pending: 12,
    approved: 89,
    rejected: 8,
    totalThisMonth: 109
  };

  const submissionTrends = [
    { month: 'Aug', submissions: 45 },
    { month: 'Sep', submissions: 52 },
    { month: 'Oct', submissions: 67 },
    { month: 'Nov', submissions: 43 },
    { month: 'Dec', submissions: 38 },
    { month: 'Jan', submissions: 63 }
  ];

  const categoryData = [
    { name: 'Certifications', value: 35, color: '#2563EB' },
    { name: 'Conferences', value: 22, color: '#14B8A6' },
    { name: 'Competitions', value: 18, color: '#f59e0b' },
    { name: 'Leadership', value: 12, color: '#8b5cf6' },
    { name: 'Community Service', value: 13, color: '#ef4444' }
  ];

  const studentActivity = [
    { month: 'Aug', activeStudents: 234 },
    { month: 'Sep', activeStudents: 267 },
    { month: 'Oct', activeStudents: 289 },
    { month: 'Nov', activeStudents: 245 },
    { month: 'Dec', activeStudents: 198 },
    { month: 'Jan', activeStudents: 312 }
  ];

  const topPerformers = [
    { name: "Alex Johnson", impactIndex: 9.2, submissions: 15 },
    { name: "Sarah Chen", impactIndex: 8.9, submissions: 12 },
    { name: "Mike Rodriguez", impactIndex: 8.7, submissions: 14 },
    { name: "Emily Davis", impactIndex: 8.5, submissions: 11 },
    { name: "David Kim", impactIndex: 8.3, submissions: 9 }
  ];

  const handleApprove = (submissionId: number) => {
    console.log(`Approved submission ${submissionId}`);
  };

  const handleReject = (submissionId: number) => {
    console.log(`Rejected submission ${submissionId}`);
  };

  const handleViewDocument = (document: string) => {
    console.log(`Viewing document: ${document}`);
  };

  const handleExportReport = () => {
    console.log('Exporting analytics report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600">Verification and analytics overview</p>
        </div>
        <Button onClick={handleExportReport} className="bg-teal-600 hover:bg-teal-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-900">{verificationStats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Approved</p>
                <p className="text-2xl font-bold text-green-900">{verificationStats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Rejected</p>
                <p className="text-2xl font-bold text-red-900">{verificationStats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total This Month</p>
                <p className="text-2xl font-bold text-blue-900">{verificationStats.totalThisMonth}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verification" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="verification">Verification Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Pending Submissions ({pendingSubmissions.length})</span>
              </CardTitle>
              <CardDescription>
                Review and verify student achievement submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingSubmissions.map((submission) => (
                  <Card key={submission.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">{submission.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {submission.type}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p><strong>Student:</strong> {submission.studentName} ({submission.studentId})</p>
                            <p><strong>Submitted:</strong> {new Date(submission.dateSubmitted).toLocaleDateString()}</p>
                            <p><strong>Document:</strong> {submission.document}</p>
                          </div>
                          <p className="text-gray-700">{submission.description}</p>
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDocument(submission.document)}
                            className="flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(submission.id)}
                            className="bg-green-600 hover:bg-green-700 flex items-center space-x-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(submission.id)}
                            className="flex items-center space-x-1"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Analytics Dashboard</h3>
                <div className="flex items-center space-x-4">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="semester">This Semester</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleExportReport} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submission Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
                <CardDescription>Monthly submission volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="submissions" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Categories</CardTitle>
                <CardDescription>Breakdown by achievement type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Student Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Active Students</CardTitle>
                <CardDescription>Number of students with submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="activeStudents" stroke="#14B8A6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest Impact Index</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.submissions} submissions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-600">{student.impactIndex}</p>
                        <p className="text-xs text-gray-500">Impact Index</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Summary Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-sm text-gray-600">Active This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">89%</p>
                  <p className="text-sm text-gray-600">Approval Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">2.3</p>
                  <p className="text-sm text-gray-600">Avg Days to Verify</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
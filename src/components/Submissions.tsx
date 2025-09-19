import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, FileText, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';

export function Submissions() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const activityTypes = [
    'Conferences',
    'Certifications', 
    'Competitions',
    'Leadership',
    'Community Service',
    'Internships',
    'Research'
  ];

  const submissions = [
    {
      id: 1,
      title: "AWS Cloud Practitioner Certificate",
      type: "Certifications",
      dateSubmitted: "2024-01-15",
      status: "approved",
      description: "AWS Cloud Practitioner certification earned through online training",
      document: "aws-cert-2024.pdf"
    },
    {
      id: 2,
      title: "Tech Conference 2024 Attendance",
      type: "Conferences",
      dateSubmitted: "2024-01-10",
      status: "approved",
      description: "Attended 3-day technology conference with keynote speakers",
      document: "conference-certificate.pdf"
    },
    {
      id: 3,
      title: "Hackathon Winner Certificate",
      type: "Competitions",
      dateSubmitted: "2024-01-05",
      status: "pending",
      description: "First place winner in university hackathon",
      document: "hackathon-winner.pdf"
    },
    {
      id: 4,
      title: "Summer Internship at TechCorp",
      type: "Internships",
      dateSubmitted: "2023-12-20",
      status: "rejected",
      description: "3-month software development internship",
      document: "internship-letter.pdf",
      feedback: "Please provide official letter with company letterhead"
    },
    {
      id: 5,
      title: "Student Council President",
      type: "Leadership",
      dateSubmitted: "2024-01-08",
      status: "pending",
      description: "Elected as Student Council President for academic year 2024",
      document: "election-certificate.pdf"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const typeMatch = selectedType === 'all' || submission.type === selectedType;
    const statusMatch = selectedStatus === 'all' || submission.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const statusCounts = {
    approved: submissions.filter(s => s.status === 'approved').length,
    pending: submissions.filter(s => s.status === 'pending').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
          <p className="text-gray-600">Upload and track your achievement submissions</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Approved</p>
                <p className="text-2xl font-bold text-green-900">{statusCounts.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">{statusCounts.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Rejected</p>
                <p className="text-2xl font-bold text-red-900">{statusCounts.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="view">View Submissions</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="type-filter">Filter by Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {activityTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="status-filter">Filter by Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{submission.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {submission.type}
                        </Badge>
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1 capitalize">{submission.status}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{submission.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Submitted: {new Date(submission.dateSubmitted).toLocaleDateString()}</span>
                        <span>Document: {submission.document}</span>
                      </div>
                      {submission.feedback && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Feedback:</strong> {submission.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload New Submission</span>
              </CardTitle>
              <CardDescription>
                Submit your certificates, internship letters, or other proof of achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Achievement Title</Label>
                  <Input id="title" placeholder="e.g., AWS Cloud Practitioner Certificate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Activity Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide details about your achievement, including dates, skills learned, and impact..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="document">Upload Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop your document
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG files up to 10MB
                  </p>
                  <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Submit for Review</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
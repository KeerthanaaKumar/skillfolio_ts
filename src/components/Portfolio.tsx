import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download, Share2, QrCode, Eye, Award, Calendar, Briefcase, Heart, ExternalLink } from 'lucide-react';

export function Portfolio() {
  const [portfolioStyle, setPortfolioStyle] = useState('modern');

  const studentData = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/150/150",
    university: "Tech University",
    major: "Computer Science",
    yearOfStudy: "3rd Year",
    gpa: "3.8/4.0",
    impactIndex: 8.7,
    bio: "Passionate computer science student with experience in full-stack development, AI/ML, and community leadership. Committed to using technology for social good and sustainable development."
  };

  const achievements = {
    certifications: [
      {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2024-01-15",
        credentialId: "AWS-CCP-2024-001",
        skills: ["Cloud Computing", "AWS Services"]
      },
      {
        title: "Google Data Analytics Certificate",
        issuer: "Google Career Certificates",
        date: "2023-11-20",
        credentialId: "GDA-2023-456",
        skills: ["Data Analysis", "SQL", "Tableau"]
      },
      {
        title: "Scrum Master Certified",
        issuer: "Scrum Alliance",
        date: "2023-09-10",
        credentialId: "CSM-789-2023",
        skills: ["Project Management", "Agile", "Leadership"]
      }
    ],
    conferences: [
      {
        title: "Global Tech Conference 2023",
        organizer: "TechWorld Inc.",
        date: "2023-10-15",
        location: "San Francisco, CA",
        type: "Attendee"
      },
      {
        title: "Women in Tech Summit",
        organizer: "WIT Foundation",
        date: "2023-08-22",
        location: "Virtual",
        type: "Speaker"
      }
    ],
    competitions: [
      {
        title: "University Hackathon 2023",
        organizer: "Computer Science Department",
        date: "2023-11-05",
        position: "1st Place",
        project: "EcoTrack - Sustainability Tracker App"
      },
      {
        title: "National Coding Competition",
        organizer: "CodeMaster Inc.",
        date: "2023-07-18",
        position: "Top 10",
        project: "Algorithm Optimization Challenge"
      }
    ],
    internships: [
      {
        title: "Software Development Intern",
        company: "TechStart Inc.",
        duration: "June 2023 - August 2023",
        description: "Developed React components and REST APIs for customer portal",
        technologies: ["React", "Node.js", "MongoDB"]
      }
    ],
    volunteering: [
      {
        title: "Coding Mentor",
        organization: "Code.org",
        duration: "September 2023 - Present",
        hours: 120,
        description: "Teaching programming basics to underserved students"
      },
      {
        title: "Food Bank Volunteer",
        organization: "City Food Bank",
        duration: "January 2023 - Present",
        hours: 85,
        description: "Weekly food distribution and inventory management"
      }
    ],
    leadership: [
      {
        title: "Student Council President",
        organization: "Tech University Student Government",
        duration: "January 2024 - Present",
        description: "Leading student body of 15,000 students, organizing events and advocating for student needs"
      },
      {
        title: "CS Club Vice President",
        organization: "Computer Science Club",
        duration: "September 2023 - December 2023",
        description: "Organized coding workshops and tech talks for 200+ members"
      }
    ]
  };

  const handleDownloadPDF = () => {
    // Mock PDF download functionality
    console.log('Downloading portfolio as PDF...');
  };

  const handleShareLink = () => {
    // Mock share link functionality
    const portfolioUrl = `https://skillfolio.app/portfolio/${studentData.email}`;
    navigator.clipboard.writeText(portfolioUrl);
    console.log('Portfolio link copied to clipboard');
  };

  const handleGenerateQR = () => {
    // Mock QR code generation
    console.log('Generating QR code...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Generator</h1>
          <p className="text-gray-600">Generate and share your verified academic portfolio</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleGenerateQR}>
            <QrCode className="w-4 h-4 mr-2" />
            QR Code
          </Button>
          <Button variant="outline" onClick={handleShareLink}>
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Portfolio Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          {/* Portfolio Preview */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-blue-100">
                  <AvatarImage src={studentData.avatar} alt={studentData.name} />
                  <AvatarFallback className="text-2xl bg-blue-600 text-white">
                    {studentData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{studentData.name}</h1>
                <p className="text-lg text-gray-600 mb-2">
                  {studentData.major} • {studentData.yearOfStudy}
                </p>
                <p className="text-blue-600 font-medium mb-4">{studentData.university}</p>
                <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
                  <span>{studentData.email}</span>
                  <span>{studentData.phone}</span>
                  <span>GPA: {studentData.gpa}</span>
                  <div className="flex items-center space-x-1">
                    <span>Impact Index:</span>
                    <span className="font-bold text-yellow-600">{studentData.impactIndex}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed">{studentData.bio}</p>
              </div>

              {/* Achievements Sections */}
              <div className="space-y-8">
                {/* Certifications */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Certifications ({achievements.certifications.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.certifications.map((cert, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                          <p className="text-sm text-gray-600">{cert.issuer}</p>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(cert.date).toLocaleDateString()} • ID: {cert.credentialId}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Competitions */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-600" />
                    Competitions & Awards ({achievements.competitions.length})
                  </h2>
                  <div className="space-y-3">
                    {achievements.competitions.map((comp, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{comp.title}</h3>
                              <p className="text-sm text-gray-600">{comp.organizer}</p>
                              <p className="text-sm text-gray-500">{new Date(comp.date).toLocaleDateString()}</p>
                              {comp.project && (
                                <p className="text-sm text-gray-700 mt-1">
                                  <strong>Project:</strong> {comp.project}
                                </p>
                              )}
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {comp.position}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Internships */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                    Professional Experience ({achievements.internships.length})
                  </h2>
                  <div className="space-y-3">
                    {achievements.internships.map((internship, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900">{internship.title}</h3>
                          <p className="text-sm text-gray-600">{internship.company}</p>
                          <p className="text-sm text-gray-500 mb-2">{internship.duration}</p>
                          <p className="text-sm text-gray-700 mb-2">{internship.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {internship.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Leadership */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-green-600" />
                    Leadership Experience ({achievements.leadership.length})
                  </h2>
                  <div className="space-y-3">
                    {achievements.leadership.map((leadership, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900">{leadership.title}</h3>
                          <p className="text-sm text-gray-600">{leadership.organization}</p>
                          <p className="text-sm text-gray-500 mb-2">{leadership.duration}</p>
                          <p className="text-sm text-gray-700">{leadership.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Community Service */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-600" />
                    Community Service ({achievements.volunteering.reduce((total, vol) => total + vol.hours, 0)} hours)
                  </h2>
                  <div className="space-y-3">
                    {achievements.volunteering.map((vol, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{vol.title}</h3>
                              <p className="text-sm text-gray-600">{vol.organization}</p>
                              <p className="text-sm text-gray-500 mb-2">{vol.duration}</p>
                              <p className="text-sm text-gray-700">{vol.description}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {vol.hours} hours
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Choose how you want to share your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button onClick={handleDownloadPDF} className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download as PDF
                  </Button>
                  <Button variant="outline" onClick={handleShareLink} className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Generate Shareable Link
                  </Button>
                  <Button variant="outline" onClick={handleGenerateQR} className="w-full justify-start">
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Statistics</CardTitle>
                <CardDescription>
                  Overview of your achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Certifications</span>
                    <span className="font-semibold">{achievements.certifications.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Competitions Won</span>
                    <span className="font-semibold">{achievements.competitions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Professional Experience</span>
                    <span className="font-semibold">{achievements.internships.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Leadership Roles</span>
                    <span className="font-semibold">{achievements.leadership.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Volunteer Hours</span>
                    <span className="font-semibold">
                      {achievements.volunteering.reduce((total, vol) => total + vol.hours, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium text-gray-900">Impact Index</span>
                    <span className="font-bold text-yellow-600">{studentData.impactIndex}/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Share Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Share Your Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Download PDF</p>
                    <p>Perfect for job applications, scholarship applications, and offline sharing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium text-gray-900">Share Link</p>
                    <p>Share a live, interactive version of your portfolio that updates automatically.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium text-gray-900">QR Code</p>
                    <p>Great for networking events, business cards, and presentations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
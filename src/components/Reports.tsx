import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Download, FileText, TrendingUp, Award, Calendar, Target, Users } from 'lucide-react';

export function Reports() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('semester');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const timeframes = ['week', 'month', 'semester', 'year', 'all-time'];
  const categories = ['all', 'certifications', 'conferences', 'competitions', 'leadership', 'community-service'];

  const personalStats = {
    totalAchievements: 34,
    verifiedAchievements: 28,
    pendingAchievements: 4,
    rejectedAchievements: 2,
    impactIndex: 8.7,
    rank: 12,
    totalStudents: 2847,
    percentile: 96
  };

  const skillDistribution = [
    { skill: 'Programming', level: 85, achievements: 12 },
    { skill: 'Data Science', level: 78, achievements: 8 },
    { skill: 'Project Management', level: 72, achievements: 6 },
    { skill: 'Leadership', level: 88, achievements: 5 },
    { skill: 'Communication', level: 75, achievements: 7 },
    { skill: 'Problem Solving', level: 82, achievements: 9 }
  ];

  const yearlyProgress = [
    { year: '2022', achievements: 8, impactIndex: 6.2 },
    { year: '2023', achievements: 15, impactIndex: 7.4 },
    { year: '2024', achievements: 11, impactIndex: 8.7 }
  ];

  const monthlyActivity = [
    { month: 'Aug', activities: 3, hours: 45 },
    { month: 'Sep', activities: 5, hours: 68 },
    { month: 'Oct', activities: 4, hours: 52 },
    { month: 'Nov', activities: 2, hours: 28 },
    { month: 'Dec', activities: 1, hours: 15 },
    { month: 'Jan', activities: 6, hours: 78 }
  ];

  const achievementTypes = [
    { name: 'Certifications', value: 12, color: '#2563EB', percentage: 35 },
    { name: 'Conferences', value: 8, color: '#14B8A6', percentage: 24 },
    { name: 'Competitions', value: 5, color: '#f59e0b', percentage: 15 },
    { name: 'Leadership', value: 4, color: '#8b5cf6', percentage: 12 },
    { name: 'Community Service', value: 5, color: '#ef4444', percentage: 14 }
  ];

  const semesterGoals = [
    { goal: 'Complete 3 Professional Certifications', progress: 67, current: 2, target: 3 },
    { goal: 'Attend 5 Industry Conferences', progress: 80, current: 4, target: 5 },
    { goal: 'Lead 2 Student Organizations', progress: 50, current: 1, target: 2 },
    { goal: 'Complete 100 Volunteer Hours', progress: 145, current: 145, target: 100 },
    { goal: 'Win 1 Major Competition', progress: 200, current: 2, target: 1 }
  ];

  const competencyAnalysis = [
    { category: 'Technical Skills', score: 85, benchmark: 78 },
    { category: 'Leadership', score: 88, benchmark: 72 },
    { category: 'Communication', score: 75, benchmark: 80 },
    { category: 'Teamwork', score: 82, benchmark: 76 },
    { category: 'Innovation', score: 90, benchmark: 69 },
    { category: 'Problem Solving', score: 87, benchmark: 74 }
  ];

  const handleExportReport = (format: string) => {
    console.log(`Exporting report as ${format}...`);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive overview of your academic achievements and progress</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map(timeframe => (
                <SelectItem key={timeframe} value={timeframe}>
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => handleExportReport('pdf')} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Achievements</p>
                <p className="text-3xl font-bold">{personalStats.totalAchievements}</p>
              </div>
              <Award className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Impact Index</p>
                <p className="text-3xl font-bold">{personalStats.impactIndex}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">University Rank</p>
                <p className="text-3xl font-bold">#{personalStats.rank}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Percentile</p>
                <p className="text-3xl font-bold">{personalStats.percentile}th</p>
              </div>
              <Target className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievement Progress Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Progress</CardTitle>
            <CardDescription>Your growth in achievements and impact over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={yearlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="achievements" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
                <Area type="monotone" dataKey="impactIndex" stackId="2" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Achievement Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Distribution</CardTitle>
            <CardDescription>Breakdown of your achievements by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={achievementTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {achievementTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>Your activity levels and engagement over recent months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activities" fill="#2563EB" name="Activities" />
                <Bar dataKey="hours" fill="#14B8A6" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competency Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Competency Analysis</CardTitle>
            <CardDescription>Your skills compared to program benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competencyAnalysis.map((comp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{comp.category}</span>
                    <span className="text-gray-500">Your Score: {comp.score} | Benchmark: {comp.benchmark}</span>
                  </div>
                  <div className="relative">
                    <Progress value={comp.score} className="h-2" />
                    <div 
                      className="absolute top-0 h-2 w-1 bg-red-400"
                      style={{ left: `${comp.benchmark}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Semester Goals Progress</span>
          </CardTitle>
          <CardDescription>Track your progress towards this semester's objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {semesterGoals.map((goal, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight">{goal.goal}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{goal.current} / {goal.target}</span>
                      <Badge 
                        className={`${goal.progress >= 100 ? 'bg-green-100 text-green-800' : 
                          goal.progress >= 75 ? 'bg-blue-100 text-blue-800' : 
                          goal.progress >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {Math.min(goal.progress, 100)}%
                      </Badge>
                    </div>
                    <Progress 
                      value={Math.min(goal.progress, 100)} 
                      className={`h-2 ${getProgressColor(goal.progress)}`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Development */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Development Matrix</CardTitle>
          <CardDescription>Your proficiency levels across different competency areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillDistribution.map((skill, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                      <Badge variant="outline" className="text-xs">
                        {skill.achievements} achievements
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Proficiency</span>
                        <span className="font-medium">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Export Options</span>
          </CardTitle>
          <CardDescription>Download your reports in different formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleExportReport('pdf')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Detailed PDF Report
            </Button>
            <Button onClick={() => handleExportReport('excel')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Excel Spreadsheet
            </Button>
            <Button onClick={() => handleExportReport('summary')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Executive Summary
            </Button>
            <Button onClick={() => handleExportReport('portfolio')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Portfolio Package
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MapPin, Users, Clock, Search, Filter, Bookmark, ExternalLink } from 'lucide-react';

export function EventDiscovery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [savedEvents, setSavedEvents] = useState(new Set());

  const eventTypes = ['Conference', 'Competition', 'Workshop', 'Internship', 'Webinar', 'Hackathon'];
  const skillAreas = ['Programming', 'Design', 'Business', 'Data Science', 'Cybersecurity', 'Marketing'];

  const events = [
    {
      id: 1,
      title: "Global Tech Conference 2024",
      type: "Conference",
      date: "2024-03-15",
      endDate: "2024-03-17",
      location: "San Francisco, CA",
      organizer: "TechWorld Inc.",
      description: "Join industry leaders for 3 days of cutting-edge technology discussions, networking, and innovation showcases.",
      skills: ["Programming", "Data Science"],
      participants: 2500,
      deadline: "2024-02-28",
      isVirtual: false,
      fee: "$299",
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "AI/ML Summer Internship Program",
      type: "Internship",
      date: "2024-06-01",
      endDate: "2024-08-31",
      location: "Remote",
      organizer: "DataTech Solutions",
      description: "12-week paid internship program focusing on machine learning and artificial intelligence projects.",
      skills: ["Programming", "Data Science"],
      participants: 50,
      deadline: "2024-03-01",
      isVirtual: true,
      fee: "Paid Position",
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "University Innovation Hackathon",
      type: "Hackathon",
      date: "2024-02-20",
      endDate: "2024-02-22",
      location: "University Campus",
      organizer: "Computer Science Department",
      description: "48-hour hackathon focusing on sustainable technology solutions. Teams of 3-5 students.",
      skills: ["Programming", "Design"],
      participants: 200,
      deadline: "2024-02-15",
      isVirtual: false,
      fee: "Free",
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      title: "Digital Marketing Masterclass",
      type: "Workshop",
      date: "2024-02-10",
      endDate: "2024-02-10",
      location: "Online",
      organizer: "Marketing Pro Academy",
      description: "Comprehensive workshop covering SEO, social media marketing, and digital advertising strategies.",
      skills: ["Marketing", "Business"],
      participants: 100,
      deadline: "2024-02-08",
      isVirtual: true,
      fee: "$49",
      image: "/api/placeholder/400/200"
    },
    {
      id: 5,
      title: "Cybersecurity Challenge 2024",
      type: "Competition",
      date: "2024-03-01",
      endDate: "2024-03-03",
      location: "Virtual",
      organizer: "CyberSafe Institute",
      description: "Test your cybersecurity skills in this capture-the-flag style competition with real-world scenarios.",
      skills: ["Cybersecurity", "Programming"],
      participants: 500,
      deadline: "2024-02-25",
      isVirtual: true,
      fee: "Free",
      image: "/api/placeholder/400/200"
    },
    {
      id: 6,
      title: "UX/UI Design Sprint Workshop",
      type: "Workshop",
      date: "2024-02-25",
      endDate: "2024-02-25",
      location: "Design Studio NYC",
      organizer: "Design Collective",
      description: "One-day intensive workshop on user experience design principles and prototyping techniques.",
      skills: ["Design"],
      participants: 30,
      deadline: "2024-02-20",
      isVirtual: false,
      fee: "$129",
      image: "/api/placeholder/400/200"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSkill = selectedSkill === 'all' || event.skills.includes(selectedSkill);
    return matchesSearch && matchesType && matchesSkill;
  });

  const toggleSaveEvent = (eventId: number) => {
    const newSavedEvents = new Set(savedEvents);
    if (savedEvents.has(eventId)) {
      newSavedEvents.delete(eventId);
    } else {
      newSavedEvents.add(eventId);
    }
    setSavedEvents(newSavedEvents);
  };

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) > new Date());
  const savedEventsList = events.filter(event => savedEvents.has(event.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Discovery</h1>
          <p className="text-gray-600">Discover conferences, competitions, internships, and workshops</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {eventTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Skill Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {skillAreas.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Events ({upcomingEvents.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved Events ({savedEventsList.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your search filters to find more events.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          {event.isVirtual && (
                            <Badge variant="secondary" className="text-xs">Virtual</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          by {event.organizer}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveEvent(event.id)}
                        className={savedEvents.has(event.id) ? 'text-blue-600' : 'text-gray-400'}
                      >
                        <Bookmark className={`w-4 h-4 ${savedEvents.has(event.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString()} 
                          {event.date !== event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{event.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Apply by {new Date(event.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {event.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-semibold text-green-600">{event.fee}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedEventsList.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved events</h3>
                <p className="text-gray-600">Save events you're interested in to keep track of them.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {savedEventsList.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          {event.isVirtual && (
                            <Badge variant="secondary" className="text-xs">Virtual</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          by {event.organizer}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveEvent(event.id)}
                        className="text-blue-600"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-semibold text-green-600">{event.fee}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
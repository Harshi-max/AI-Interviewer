"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  ArrowLeft,
  Upload,
  Star,
  Calendar,
  Briefcase,
  MapPin
} from "lucide-react"
import Link from "next/link"

interface Resume {
  id: string
  candidateName: string
  email: string
  phone: string
  location: string
  role: string
  experience: string
  techStack: string[]
  matchScore: number
  uploadedAt: Date
  lastViewed?: Date
  education: string
  company: string
  summary: string
  starred: boolean
}

export default function ResumesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterExperience, setFilterExperience] = useState("all")
  const [sortBy, setSortBy] = useState("match")

  // Mock data - in a real app, this would come from an API
  const resumes: Resume[] = [
    {
      id: "1",
      candidateName: "Alex Chen",
      email: "alex.chen@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      role: "Senior React Developer",
      experience: "senior",
      techStack: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      matchScore: 95,
      uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      lastViewed: new Date(Date.now() - 2 * 60 * 60 * 1000),
      education: "BS Computer Science, Stanford University",
      company: "Meta",
      summary: "Experienced React developer with 6+ years building scalable web applications...",
      starred: true
    },
    {
      id: "2",
      candidateName: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      role: "Full Stack Developer",
      experience: "mid",
      techStack: ["Vue.js", "Python", "Django", "PostgreSQL", "Docker"],
      matchScore: 88,
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      education: "MS Software Engineering, NYU",
      company: "Spotify",
      summary: "Full-stack developer passionate about creating user-friendly applications...",
      starred: false
    },
    {
      id: "3",
      candidateName: "Michael Rodriguez",
      email: "mike.r@email.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      role: "Frontend Developer",
      experience: "junior",
      techStack: ["React", "JavaScript", "CSS", "Sass", "Jest"],
      matchScore: 76,
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      education: "Bootcamp Graduate, Lambda School",
      company: "Startup Inc",
      summary: "Recent bootcamp graduate with strong fundamentals in modern web development...",
      starred: false
    },
    {
      id: "4",
      candidateName: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 321-0987",
      location: "Seattle, WA",
      role: "DevOps Engineer",
      experience: "senior",
      techStack: ["Kubernetes", "Docker", "AWS", "Terraform", "Python"],
      matchScore: 91,
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      education: "BS Computer Engineering, University of Washington",
      company: "Amazon",
      summary: "DevOps engineer specializing in cloud infrastructure and automation...",
      starred: true
    }
  ]

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getMatchScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 90) return "default"
    if (score >= 80) return "secondary"
    if (score >= 70) return "outline"
    return "destructive"
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resume.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resume.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterExperience === "all" || resume.experience === filterExperience
    return matchesSearch && matchesFilter
  })

  const sortedResumes = [...filteredResumes].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchScore - a.matchScore
      case "recent":
        return b.uploadedAt.getTime() - a.uploadedAt.getTime()
      case "name":
        return a.candidateName.localeCompare(b.candidateName)
      default:
        return 0
    }
  })

  const avgMatchScore = resumes.reduce((acc, resume) => acc + resume.matchScore, 0) / resumes.length
  const starredCount = resumes.filter(resume => resume.starred).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Resumes</h1>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Resume
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Match Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgMatchScore)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Starred</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{starredCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, role, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterExperience} onValueChange={setFilterExperience}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Resumes List */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {sortedResumes.map((resume, index) => (
                    <div key={resume.id} className={`p-6 ${index !== sortedResumes.length - 1 ? 'border-b' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-lg">{resume.candidateName}</h3>
                            {resume.starred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {resume.role}
                            </Badge>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {resume.experience}
                            </Badge>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Briefcase className="h-3 w-3 mr-1" />
                                {resume.company}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {resume.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(resume.uploadedAt)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{resume.education}</p>
                          </div>

                          <p className="text-sm text-muted-foreground max-w-2xl">
                            {resume.summary}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {resume.techStack.map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-muted rounded-sm text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-start space-x-4 ml-6">
                          <div className="text-right">
                            <div className={`text-xl font-bold ${getMatchScoreColor(resume.matchScore)}`}>
                              {resume.matchScore}%
                            </div>
                            <Badge variant={getMatchScoreBadgeVariant(resume.matchScore)} className="text-xs">
                              {resume.matchScore >= 90 ? 'Excellent' :
                               resume.matchScore >= 80 ? 'Great Match' :
                               resume.matchScore >= 70 ? 'Good Match' : 'Fair Match'}
                            </Badge>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm">
                              Schedule Interview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedResumes.map((resume) => (
                <Card key={resume.id} className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">{resume.candidateName}</CardTitle>
                          {resume.starred && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <CardDescription>{resume.role}</CardDescription>
                      </div>
                      <Badge variant={getMatchScoreBadgeVariant(resume.matchScore)}>
                        {resume.matchScore}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Briefcase className="h-3 w-3 mr-2" />
                        {resume.company}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-2" />
                        {resume.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-2" />
                        {formatDate(resume.uploadedAt)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Education:</span>
                      <p className="text-sm text-muted-foreground">{resume.education}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Tech Stack:</span>
                      <div className="flex flex-wrap gap-1">
                        {resume.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-muted rounded-sm text-xs">
                            {tech}
                          </span>
                        ))}
                        {resume.techStack.length > 4 && (
                          <span className="px-2 py-1 bg-muted rounded-sm text-xs">
                            +{resume.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {resume.summary}
                    </p>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1">
                        Interview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

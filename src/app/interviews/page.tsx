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
  Calendar,
  Clock,
  TrendingUp,
  Eye,
  Download,
  ArrowLeft,
  Plus
} from "lucide-react"
import Link from "next/link"

interface Interview {
  id: string
  candidateName: string
  role: string
  type: string
  experience: string
  techStack: string[]
  score: number
  duration: number
  completedAt: Date
  status: 'completed' | 'in-progress' | 'scheduled'
}

export default function InterviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Mock data - in a real app, this would come from an API
  const interviews: Interview[] = [
    {
      id: "1",
      candidateName: "John Doe",
      role: "Senior React Developer",
      type: "technical",
      experience: "senior",
      techStack: ["React", "TypeScript", "Node.js"],
      score: 85,
      duration: 2640,
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "completed"
    },
    {
      id: "2",
      candidateName: "Jane Smith",
      role: "Full Stack Developer",
      type: "mixed",
      experience: "mid",
      techStack: ["Vue.js", "Python", "PostgreSQL"],
      score: 78,
      duration: 1800,
      completedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: "completed"
    },
    {
      id: "3",
      candidateName: "Mike Johnson",
      role: "Frontend Developer",
      type: "behavioral",
      experience: "junior",
      techStack: ["React", "JavaScript", "CSS"],
      score: 72,
      duration: 1500,
      completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "completed"
    },
    {
      id: "4",
      candidateName: "Sarah Wilson",
      role: "Backend Developer",
      type: "technical",
      experience: "senior",
      techStack: ["Node.js", "MongoDB", "AWS"],
      score: 91,
      duration: 2100,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "completed"
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    return `${mins}m`
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || interview.type === filterType
    return matchesSearch && matchesFilter
  })

  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.completedAt.getTime() - a.completedAt.getTime()
      case "score":
        return b.score - a.score
      case "duration":
        return b.duration - a.duration
      default:
        return 0
    }
  })

  const avgScore = interviews.reduce((acc, interview) => acc + interview.score, 0) / interviews.length
  const avgDuration = interviews.reduce((acc, interview) => acc + interview.duration, 0) / interviews.length

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
            <h1 className="text-2xl font-bold">Interviews</h1>
          </div>
          <Button asChild>
            <Link href="/interview/setup">
              <Plus className="h-4 w-4 mr-2" />
              New Interview
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviews.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgScore)}/100</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatDuration(avgDuration)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
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
                    placeholder="Search by candidate name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="score">Highest Score</SelectItem>
                    <SelectItem value="duration">Longest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Interviews List */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {sortedInterviews.map((interview, index) => (
                    <div key={interview.id} className={`p-6 ${index !== sortedInterviews.length - 1 ? 'border-b' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{interview.candidateName}</h3>
                            <Badge variant="outline" className="text-xs">
                              {interview.role}
                            </Badge>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {interview.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDuration(interview.duration)}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(interview.completedAt)}
                            </span>
                            <span className="capitalize">{interview.experience} level</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {interview.techStack.map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-muted rounded-sm text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getScoreColor(interview.score)}`}>
                              {interview.score}/100
                            </div>
                            <Badge variant={getScoreBadgeVariant(interview.score)} className="text-xs">
                              {interview.score >= 80 ? 'Excellent' :
                               interview.score >= 60 ? 'Good' : 'Needs Work'}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
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
              {sortedInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{interview.candidateName}</CardTitle>
                        <CardDescription>{interview.role}</CardDescription>
                      </div>
                      <Badge variant={getScoreBadgeVariant(interview.score)}>
                        {interview.score}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="secondary" className="capitalize">
                        {interview.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{formatDuration(interview.duration)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completed:</span>
                      <span>{formatDate(interview.completedAt)}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Tech Stack:</span>
                      <div className="flex flex-wrap gap-1">
                        {interview.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-muted rounded-sm text-xs">
                            {tech}
                          </span>
                        ))}
                        {interview.techStack.length > 3 && (
                          <span className="px-2 py-1 bg-muted rounded-sm text-xs">
                            +{interview.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Export
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

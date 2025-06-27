"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Settings, Mic } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function InterviewSetup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    candidateName: "",
    role: "",
    experience: "",
    techStack: [],
    interviewType: "",
    numQuestions: "10",
    duration: "30",
    additionalNotes: ""
  })

  const techStacks = [
    "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "C++", "C#", ".NET",
    "PHP", "Laravel", "Django", "Express.js", "MongoDB", "PostgreSQL", "MySQL",
    "AWS", "Azure", "Docker", "Kubernetes", "TypeScript", "JavaScript", "Other"
  ];

  const [customTech, setCustomTech] = useState(""); // NEW STATE


  const handleTechStackChange = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }))
  }

  const handleStartInterview = () => {
    // Save interview setup data
    localStorage.setItem('interviewSetup', JSON.stringify(formData))
    router.push('/interview/session')
  }

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
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Interview Setup</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Configure Your AI Interview</CardTitle>
            <CardDescription>
              Set up the interview parameters for the AI to conduct a personalized interview session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Candidate Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Candidate Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    placeholder="Enter candidate name"
                    value={formData.candidateName}
                    onChange={(e) => setFormData(prev => ({ ...prev, candidateName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role/Position</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Senior React Developer"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                  <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <Label>Technology Stack</Label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {techStacks.map((tech) => (
                  <label key={tech} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.techStack.includes(tech)}
                      onChange={() => handleTechStackChange(tech)}
                      className="rounded"
                    />
                    <span className="text-sm">{tech}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interview Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interview Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interviewType">Interview Type</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, interviewType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numQuestions">Number of Questions</Label>
                  <Select
                    value={formData.numQuestions}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, numQuestions: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Any specific topics to focus on or avoid..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                onClick={handleStartInterview}
                disabled={!formData.candidateName || !formData.role || !formData.experience || !formData.interviewType}
                className="min-w-[120px]"
              >
                <Mic className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

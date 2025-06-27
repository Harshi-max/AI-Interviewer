"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Square, Play, Pause, ArrowLeft, Volume2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Vapi from "@vapi-ai/web"

interface InterviewSetup {
  candidateName: string
  role: string
  experience: string
  techStack: string[]
  interviewType: string
  numQuestions: string
  duration: string
  additionalNotes: string
}

interface VapiMessage {
  type: string
  role?: string
  transcript?: string
}

interface VapiError {
  message: string
  code?: string
}

export default function InterviewSession() {
  const router = useRouter()
  const [setup, setSetup] = useState<InterviewSetup | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transcript, setTranscript] = useState<Array<{speaker: string, message: string, timestamp: Date}>>([])
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const vapiRef = useRef<typeof Vapi.prototype | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Load interview setup data
    const setupData = localStorage.getItem('interviewSetup')
    if (setupData) {
      setSetup(JSON.parse(setupData))
    } else {
      router.push('/interview/setup')
    }

    // Initialize VAPI
    const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN
    if (token) {
      vapiRef.current = new Vapi(token)

      vapiRef.current.on('call-start', () => {
        setIsConnected(true)
        setSessionStartTime(new Date())
        console.log('Call started')
      })

      vapiRef.current.on('call-end', () => {
        setIsConnected(false)
        console.log('Call ended')
      })

      vapiRef.current.on('message', (message: VapiMessage) => {
        console.log('Message:', message)

        if (message.type === 'transcript') {
          const newTranscript = {
            speaker: message.role === 'assistant' ? 'AI Interviewer' : 'Candidate',
            message: message.transcript || '',
            timestamp: new Date()
          }
          setTranscript(prev => [...prev, newTranscript])
        }
      })

      vapiRef.current.on('error', (error: VapiError) => {
        console.error('VAPI Error:', error)
      })
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop()
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [router])

  useEffect(() => {
    // Timer for elapsed time
    if (sessionStartTime && isConnected) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000))
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [sessionStartTime, isConnected])

  const startInterview = async () => {
    if (!setup || !vapiRef.current) return

    setIsLoading(true)

    const interviewContext = `
You are an AI interviewer conducting a ${setup.interviewType} interview for a ${setup.role} position.
The candidate ${setup.candidateName} has ${setup.experience} experience level.
Focus on these technologies: ${setup.techStack.join(', ')}.
Ask ${setup.numQuestions} questions total.
Additional context: ${setup.additionalNotes}

Start with a warm greeting and introduction, then proceed with interview questions appropriate for the role and experience level.
Be professional, engaging, and provide clear feedback.
`

    try {
      await vapiRef.current.start({
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: interviewContext
            }
          ]
        },
        voice: {
          provider: "11labs",
          voiceId: "paula"
        }
      })
    } catch (error) {
      console.error('Failed to start interview:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const endInterview = () => {
    if (vapiRef.current) {
      vapiRef.current.stop()
    }

    // Save interview data
    const interviewData = {
      setup,
      transcript,
      duration: elapsedTime,
      completedAt: new Date(),
      questionCount: currentQuestion
    }

    localStorage.setItem(`interview_${Date.now()}`, JSON.stringify(interviewData))
    router.push('/interview/feedback')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = setup ? (currentQuestion / Number.parseInt(setup.numQuestions)) * 100 : 0

  if (!setup) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/interview/setup">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Setup
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Mic className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Interview Session</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {formatTime(elapsedTime)}
            </div>
            {isConnected && (
              <div className="flex items-center space-x-1 text-green-600">
                <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-sm">Live</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interview Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Candidate</p>
                  <p className="font-medium">{setup.candidateName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{setup.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{setup.interviewType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tech Stack</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {setup.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-muted rounded-sm text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Question {currentQuestion} of {setup.numQuestions}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>

                <div className="flex flex-col space-y-2">
                  {!isConnected ? (
                    <Button
                      onClick={startInterview}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Starting...
                        </div>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Interview
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={endInterview}
                      variant="destructive"
                      className="w-full"
                    >
                      <Square className="h-4 w-4 mr-2" />
                      End Interview
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Transcript */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Live Transcript
                  {isConnected && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Volume2 className="h-4 w-4" />
                      <span>Listening...</span>
                    </div>
                  )}
                </CardTitle>
                <CardDescription>
                  Real-time conversation transcript
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <div className="space-y-4">
                  {transcript.length === 0 && !isConnected && (
                    <div className="text-center text-muted-foreground py-12">
                      <Mic className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Start the interview to see the live transcript</p>
                    </div>
                  )}

                  {transcript.map((entry) => (
                    <div key={`${entry.timestamp.getTime()}-${entry.speaker}-${entry.message.slice(0, 20)}`} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          entry.speaker === 'AI Interviewer'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {entry.speaker === 'AI Interviewer' ? 'AI' : 'C'}
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm">{entry.speaker}</p>
                          <p className="text-xs text-muted-foreground">
                            {entry.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <p className="text-sm">{entry.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}



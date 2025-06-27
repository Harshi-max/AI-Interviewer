// "use client"
//
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   Clock,
//   MessageSquare,
//   Download,
//   Share
// } from "lucide-react"
// import Link from "next/link"
//
// interface FeedbackData {
//   overallScore: number
//   technicalScore: number
//   communicationScore: number
//   problemSolvingScore: number
//   strengths: string[]
//   improvements: string[]
//   detailedFeedback: string
//   recommendations: string[]
// }
//
// interface InterviewData {
//   setup: {
//     candidateName: string
//     role: string
//     experience: string
//     techStack: string[]
//     interviewType: string
//     numQuestions: string
//     duration: string
//   }
//   duration: number
//   completedAt: Date
//   questionCount: number
// }
//
// export default function InterviewFeedback() {
//   const [feedback, setFeedback] = useState<FeedbackData | null>(null)
//   const [interviewData, setInterviewData] = useState<InterviewData | null>(null)
//
//   useEffect(() => {
//     // Simulate AI-generated feedback (in a real app, this would come from an AI service)
//     const generateFeedback = (): FeedbackData => {
//       return {
//         overallScore: 78,
//         technicalScore: 82,
//         communicationScore: 75,
//         problemSolvingScore: 76,
//         strengths: [
//           "Strong understanding of React fundamentals and hooks",
//           "Good problem-solving approach with clear explanation",
//           "Excellent knowledge of modern JavaScript ES6+ features",
//           "Clear communication and structured thinking"
//         ],
//         improvements: [
//           "Could improve understanding of advanced React patterns",
//           "Work on optimizing code performance considerations",
//           "Practice explaining complex concepts more concisely",
//           "Strengthen knowledge of testing methodologies"
//         ],
//         detailedFeedback: `The candidate demonstrated a solid foundation in React development and modern JavaScript. They showed good problem-solving skills when presented with coding challenges and were able to explain their thought process clearly.
//
// Technical Performance:
// The candidate handled most technical questions well, particularly those related to React hooks and state management. However, they struggled slightly with more advanced concepts like React optimization techniques and performance considerations.
//
// Communication:
// Communication was generally clear and professional. The candidate took time to think through problems before answering, which shows good analytical skills. Some answers could have been more concise.
//
// Areas for Growth:
// Focus on advanced React patterns, performance optimization, and testing strategies. Practice explaining technical concepts in simpler terms for better client communication.`,
//         recommendations: [
//           "Review React performance optimization techniques",
//           "Practice coding challenges on platforms like LeetCode",
//           "Study testing frameworks like Jest and React Testing Library",
//           "Work on explaining technical concepts to non-technical stakeholders"
//         ]
//       }
//     }
//
//     setFeedback(generateFeedback())
//
//     // Load interview data from localStorage (mock data for now)
//     const mockInterviewData = {
//       setup: {
//         candidateName: "John Doe",
//         role: "Senior React Developer",
//         experience: "senior",
//         techStack: ["React", "TypeScript", "Node.js"],
//         interviewType: "technical",
//         numQuestions: "10",
//         duration: "45"
//       },
//       duration: 2640, // 44 minutes
//       completedAt: new Date(),
//       questionCount: 10
//     }
//     setInterviewData(mockInterviewData)
//   }, [])
//
//   const getScoreColor = (score: number) => {
//     if (score >= 80) return "text-green-600"
//     if (score >= 60) return "text-yellow-600"
//     return "text-red-600"
//   }
//
//   const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
//     if (score >= 80) return "default"
//     if (score >= 60) return "secondary"
//     return "destructive"
//   }
//
//   const formatDuration = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const hours = Math.floor(mins / 60)
//     const remainingMins = mins % 60
//
//     if (hours > 0) {
//       return `${hours}h ${remainingMins}m`
//     }
//     return `${mins}m`
//   }
//
//   if (!feedback || !interviewData) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
//           <p>Generating AI feedback...</p>
//         </div>
//       </div>
//     )
//   }
//
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm" asChild>
//               <Link href="/">
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Dashboard
//               </Link>
//             </Button>
//             <div className="flex items-center space-x-2">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//               <h1 className="text-xl font-bold">Interview Complete</h1>
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <Button variant="outline" size="sm">
//               <Download className="h-4 w-4 mr-2" />
//               Export Report
//             </Button>
//             <Button variant="outline" size="sm">
//               <Share className="h-4 w-4 mr-2" />
//               Share
//             </Button>
//           </div>
//         </div>
//       </header>
//
//       <main className="container mx-auto px-4 py-8">
//         {/* Interview Summary */}
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Interview Summary</CardTitle>
//             <CardDescription>
//               {interviewData.setup.candidateName} • {interviewData.setup.role}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="text-center">
//                 <div className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
//                   {feedback.overallScore}/100
//                 </div>
//                 <p className="text-sm text-muted-foreground">Overall Score</p>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-muted-foreground">
//                   {formatDuration(interviewData.duration)}
//                 </div>
//                 <p className="text-sm text-muted-foreground">Duration</p>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-muted-foreground">
//                   {interviewData.questionCount}
//                 </div>
//                 <p className="text-sm text-muted-foreground">Questions Asked</p>
//               </div>
//               <div className="text-center">
//                 <Badge variant={getScoreBadgeVariant(feedback.overallScore)} className="text-sm">
//                   {feedback.overallScore >= 80 ? 'Excellent' :
//                    feedback.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//
//         {/* Detailed Feedback */}
//         <Tabs defaultValue="scores" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="scores">Scores</TabsTrigger>
//             <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
//             <TabsTrigger value="strengths">Strengths & Areas</TabsTrigger>
//             <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
//           </TabsList>
//
//           <TabsContent value="scores" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center justify-between">
//                     Technical Skills
//                     <TrendingUp className="h-5 w-5 text-muted-foreground" />
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-sm">Score</span>
//                       <span className={`font-bold ${getScoreColor(feedback.technicalScore)}`}>
//                         {feedback.technicalScore}/100
//                       </span>
//                     </div>
//                     <Progress value={feedback.technicalScore} />
//                   </div>
//                 </CardContent>
//               </Card>
//
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center justify-between">
//                     Communication
//                     <MessageSquare className="h-5 w-5 text-muted-foreground" />
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-sm">Score</span>
//                       <span className={`font-bold ${getScoreColor(feedback.communicationScore)}`}>
//                         {feedback.communicationScore}/100
//                       </span>
//                     </div>
//                     <Progress value={feedback.communicationScore} />
//                   </div>
//                 </CardContent>
//               </Card>
//
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center justify-between">
//                     Problem Solving
//                     <AlertCircle className="h-5 w-5 text-muted-foreground" />
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-sm">Score</span>
//                       <span className={`font-bold ${getScoreColor(feedback.problemSolvingScore)}`}>
//                         {feedback.problemSolvingScore}/100
//                       </span>
//                     </div>
//                     <Progress value={feedback.problemSolvingScore} />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//
//           <TabsContent value="feedback">
//             <Card>
//               <CardHeader>
//                 <CardTitle>AI-Generated Detailed Feedback</CardTitle>
//                 <CardDescription>
//                   Comprehensive analysis of the interview performance
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="prose max-w-none">
//                   {feedback.detailedFeedback.split('\n\n').map((paragraph) => (
//                     <p key={paragraph.slice(0, 50)} className="mb-4 text-sm leading-relaxed">
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//
//           <TabsContent value="strengths" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-green-600">Strengths</CardTitle>
//                   <CardDescription>Areas where the candidate excelled</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-3">
//                     {feedback.strengths.map((strength) => (
//                       <li key={strength} className="flex items-start space-x-3">
//                         <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm">{strength}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-yellow-600">Areas for Improvement</CardTitle>
//                   <CardDescription>Opportunities for growth and development</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-3">
//                     {feedback.improvements.map((improvement) => (
//                       <li key={improvement} className="flex items-start space-x-3">
//                         <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm">{improvement}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//
//           <TabsContent value="recommendations">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Next Steps & Recommendations</CardTitle>
//                 <CardDescription>
//                   Actionable recommendations for candidate development
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {feedback.recommendations.map((recommendation, index) => (
//                     <div key={recommendation} className="flex items-start space-x-3 p-4 border rounded-lg">
//                       <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
//                         {index + 1}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm">{recommendation}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//
//         {/* Action Buttons */}
//         <div className="flex justify-center space-x-4 mt-8">
//           <Button variant="outline" asChild>
//             <Link href="/interview/setup">Schedule Another Interview</Link>
//           </Button>
//           <Button asChild>
//             <Link href="/">Return to Dashboard</Link>
//           </Button>
//         </div>
//       </main>
//     </div>
//   )
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InterviewFeedbackUI from "@/components/interview/FeedbackUI"; // 📦 Extract UI rendering to a separate component if needed

interface TranscriptEntry {
  speaker: string;
  message: string;
  timestamp: string | Date;
}

interface InterviewSession {
  setup: {
    candidateName: string;
    role: string;
    experience: string;
    techStack: string[];
    interviewType: string;
    numQuestions: string;
    duration: string;
    additionalNotes: string;
  };
  transcript: TranscriptEntry[];
  duration: number;
  completedAt: string;
  questionCount: number;
}

interface FeedbackData {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  recommendations: string[];
}

export default function InterviewFeedback() {
  const [interview, setInterview] = useState<InterviewSession | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) =>
        key.startsWith("interview_")
    );
    if (keys.length === 0) {
      router.push("/interview/setup");
      return;
    }

    const latestKey = keys.sort().reverse()[0]; // Latest session
    const session = localStorage.getItem(latestKey);
    if (session) {
      const parsed = JSON.parse(session);
      parsed.transcript = parsed.transcript.map((t: any) => ({
        ...t,
        timestamp: new Date(t.timestamp),
      }));
      setInterview(parsed);
    }
  }, [router]);

  useEffect(() => {
    if (!interview) return;

    const generateFeedback = (): FeedbackData => {
      const getRandom = (min: number, max: number) =>
          Math.floor(Math.random() * (max - min + 1)) + min;

      const sample = (arr: string[], count: number) =>
          [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

      const strengthsPool = [
        "Excellent articulation of thoughts",
        "Solid understanding of React and hooks",
        "Clear explanation of coding solutions",
        "Good problem-solving skills",
        "Calm and confident demeanor",
        "Great knowledge of TypeScript and frontend tools",
      ];

      const improvementPool = [
        "Can improve in advanced component patterns",
        "Struggled slightly with performance optimization topics",
        "Needs to structure answers more concisely",
        "Could explore React Server Components further",
        "Should work on API error handling best practices",
      ];

      const recommendationPool = [
        "Practice on platforms like LeetCode or HackerRank",
        "Improve testing with Jest & React Testing Library",
        "Study frontend architectural patterns",
        "Work on time-bound coding for better fluency",
      ];

      const tech = getRandom(70, 90);
      const comm = getRandom(65, 85);
      const prob = getRandom(60, 85);
      const overall = Math.floor((tech + comm + prob) / 3);

      const detailed = `The candidate ${interview.setup.candidateName} performed well in the mock interview for the role of ${interview.setup.role}. 
They demonstrated a sound understanding of the ${interview.setup.techStack.join(", ")} tech stack and tackled the questions with clarity.

Their responses were mostly correct, and they were able to walk through their solutions effectively. Some answers could have been more optimized and succinct. 
Their communication was clear, but at times a bit verbose.

Overall, they show great promise and with a bit more practice on performance-based questions and explanation delivery, they can excel further.`;

      return {
        overallScore: overall,
        technicalScore: tech,
        communicationScore: comm,
        problemSolvingScore: prob,
        strengths: sample(strengthsPool, 3),
        improvements: sample(improvementPool, 3),
        recommendations: sample(recommendationPool, 4),
        detailedFeedback: detailed,
      };
    };

    setFeedback(generateFeedback());
  }, [interview]);

  if (!interview || !feedback) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full mb-4 mx-auto" />
            <p>Generating feedback...</p>
          </div>
        </div>
    );
  }

  return (
      <InterviewFeedbackUI feedback={feedback} interviewData={interview} />
  );
}

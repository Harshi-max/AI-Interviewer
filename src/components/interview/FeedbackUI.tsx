"use client";

import { FeedbackData } from "@/types/feedback";
import { InterviewSession } from "@/types/interview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Download,
    MessageSquare,
    Share,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function InterviewFeedbackUI({
                                                feedback,
                                                interviewData,
                                            }: {
    feedback: FeedbackData;
    interviewData: InterviewSession;
}) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreBadgeVariant = (
        score: number
    ): "default" | "secondary" | "destructive" | "outline" => {
        if (score >= 80) return "default";
        if (score >= 60) return "secondary";
        return "destructive";
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const hours = Math.floor(mins / 60);
        const remainingMins = mins % 60;

        return hours > 0 ? `${hours}h ${remainingMins}m` : `${mins}m`;
    };

    return (
        <div className="min-h-screen bg-background">
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
                            <CheckCircle className="h-6 w-6 text-green-600" />
                            <h1 className="text-xl font-bold">Interview Complete</h1>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" /> Export Report
                        </Button>
                        <Button variant="outline" size="sm">
                            <Share className="h-4 w-4 mr-2" /> Share
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Interview Summary</CardTitle>
                        <CardDescription>
                            {interviewData.setup.candidateName} • {interviewData.setup.role}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                                    {feedback.overallScore}/100
                                </div>
                                <p className="text-sm text-muted-foreground">Overall Score</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-muted-foreground">
                                    {formatDuration(interviewData.duration)}
                                </div>
                                <p className="text-sm text-muted-foreground">Duration</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-muted-foreground">
                                    {interviewData.questionCount}
                                </div>
                                <p className="text-sm text-muted-foreground">Questions Asked</p>
                            </div>
                            <div className="text-center">
                                <Badge variant={getScoreBadgeVariant(feedback.overallScore)} className="text-sm">
                                    {feedback.overallScore >= 80
                                        ? "Excellent"
                                        : feedback.overallScore >= 60
                                            ? "Good"
                                            : "Needs Improvement"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="scores" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="scores">Scores</TabsTrigger>
                        <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
                        <TabsTrigger value="strengths">Strengths & Areas</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="scores" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {["technicalScore", "communicationScore", "problemSolvingScore"].map((key, idx) => {
                                const titles = ["Technical Skills", "Communication", "Problem Solving"];
                                const icons = [TrendingUp, MessageSquare, AlertCircle];
                                const Icon = icons[idx];
                                const score = feedback[key as keyof FeedbackData] as number;

                                return (
                                    <Card key={key}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {titles[idx]}
                                                <Icon className="h-5 w-5 text-muted-foreground" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Score</span>
                                                    <span className={`font-bold ${getScoreColor(score)}`}>{score}/100</span>
                                                </div>
                                                <Progress value={score} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </TabsContent>

                    <TabsContent value="feedback">
                        <Card>
                            <CardHeader>
                                <CardTitle>AI-Generated Detailed Feedback</CardTitle>
                                <CardDescription>Comprehensive analysis of the interview performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    {feedback.detailedFeedback.split("\n\n").map((para) => (
                                        <p key={para.slice(0, 50)} className="mb-4 text-sm leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="strengths" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {["Strengths", "Areas for Improvement"].map((title, i) => (
                                <Card key={title}>
                                    <CardHeader>
                                        <CardTitle className={i === 0 ? "text-green-600" : "text-yellow-600"}>{title}</CardTitle>
                                        <CardDescription>
                                            {i === 0 ? "Areas where the candidate excelled" : "Opportunities for growth and development"}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {(i === 0 ? feedback.strengths : feedback.improvements).map((point) => (
                                                <li key={point} className="flex items-start space-x-3">
                                                    {i === 0 ? (
                                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    ) : (
                                                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <span className="text-sm">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="recommendations">
                        <Card>
                            <CardHeader>
                                <CardTitle>Next Steps & Recommendations</CardTitle>
                                <CardDescription>Actionable recommendations for candidate development</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {feedback.recommendations.map((rec, idx) => (
                                        <div key={rec} className="flex items-start space-x-3 p-4 border rounded-lg">
                                            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm">{rec}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-center space-x-4 mt-8">
                    <Button variant="outline" asChild>
                        <Link href="/interview/setup">Schedule Another Interview</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/">Return to Dashboard</Link>
                    </Button>
                </div>
            </main>
        </div>
    );
}
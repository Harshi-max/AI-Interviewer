// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Mic, Users, FileText, TrendingUp, Plus, Clock, CheckCircle } from "lucide-react"
// import Link from "next/link"
//
// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Mic className="h-8 w-8 text-primary" />
//             <h1 className="text-2xl font-bold">AI Recruiter</h1>
//           </div>
//           <nav className="flex items-center space-x-4">
//             <Button variant="ghost" asChild>
//               <Link href="/interviews">Interviews</Link>
//             </Button>
//             <Button variant="ghost" asChild>
//               <Link href="/resumes">Resumes</Link>
//             </Button>
//             <Button asChild>
//               <Link href="/interview/setup">
//                 <Plus className="h-4 w-4 mr-2" />
//                 New Interview
//               </Link>
//             </Button>
//           </nav>
//         </div>
//       </header>
//
//       <main className="container mx-auto px-4 py-8">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">24</div>
//               <p className="text-xs text-muted-foreground">+2 from last week</p>
//             </CardContent>
//           </Card>
//
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Completed</CardTitle>
//               <CheckCircle className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">18</div>
//               <p className="text-xs text-muted-foreground">75% completion rate</p>
//             </CardContent>
//           </Card>
//
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
//               <Clock className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">24m</div>
//               <p className="text-xs text-muted-foreground">-2m from average</p>
//             </CardContent>
//           </Card>
//
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
//               <TrendingUp className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">7.8/10</div>
//               <p className="text-xs text-muted-foreground">+0.3 from last month</p>
//             </CardContent>
//           </Card>
//         </div>
//
//         {/* Main Content Tabs */}
//         <Tabs defaultValue="recent" className="space-y-6">
//           <TabsList>
//             <TabsTrigger value="recent">Recent Interviews</TabsTrigger>
//             <TabsTrigger value="resumes">Suggested Resumes</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>
//
//           <TabsContent value="recent" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Interviews</CardTitle>
//                 <CardDescription>Your latest interview sessions</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
//                       <div className="space-y-1">
//                         <h4 className="font-medium">Senior React Developer Interview</h4>
//                         <p className="text-sm text-muted-foreground">Technical • 5 years experience • 10 questions</p>
//                         <p className="text-xs text-muted-foreground">Completed 2 hours ago</p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <div className="text-right">
//                           <p className="font-medium text-green-600">8.5/10</p>
//                           <p className="text-xs text-muted-foreground">Score</p>
//                         </div>
//                         <Button variant="outline" size="sm">View Details</Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//
//           <TabsContent value="resumes" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>AI-Suggested Resumes</CardTitle>
//                 <CardDescription>Resumes that match your recent interview criteria</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
//                       <div className="space-y-1">
//                         <h4 className="font-medium">John Doe - Full Stack Developer</h4>
//                         <p className="text-sm text-muted-foreground">React, Node.js, TypeScript • 4 years experience</p>
//                         <p className="text-xs text-muted-foreground">Match score: 92%</p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Button variant="outline" size="sm">
//                           <FileText className="h-4 w-4 mr-1" />
//                           View Resume
//                         </Button>
//                         <Button size="sm">Schedule Interview</Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//
//           <TabsContent value="analytics" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Interview Analytics</CardTitle>
//                 <CardDescription>Performance trends and insights</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center py-12 text-muted-foreground">
//                   <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                   <p>Analytics dashboard coming soon...</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   )
// }


// 'use client';
//
// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { useInterviewStore } from '@/store/interview-store';
// import { Interview } from '@/types/interview';
// import {
//   Plus,
//   Calendar,
//   Clock,
//   Users,
//   TrendingUp,
//   Mic,
//   Code,
//   User,
//   PlayCircle,
//   Eye,
//   Trash2,
// } from 'lucide-react';
// import { format } from 'date-fns';
//
// export default function Dashboard() {
//   const { interviews, createInterview, setCurrentInterview, deleteInterview } =
//       useInterviewStore();
//
//   const [showCreateDialog, setShowCreateDialog] = useState(false);
//   const [formData, setFormData] = useState<{
//     candidateName: string;
//     candidateEmail: string;
//     position: string;
//     type: 'normal' | 'coding';
//   }>({
//     candidateName: '',
//     candidateEmail: '',
//     position: '',
//     type: 'normal',
//   });
//
//   const handleCreateInterview = () => {
//     if (!formData.candidateName || !formData.position) return;
//
//     createInterview({
//       candidateName: formData.candidateName,
//       candidateEmail: formData.candidateEmail,
//       position: formData.position,
//       type: formData.type,
//     });
//
//     setFormData({
//       candidateName: '',
//       candidateEmail: '',
//       position: '',
//       type: 'normal',
//     });
//     setShowCreateDialog(false);
//   };
//
//   const handleStartInterview = (interview: Interview) => {
//     setCurrentInterview(interview);
//     window.location.href = `/interview/setup`;
//   };
//
//   const handleViewFeedback = (interview: Interview) => {
//     window.location.href = `/interview/feedback`;
//   };
//
//   const completedInterviews = interviews.filter(i => i.status === 'completed');
//   const pendingInterviews = interviews.filter(i => i.status === 'not_started');
//   const inProgressInterviews = interviews.filter(i => i.status === 'in_progress');
//
//   return (
//       <>
//         <section className="card-cta flex flex-col md:flex-row justify-between items-center gap-6 max-w-lg mx-auto p-6">
//           <div className="flex flex-col gap-6 max-w-lg">
//             <h2 className="text-3xl font-semibold">
//               Get Interview-Ready with AI-Powered Practice & Feedback
//             </h2>
//             <p className="text-lg">Practice real interview questions & get instant feedback</p>
//
//             <Button asChild className="btn-primary max-sm:w-full">
//               <Link href="/interview/setup">Start an Interview</Link>
//             </Button>
//           </div>
//
//           <Image
//               src="/robot.png"
//               alt="robo-dude"
//               width={400}
//               height={400}
//               className="max-sm:hidden"
//               priority
//           />
//         </section>
//
//         <div className="container mx-auto p-6 space-y-8">
//           {/* Header */}
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">AI Recruiting Agent</h1>
//               <p className="text-muted-foreground">
//                 Conduct professional interviews with AI-powered voice technology
//               </p>
//             </div>
//
//             <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="w-4 h-4 mr-2" />
//                   New Interview
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Create New Interview</DialogTitle>
//                   <DialogDescription>Set up a new interview session for a candidate</DialogDescription>
//                 </DialogHeader>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm font-medium">Candidate Name</label>
//                     <Input
//                         value={formData.candidateName}
//                         onChange={e =>
//                             setFormData(prev => ({ ...prev, candidateName: e.target.value }))
//                         }
//                         placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium">Email (Optional)</label>
//                     <Input
//                         type="email"
//                         value={formData.candidateEmail}
//                         onChange={e =>
//                             setFormData(prev => ({ ...prev, candidateEmail: e.target.value }))
//                         }
//                         placeholder="john@example.com"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium">Position</label>
//                     <Input
//                         value={formData.position}
//                         onChange={e =>
//                             setFormData(prev => ({ ...prev, position: e.target.value }))
//                         }
//                         placeholder="Software Engineer"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium">Interview Type</label>
//                     <Select
//                         value={formData.type}
//                         onValueChange={(value: 'normal' | 'coding') =>
//                             setFormData(prev => ({ ...prev, type: value }))
//                         }
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="normal">
//                           <div className="flex items-center">
//                             <User className="w-4 h-4 mr-2" />
//                             Normal Interview
//                           </div>
//                         </SelectItem>
//                         <SelectItem value="coding">
//                           <div className="flex items-center">
//                             <Code className="w-4 h-4 mr-2" />
//                             Coding Interview
//                           </div>
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <Button onClick={handleCreateInterview} className="w-full">
//                     Create Interview
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//
//           {/* Stats */}
//           <div className="grid gap-4 md:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{interviews.length}</div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Pending</CardTitle>
//                 <Calendar className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{pendingInterviews.length}</div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">In Progress</CardTitle>
//                 <Clock className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{inProgressInterviews.length}</div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Completed</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{completedInterviews.length}</div>
//               </CardContent>
//             </Card>
//           </div>
//
//           {/* Interview List */}
//           <Tabs defaultValue="all" className="space-y-4">
//             <TabsList>
//               <TabsTrigger value="all">All Interviews</TabsTrigger>
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="in-progress">In Progress</TabsTrigger>
//               <TabsTrigger value="completed">Completed</TabsTrigger>
//             </TabsList>
//
//             <TabsContent value="all" className="space-y-4">
//               <InterviewList
//                   interviews={interviews}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//
//             <TabsContent value="pending" className="space-y-4">
//               <InterviewList
//                   interviews={pendingInterviews}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//
//             <TabsContent value="in-progress" className="space-y-4">
//               <InterviewList
//                   interviews={inProgressInterviews}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//
//             <TabsContent value="completed" className="space-y-4">
//               <InterviewList
//                   interviews={completedInterviews}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </>
//   );
// }
//
// function InterviewList({
//                          interviews,
//                          onStart,
//                          onViewFeedback,
//                          onDelete,
//                        }: {
//   interviews: Interview[];
//   onStart: (interview: Interview) => void;
//   onViewFeedback: (interview: Interview) => void;
//   onDelete: (id: string) => void;
// }) {
//   const getStatusBadge = (status: Interview['status']) => {
//     const variants = {
//       not_started: 'secondary',
//       in_progress: 'default',
//       completed: 'outline',
//       cancelled: 'destructive',
//     } as const;
//
//     const labels = {
//       not_started: 'Pending',
//       in_progress: 'In Progress',
//       completed: 'Completed',
//       cancelled: 'Cancelled',
//     };
//
//     return <Badge variant={variants[status]}>{labels[status]}</Badge>;
//   };
//
//   if (interviews.length === 0) {
//     return (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <Mic className="h-12 w-12 text-muted-foreground mb-4" />
//             <h3 className="text-lg font-semibold">No interviews yet</h3>
//             <p className="text-muted-foreground text-center">
//               Create your first interview to get started with AI-powered recruiting
//             </p>
//           </CardContent>
//         </Card>
//     );
//   }
//
//   return (
//       <div className="space-y-4">
//         {interviews.map(interview => (
//             <Card key={interview.id}>
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="flex items-center space-x-2">
//                       {interview.type === 'coding' ? (
//                           <Code className="w-5 h-5 text-blue-500" />
//                       ) : (
//                           <User className="w-5 h-5 text-green-500" />
//                       )}
//                       <div>
//                         <CardTitle className="text-lg">{interview.candidateName}</CardTitle>
//                         <CardDescription>{interview.position}</CardDescription>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {getStatusBadge(interview.status)}
//                     <Badge variant="outline">
//                       {interview.type === 'coding' ? 'Technical' : 'General'}
//                     </Badge>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-muted-foreground space-y-1">
//                     <p>Created: {format(interview.createdAt, 'MMM dd, yyyy')}</p>
//                     {interview.startTime && (
//                         <p>Started: {format(interview.startTime, 'MMM dd, yyyy HH:mm')}</p>
//                     )}
//                     {interview.duration && (
//                         <p>
//                           Duration: {Math.floor(interview.duration / 60)}m {interview.duration % 60}s
//                         </p>
//                     )}
//                     {interview.candidateEmail && <p>Email: {interview.candidateEmail}</p>}
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {interview.status === 'not_started' && (
//                         <Button onClick={() => onStart(interview)}>
//                           <PlayCircle className="w-4 h-4 mr-2" />
//                           Start Interview
//                         </Button>
//                     )}
//                     {interview.status === 'in_progress' && (
//                         <Button onClick={() => onStart(interview)}>
//                           <Mic className="w-4 h-4 mr-2" />
//                           Continue
//                         </Button>
//                     )}
//                     {interview.status === 'completed' && interview.feedback && (
//                         <Button variant="outline" onClick={() => onViewFeedback(interview)}>
//                           <Eye className="w-4 h-4 mr-2" />
//                           View Feedback
//                         </Button>
//                     )}
//                     <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => onDelete(interview.id)}
//                         className="text-destructive hover:text-destructive"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//         ))}
//       </div>
//   );
// }

// 'use client';
//
// import { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';  // <-- added
// import Link from 'next/link';
// import Image from 'next/image';
// import { format } from 'date-fns';
// import { useInterviewStore } from '@/store/interview-store';
// import { Interview } from '@/types/interview';
// import {
//   Plus, Calendar, Clock, Users, TrendingUp,
//   Mic, Code, User, PlayCircle, Eye, Trash2, SunMoon
// } from 'lucide-react';
//
// import { Button } from '@/components/ui/button';
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle,
// } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Tabs, TabsContent, TabsList, TabsTrigger,
// } from '@/components/ui/tabs';
// import {
//   Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from '@/components/ui/select';
//
// // ✅ StatCard Component
// function StatCard({ icon, title, value }: { icon: JSX.Element; title: string; value: number }) {
//   return (
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">{title}</CardTitle>
//           <span className="text-muted-foreground">{icon}</span>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{value}</div>
//         </CardContent>
//       </Card>
//   );
// }
//
// // ✅ InterviewList Component
// function InterviewList({
//                          interviews,
//                          onStart,
//                          onViewFeedback,
//                          onDelete,
//                        }: {
//   interviews: Interview[];
//   onStart: (interview: Interview) => void;
//   onViewFeedback: (interview: Interview) => void;
//   onDelete: (id: string) => void;
// }) {
//   const getStatusBadge = (status: Interview['status']) => {
//     const variants = {
//       not_started: 'secondary',
//       in_progress: 'default',
//       completed: 'outline',
//       cancelled: 'destructive',
//     } as const;
//
//     const labels = {
//       not_started: 'Pending',
//       in_progress: 'In Progress',
//       completed: 'Completed',
//       cancelled: 'Cancelled',
//     };
//
//     return <Badge variant={variants[status]}>{labels[status]}</Badge>;
//   };
//
//   if (interviews.length === 0) {
//     return (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <Mic className="h-12 w-12 text-muted-foreground mb-4" />
//             <h3 className="text-lg font-semibold">No interviews found</h3>
//             <p className="text-muted-foreground text-center">Try creating or searching for interviews above</p>
//           </CardContent>
//         </Card>
//     );
//   }
//
//   return (
//       <div className="space-y-4">
//         {interviews.map((interview) => (
//             <Card key={interview.id}>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   {interview.type === 'coding'
//                       ? <Code className="w-5 h-5 text-blue-500" />
//                       : <User className="w-5 h-5 text-green-500" />}
//                   <div>
//                     <CardTitle className="text-lg">{interview.candidateName}</CardTitle>
//                     <CardDescription>{interview.position}</CardDescription>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {getStatusBadge(interview.status)}
//                   <Badge variant="outline">{interview.type === 'coding' ? 'Technical' : 'General'}</Badge>
//                 </div>
//               </CardHeader>
//               <CardContent className="flex items-center justify-between">
//                 <div className="text-sm text-muted-foreground space-y-1">
//                   <p>Created: {format(interview.createdAt, 'MMM dd, yyyy')}</p>
//                   {interview.startTime && (
//                       <p>Started: {format(interview.startTime, 'MMM dd, yyyy HH:mm')}</p>
//                   )}
//                   {interview.duration && (
//                       <p>Duration: {Math.floor(interview.duration / 60)}m {interview.duration % 60}s</p>
//                   )}
//                   {interview.candidateEmail && (
//                       <p>Email: {interview.candidateEmail}</p>
//                   )}
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {interview.status === 'not_started' && (
//                       <Button onClick={() => onStart(interview)}>
//                         <PlayCircle className="w-4 h-4 mr-2" /> Start
//                       </Button>
//                   )}
//                   {interview.status === 'in_progress' && (
//                       <Button onClick={() => onStart(interview)}>
//                         <Mic className="w-4 h-4 mr-2" /> Continue
//                       </Button>
//                   )}
//                   {interview.status === 'completed' && interview.feedback && (
//                       <Button variant="outline" onClick={() => onViewFeedback(interview)}>
//                         <Eye className="w-4 h-4 mr-2" /> Feedback
//                       </Button>
//                   )}
//                   <Button variant="ghost" size="sm" onClick={() => onDelete(interview.id)} className="text-destructive hover:text-destructive">
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//         ))}
//       </div>
//   );
// }
//
// // ✅ Main Dashboard Component
// export default function Dashboard() {
//   const router = useRouter(); // <-- added
//
//   const { interviews, createInterview, setCurrentInterview, deleteInterview } = useInterviewStore();
//
//   const [showCreateDialog, setShowCreateDialog] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDarkMode, setIsDarkMode] = useState(false);
//
//   const [formData, setFormData] = useState({
//     candidateName: '',
//     candidateEmail: '',
//     position: '',
//     type: 'normal' as 'normal' | 'coding',
//   });
//
//   const handleCreateInterview = () => {
//     if (!formData.candidateName || !formData.position) return;
//     createInterview(formData);
//     setFormData({ candidateName: '', candidateEmail: '', position: '', type: 'normal' });
//     setShowCreateDialog(false);
//   };
//
//   const handleStartInterview = (interview: Interview) => {
//     setCurrentInterview(interview);
//     router.push('/interview/setup');  // <-- updated navigation
//   };
//
//   const handleViewFeedback = (interview: Interview) => {
//     setCurrentInterview(interview);
//     router.push('/interview/feedback');  // <-- updated navigation
//   };
//
//   const filteredInterviews = useMemo(() => {
//     return interviews.filter(i =>
//         i.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         i.position.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [interviews, searchQuery]);
//
//   const categorized = {
//     completed: filteredInterviews.filter(i => i.status === 'completed'),
//     pending: filteredInterviews.filter(i => i.status === 'not_started'),
//     inProgress: filteredInterviews.filter(i => i.status === 'in_progress'),
//   };
//
//   return (
//       <>
//         {/* Hero Section */}
//         <section className="card-cta flex flex-col md:flex-row justify-between items-center gap-6 max-w-lg mx-auto p-6">
//           <div className="flex flex-col gap-6 max-w-lg">
//             <h2 className="text-3xl font-semibold">Get Interview-Ready with AI-Powered Practice & Feedback</h2>
//             <p className="text-lg">Practice real interview questions & get instant feedback</p>
//             <Button onClick={() => router.push('/interview/setup')} className="btn-primary max-sm:w-full">
//               Start an Interview
//             </Button>
//           </div>
//           <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" priority />
//         </section>
//
//         <div className="container mx-auto p-6 space-y-8">
//           {/* Header */}
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">AI Recruiting Agent</h1>
//               <p className="text-muted-foreground">Conduct professional interviews with AI-powered voice technology</p>
//             </div>
//
//             <div className="flex items-center gap-4">
//               <Button variant="ghost" onClick={() => {
//                 document.body.classList.toggle('dark');
//                 setIsDarkMode(prev => !prev);
//               }}>
//                 <SunMoon className="w-5 h-5 mr-2" />
//                 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//               </Button>
//
//               <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <Plus className="w-4 h-4 mr-2" />
//                     New Interview
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Create New Interview</DialogTitle>
//                     <DialogDescription>Set up a new interview session for a candidate</DialogDescription>
//                   </DialogHeader>
//                   <div className="space-y-4">
//                     <Input
//                         placeholder="John Doe"
//                         value={formData.candidateName}
//                         onChange={e => setFormData(prev => ({ ...prev, candidateName: e.target.value }))}
//                     />
//                     <Input
//                         type="email"
//                         placeholder="john@example.com"
//                         value={formData.candidateEmail}
//                         onChange={e => setFormData(prev => ({ ...prev, candidateEmail: e.target.value }))}
//                     />
//                     <Input
//                         placeholder="Software Engineer"
//                         value={formData.position}
//                         onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
//                     />
//                     <div>
//                       <label className="text-sm font-medium">Interview Type</label>
//                       <Select value={formData.type} onValueChange={(value) =>
//                           setFormData(prev => ({ ...prev, type: value as 'normal' | 'coding' }))
//                       }>
//                         <SelectTrigger><SelectValue /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="normal"><User className="w-4 h-4 mr-2" /> Normal Interview</SelectItem>
//                           <SelectItem value="coding"><Code className="w-4 h-4 mr-2" /> Coding Interview</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <Button onClick={handleCreateInterview} className="w-full">Create Interview</Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//
//           {/* Stats */}
//           <div className="grid gap-4 md:grid-cols-4">
//             <StatCard icon={<Users />} title="Total Interviews" value={interviews.length} />
//             <StatCard icon={<Calendar />} title="Pending" value={categorized.pending.length} />
//             <StatCard icon={<Clock />} title="In Progress" value={categorized.inProgress.length} />
//             <StatCard icon={<TrendingUp />} title="Completed" value={categorized.completed.length} />
//           </div>
//
//           {/* Search */}
//           <div className="flex justify-end">
//             <Input
//                 placeholder="Search by name or position..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full sm:w-64"
//             />
//           </div>
//
//           {/* Tabs + Lists */}
//           <Tabs defaultValue="all" className="space-y-4">
//             <TabsList>
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="in-progress">In Progress</TabsTrigger>
//               <TabsTrigger value="completed">Completed</TabsTrigger>
//             </TabsList>
//
//             <TabsContent value="all">
//               <InterviewList
//                   interviews={filteredInterviews}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//             <TabsContent value="pending">
//               <InterviewList
//                   interviews={categorized.pending}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//             <TabsContent value="in-progress">
//               <InterviewList
//                   interviews={categorized.inProgress}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//             <TabsContent value="completed">
//               <InterviewList
//                   interviews={categorized.completed}
//                   onStart={handleStartInterview}
//                   onViewFeedback={handleViewFeedback}
//                   onDelete={deleteInterview}
//               />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useInterviewStore } from '@/store/interview-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SunMoon, Plus, Code, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const router = useRouter();
    const { createInterview } = useInterviewStore();

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        candidateName: '',
        candidateEmail: '',
        position: '',
        type: 'normal',
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleCreateInterview = () => {
        if (!formData.candidateName || !formData.position) return;
        createInterview(formData);
        setFormData({ candidateName: '', candidateEmail: '', position: '', type: 'normal' });
        setShowCreateDialog(false);
    };

    const handleStartInterview = () => {
        router.push('/interview/setup');
    };

    const featureColors = [
        'from-indigo-900 via-indigo-800 to-indigo-700',
        'from-purple-900 via-purple-800 to-purple-700',
        'from-pink-900 via-pink-800 to-pink-700',
        'from-green-900 via-green-800 to-green-700',
        'from-yellow-900 via-yellow-800 to-yellow-700',
        'from-red-900 via-red-800 to-red-700',
    ];

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors">
            <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <h1 className="text-xl font-semibold">Smart Interview Coach</h1>
                <Button variant="ghost" onClick={() => setIsDarkMode(prev => !prev)}>
                    <SunMoon className="w-5 h-5 mr-2" />
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </header>

            <section className="bg-gradient-to-br from-gray-900 to-black py-20 px-6 text-white text-center shadow-lg">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold leading-tight mb-4">
                            Land Your Dream Job with Our <span className="text-indigo-400">AI Interview Coach</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-xl opacity-80">
                            Get AI-driven mock interviews, instant feedback, and real-time analytics to ace every opportunity.
                        </motion.p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg" onClick={handleStartInterview}>
                                ➤ Start Interview
                            </Button>
                            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="lg" className="border-white text-red-400">
                                        ＋ Custom Interview
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Custom Interview</DialogTitle>
                                        <DialogDescription>Fill in details to generate a personalized interview session</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Input placeholder="Candidate Name" value={formData.candidateName} onChange={e => setFormData(prev => ({ ...prev, candidateName: e.target.value }))} />
                                        <Input type="email" placeholder="Email (optional)" value={formData.candidateEmail} onChange={e => setFormData(prev => ({ ...prev, candidateEmail: e.target.value }))} />
                                        <Input placeholder="Position (e.g., Frontend Developer)" value={formData.position} onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))} />
                                        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Interview Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal"><User className="w-4 h-4 mr-2" /> General Interview</SelectItem>
                                                <SelectItem value="coding"><Code className="w-4 h-4 mr-2" /> Technical Interview</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button onClick={handleCreateInterview} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-transform hover:scale-105">Start Interview</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
                        <Image src="/robot.png" alt="AI Interview Robot" width={500} height={500} priority className="mx-auto drop-shadow-2xl" />
                    </motion.div>
                </div>
            </section>

            <section className="bg-gray-950 py-20 px-6 text-white">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-4xl font-bold">Why Choose Our <span className="text-indigo-400">AI Coach?</span></h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                        Advanced AI meets tailored mock interviews to give you the ultimate prep experience.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                    {[...Array(6)].map((_, index) => (
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} key={index}>
                            <Card className={`p-6 text-left shadow-xl bg-gradient-to-br ${featureColors[index % featureColors.length]} text-white rounded-2xl border border-white/10 backdrop-blur-sm`}>
                                <CardHeader>
                                    <CardTitle>
                                        {['🎙 Voice-Based Interviews', '📈 Instant Analytics', '🎯 Role-Based Context', '⚡ Real-time Adaptation', '🕒 Flexible Scheduling', '🧠 Continuous Learning'][index]}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {['Experience realistic, spoken interviews with our advanced AI interviewer that adapts to your responses and speaking style.',
                                        'Get detailed performance breakdowns, confidence scores, and personalized improvement recommendations immediately.',
                                        'Tailored questions and scenarios based on your specific job role, experience level, and target company.',
                                        'Our AI dynamically adjusts question difficulty and focus areas based on your performance during the session.',
                                        'Practice interviews whenever it fits your schedule, day or night.',
                                        'Improve over time with AI-generated learning paths based on past feedback and goals.'][index]}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-16 px-6 text-center rounded-t-3xl shadow-inner">
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl font-bold mb-4">
                    Ready to Ace Your Next Interview?
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-lg mb-6">
                    Join thousands of professionals upgrading their interview game with our smart coach.
                </motion.p>
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Button size="lg" variant="secondary" className="bg-white text-indigo-700 hover:bg-gray-200 transition-all shadow-xl" onClick={handleStartInterview}>
                        ＋ Start Your First Interview
                    </Button>
                </motion.div>
            </section>
        </div>
    );
}

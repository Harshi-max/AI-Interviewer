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
import { getCurrentUser } from '@/lib/actions/auth.action';

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        async function checkUser() {
            const user = await getCurrentUser();
            if (!user) {
                router.push('/sign-in');
            } else {
                setIsAuthenticated(true);
            }
        }
        checkUser();
    }, [router]);

    const handleCreateInterview = () => {
        if (!formData.candidateName || !formData.position) return;
        createInterview(formData);
        setFormData({ candidateName: '', candidateEmail: '', position: '', type: 'normal' });
        setShowCreateDialog(false);
    };

    const handleStartInterview = () => {
        if (!isAuthenticated) {
            router.push('/sign-in');
            return;
        }
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

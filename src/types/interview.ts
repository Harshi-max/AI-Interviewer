export interface Interview {
    id: string;
    type: 'normal' | 'coding';
    candidateName: string;
    candidateEmail: string;
    position: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
    startTime?: Date;
    endTime?: Date;
    duration?: number;
    feedback?: InterviewFeedback;
    transcript?: string;
    callId?: string;
    createdAt: Date;
}

export interface InterviewFeedback {
    overallScore: number; // 1-10
    criteria: {
        communication: CriteriaScore;
        technicalSkills: CriteriaScore;
        problemSolving: CriteriaScore;
        culturalFit: CriteriaScore;
        experience: CriteriaScore;
    };
    strengths: string[];
    areasForImprovement: string[];
    recommendations: string;
    summary: string;
    keyHighlights: string[];
    concerns: string[];
    nextSteps: string;
}

export interface CriteriaScore {
    score: number; // 1-10
    notes: string;
    examples: string[];
}

export interface InterviewQuestion {
    id: string;
    question: string;
    type: 'behavioral' | 'technical' | 'experience' | 'coding';
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    expectedAnswer?: string;
    hints?: string[];
}

export interface InterviewSession {
    id: string;
    interviewId: string;
    startTime: Date;
    endTime?: Date;
    duration: number;
    status: 'active' | 'paused' | 'ended';
    transcript: TranscriptEntry[];
    currentQuestion?: string;
    questionsAsked: string[];
    callMetrics: {
        audioQuality: number;
        connectionStability: number;
        responseTime: number;
    };
}

export interface TranscriptEntry {
    id: string;
    speaker: 'interviewer' | 'candidate';
    text: string;
    timestamp: Date;
    confidence?: number;
}

export interface CallMetrics {
    duration: number;
    audioQuality: 'excellent' | 'good' | 'fair' | 'poor';
    connectionStability: 'stable' | 'unstable';
    averageResponseTime: number;
    interruptions: number;
}

export interface FeedbackGeneration {
    interview: Interview;
    transcript: TranscriptEntry[];
    metrics: CallMetrics;
    questionAnalysis: QuestionAnalysis[];
}

export interface QuestionAnalysis {
    question: string;
    candidateResponse: string;
    analysis: {
        clarity: number;
        completeness: number;
        relevance: number;
        technicalAccuracy?: number;
        confidence: number;
    };
    followUpQuestions: string[];
    keyPoints: string[];
}
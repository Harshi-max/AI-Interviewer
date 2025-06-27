import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Interview, InterviewSession, TranscriptEntry, InterviewFeedback } from '@/types/interview';
import { v4 as uuidv4 } from 'uuid';

interface InterviewStore {
    // State
    interviews: Interview[];
    currentInterview: Interview | null;
    currentSession: InterviewSession | null;
    isCallActive: boolean;
    transcript: TranscriptEntry[];

    // Actions
    createInterview: (data: Omit<Interview, 'id' | 'createdAt' | 'status'>) => Interview;
    updateInterview: (id: string, updates: Partial<Interview>) => void;
    setCurrentInterview: (interview: Interview | null) => void;
    startInterview: (interviewId: string) => void;
    endInterview: (interviewId: string, feedback?: InterviewFeedback) => void;

    // Session management
    startSession: (interviewId: string) => InterviewSession;
    endSession: (sessionId: string) => void;
    addTranscriptEntry: (entry: Omit<TranscriptEntry, 'id'>) => void;
    clearTranscript: () => void;

    // Call management
    setCallActive: (active: boolean) => void;

    // Feedback
    saveFeedback: (interviewId: string, feedback: InterviewFeedback) => void;

    // Utility
    getInterviewById: (id: string) => Interview | undefined;
    getInterviewsByStatus: (status: Interview['status']) => Interview[];
    deleteInterview: (id: string) => void;
    clearAllData: () => void;
}

export const useInterviewStore = create<InterviewStore>()(
    persist(
        (set, get) => ({
            // Initial state
            interviews: [],
            currentInterview: null,
            currentSession: null,
            isCallActive: false,
            transcript: [],

            // Actions
            createInterview: (data) => {
                const interview: Interview = {
                    ...data,
                    id: uuidv4(),
                    status: 'not_started',
                    createdAt: new Date(),
                };

                set((state) => ({
                    interviews: [...state.interviews, interview],
                }));

                return interview;
            },

            updateInterview: (id, updates) => {
                set((state) => ({
                    interviews: state.interviews.map((interview) =>
                        interview.id === id ? { ...interview, ...updates } : interview
                    ),
                    currentInterview: state.currentInterview?.id === id
                        ? { ...state.currentInterview, ...updates }
                        : state.currentInterview,
                }));
            },

            setCurrentInterview: (interview) => {
                set({ currentInterview: interview });
            },

            startInterview: (interviewId) => {
                const startTime = new Date();
                set((state) => ({
                    interviews: state.interviews.map((interview) =>
                        interview.id === interviewId
                            ? { ...interview, status: 'in_progress', startTime }
                            : interview
                    ),
                    currentInterview: state.currentInterview?.id === interviewId
                        ? { ...state.currentInterview, status: 'in_progress', startTime }
                        : state.currentInterview,
                }));
            },

            endInterview: (interviewId, feedback) => {
                const endTime = new Date();
                set((state) => {
                    const interview = state.interviews.find(i => i.id === interviewId);
                    const duration = interview?.startTime
                        ? Math.floor((endTime.getTime() - interview.startTime.getTime()) / 1000)
                        : 0;

                    return {
                        interviews: state.interviews.map((interview) =>
                            interview.id === interviewId
                                ? {
                                    ...interview,
                                    status: 'completed',
                                    endTime,
                                    duration,
                                    feedback
                                }
                                : interview
                        ),
                        currentInterview: state.currentInterview?.id === interviewId
                            ? {
                                ...state.currentInterview,
                                status: 'completed',
                                endTime,
                                duration,
                                feedback
                            }
                            : state.currentInterview,
                        isCallActive: false,
                    };
                });
            },

            startSession: (interviewId) => {
                const session: InterviewSession = {
                    id: uuidv4(),
                    interviewId,
                    startTime: new Date(),
                    duration: 0,
                    status: 'active',
                    transcript: [],
                    questionsAsked: [],
                    callMetrics: {
                        audioQuality: 0,
                        connectionStability: 0,
                        responseTime: 0,
                    },
                };

                set({ currentSession: session });
                return session;
            },

            endSession: (sessionId) => {
                set((state) => ({
                    currentSession: state.currentSession?.id === sessionId
                        ? { ...state.currentSession, status: 'ended', endTime: new Date() }
                        : state.currentSession,
                }));
            },

            addTranscriptEntry: (entry) => {
                const transcriptEntry: TranscriptEntry = {
                    ...entry,
                    id: uuidv4(),
                };

                set((state) => ({
                    transcript: [...state.transcript, transcriptEntry],
                    currentSession: state.currentSession
                        ? {
                            ...state.currentSession,
                            transcript: [...state.currentSession.transcript, transcriptEntry],
                        }
                        : state.currentSession,
                }));
            },

            clearTranscript: () => {
                set({ transcript: [] });
            },

            setCallActive: (active) => {
                set({ isCallActive: active });
            },

            saveFeedback: (interviewId, feedback) => {
                set((state) => ({
                    interviews: state.interviews.map((interview) =>
                        interview.id === interviewId
                            ? { ...interview, feedback }
                            : interview
                    ),
                }));
            },

            getInterviewById: (id) => {
                return get().interviews.find((interview) => interview.id === id);
            },

            getInterviewsByStatus: (status) => {
                return get().interviews.filter((interview) => interview.status === status);
            },

            deleteInterview: (id) => {
                set((state) => ({
                    interviews: state.interviews.filter((interview) => interview.id !== id),
                    currentInterview: state.currentInterview?.id === id ? null : state.currentInterview,
                }));
            },

            clearAllData: () => {
                set({
                    interviews: [],
                    currentInterview: null,
                    currentSession: null,
                    isCallActive: false,
                    transcript: [],
                });
            },
        }),
        {
            name: 'interview-store',
            partialize: (state) => ({
                interviews: state.interviews,
            }),
        }
    )
);

import type { ReactNode } from "react";
import { createContext, useState } from "react";

export interface InterviewReport {
    _id: string;
    matchScore: number;
    title: string;
    jobDescription: string;
    selfDescription?: string;
    resume?: string;
    technicalQuestions: { question: string; intention: string; answer: string }[];
    behavioralQuestions: { question: string; intention: string; answer: string }[];
    skillGaps: { skill: string; severity: 'high' | 'medium' | 'low' }[];
    preparationPlan: { day: number; focus: string; tasks: string[] }[];
    createdAt?: string;
}

export interface ReportSummary {
    _id: string;
    title: string;
    matchScore: number;
    jobDescription: string;
    createdAt: string;
}

export interface InterviewContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    report: InterviewReport | null;
    setReport: (report: InterviewReport | null) => void;
    reports: ReportSummary[];
    setReports: (reports: ReportSummary[]) => void;
}

export const InterviewContext=createContext<InterviewContextType | null>(null);

export const InterviewProvider=({children}:{ children: ReactNode })=>{
    const [loading,setLoading]=useState(false)
    const [report,setReport]=useState<InterviewReport | null>(null);
    const [reports,setReports]=useState<ReportSummary[]>([]);

    return(
        <InterviewContext.Provider value={{loading,setLoading,report,setReport,reports,setReports}}>
            {children}
        </InterviewContext.Provider>
    )
}

import {z} from "zod";
import { describe } from "zod/v4/core";

export const reportSchema = z.object({
    matchScore: z.number().describe("The match score of the candidate profile indicating how well they match the job requirements, on a scale of 0 to 100."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked to the candidate."),
        intention:z.string() .describe("The intention behind asking the question, explaining what the interviewer is trying to assess and intention."),
        answer: z.string().describe("how to answer the provided question, what points to cover while answering,and the appropriate approach,etc."),
    })).describe("An array of technical questions that can be asked based on the job description, each containing the question, the intention behind asking it, and how to answer it effectively."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked to the candidate."),
        intention:z.string() .describe("The intention behind asking the question, explaining what the interviewer is trying to assess and intention."),
        answer: z.string().describe("how to answer the provided question, what points to cover while answering,and the appropriate approach,etc."),
    })).describe("An array of behavioral questions that can be asked based on the job description, each containing the question, the intention behind asking it, and how to answer it effectively."),
    skillgaps: z.array(z.object({
        skill: z.string().describe("The specific skill that the candidate is lacking based on the job requirements."),
        severity: z.enum(["low", "medium", "high"]).describe("The severity level of the skill gap, indicating how critical it is for the candidate to address this gap."),
    })).describe("An array of skill gaps identified in the candidate's profile based on the job requirements, each containing the specific skill that is lacking and the severity level of the gap."),
    preparationPlan: z.array(z.object({
        day: z.string().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("An array of tasks that the candidate should complete on this day to prepare for the interview."),
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively, each containing the day number, the main focus of that day, and an array of tasks to complete."),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

export interface GenerateReportParams {
  resume: string;
  jobDescription: string;
  selfDescription: string;
}
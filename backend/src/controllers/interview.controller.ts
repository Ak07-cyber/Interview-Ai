import * as pdfParse from "pdf-parse";
import type{ Request , Response } from "express";
import {generateReport} from "../services/ai.service.js";
import { InterviewReportModel } from "../models/interviewReport.model.js";

/**
 * @description Controller to generate Interview report based on the user's resume, self Description and job description. The controller will call the generateReport function from the ai service to generate the report and then save it to the database.
 */
export async function generateInterviewReport(req:Request,res:Response){
    try{
        // Auth check BEFORE expensive AI call
        if(!req.user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        if(!req.file){
            return res.status(400).json({
                message:"Resume file is required"
            })
        }

        const parser = new pdfParse.PDFParse({ data: Uint8Array.from(req.file.buffer) });
        const { text: resumeContent } = await parser.getText();
        await parser.destroy();
        const {jobDescription,selfDescription}=req.body;

        if(!jobDescription || !selfDescription){
            return res.status(400).json({
                message:"Job description and self description are required"
            })
        }

        const interviewReportByAi=await generateReport({
            resume:resumeContent,
            jobDescription,
            selfDescription
        })

        const userId=req.user.id;

        const interviewReport=await InterviewReportModel.create({
            user:userId,
            resume:resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message:"Interview Report generated successfully",
            interviewReport
        })
    }catch(error: any){
        console.error("Error generating interview report:", error);

        // Surface specific AI API errors
        const errMsg = error?.message || "";
        let message = "Failed to generate interview report. Please try again later.";
        let statusCode = 500;

        if (errMsg.includes("leaked")) {
            message = "AI service error: API key has been revoked. Please contact the administrator.";
        } else if (errMsg.includes("API key")) {
            message = "AI service error: Invalid API key. Please contact the administrator.";
        } else if (errMsg.includes("quota") || errMsg.includes("429")) {
            message = "AI service rate limit exceeded. Please try again in a few minutes.";
            statusCode = 429;
        }

        return res.status(statusCode).json({ message });
    }
}

/**
 * @description Get all interview reports for the authenticated user, sorted by most recent first.
 * Returns only summary fields (id, title, matchScore, createdAt) for the list view.
 */
export async function getUserReports(req:Request,res:Response){
    try{
        if(!req.user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const reports=await InterviewReportModel.find({ user: req.user.id })
            .select("title matchScore jobDescription createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message:"Reports fetched successfully",
            reports
        })
    }catch(error){
        console.error("Error fetching reports:", error);
        return res.status(500).json({
            message:"Failed to fetch reports"
        })
    }
}

/**
 * @description Get a single interview report by ID. Only returns the report if it belongs to the authenticated user.
 */
export async function getReportById(req:Request,res:Response){
    try{
        if(!req.user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const { id } = req.params;
        const report=await InterviewReportModel.findOne({
            _id: id,
            user: req.user.id
        });

        if(!report){
            return res.status(404).json({
                message:"Report not found"
            })
        }

        res.status(200).json({
            message:"Report fetched successfully",
            report
        })
    }catch(error){
        console.error("Error fetching report:", error);
        return res.status(500).json({
            message:"Failed to fetch report"
        })
    }
}

/**
 * @description Download the resume text for a specific report. Returns the stored resume content as plain text.
 * Only returns the resume if the report belongs to the authenticated user.
 */
export async function downloadResume(req:Request,res:Response){
    try{
        if(!req.user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const { id } = req.params;
        const report=await InterviewReportModel.findOne({
            _id: id,
            user: req.user.id
        }).select("resume title");

        if(!report){
            return res.status(404).json({
                message:"Report not found"
            })
        }

        if(!report.resume){
            return res.status(404).json({
                message:"No resume found for this report"
            })
        }

        // Set headers for text file download
        const filename = `resume-${report.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'download'}.txt`;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(report.resume);

    }catch(error){
        console.error("Error downloading resume:", error);
        return res.status(500).json({
            message:"Failed to download resume"
        })
    }
}

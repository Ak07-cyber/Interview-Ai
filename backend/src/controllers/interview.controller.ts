import * as pdfParse from "pdf-parse";
import type{ Request , Response } from "express";
import {generateReport} from "../services/ai.service.js";
import { InterviewReportModel } from "../models/interviewReport.model.js";

/**
 * @description controller to generate Interview report based on the user's resume, self Description and job description. The controller will call the generateReport function from the ai service to generate the report and then save it to the database.
 */

export async function generateInterviewReport(req:Request,res:Response){

    if(!req.file){
        return res.status(400).json({
            message:"Resume file is required"
        })
    }

    const parser = new pdfParse.PDFParse({ data: Uint8Array.from(req.file.buffer) });
    const { text: resumeContent } = await parser.getText();
    await parser.destroy();
    const {jobDescription,selfDescription}=req.body;

    const interviewReportByAi=await generateReport({
        resume:resumeContent,
        jobDescription,
        selfDescription
    })

    //requires a check
    if(!req.user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

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
}


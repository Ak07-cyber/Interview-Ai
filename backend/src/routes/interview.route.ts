import {Router} from "express";
import { authmiddleware } from "../middlewares/auth.middleware.js";
import { generateInterviewReport, getUserReports, getReportById, downloadResume } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

export const interviewRouter=Router();

/**
 * @route POST /api/interview/generateReport
 * @description Generate a new report for the candidate based on the resume, job description and self description provided in the request body.
 * @access Private
 */
interviewRouter.post("/generateReport",authmiddleware,upload.single("resume"),generateInterviewReport);

/**
 * @route GET /api/interview/reports
 * @description Get all interview reports for the authenticated user
 * @access Private
 */
interviewRouter.get("/reports", authmiddleware, getUserReports);

/**
 * @route GET /api/interview/reports/:id
 * @description Get a single interview report by ID
 * @access Private
 */
interviewRouter.get("/reports/:id", authmiddleware, getReportById);

/**
 * @route GET /api/interview/reports/:id/resume
 * @description Download the stored resume text for a specific report
 * @access Private
 */
interviewRouter.get("/reports/:id/resume", authmiddleware, downloadResume);

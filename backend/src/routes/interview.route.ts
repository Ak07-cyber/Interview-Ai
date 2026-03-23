import {Router} from "express";
import { authmiddleware } from "../middlewares/auth.middleware.js";
import { generateInterviewReport } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

export const interviewRouter=Router();

/**
 * @route POST /api/interview/
 * @description generate a new report for the candidate based on the resume, job description and self description provided in the request body. The report will contain a match score, technical questions, behavioral questions, skill gaps and a preparation plan for the candidate to prepare for the interview.
 * @access Private
 */

interviewRouter.post("/generateReport",authmiddleware,upload.single("resume"),generateInterviewReport);


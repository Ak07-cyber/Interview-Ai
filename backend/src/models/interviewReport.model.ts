import mongoose from "mongoose";
import { intersection, type int } from "zod";
import { tr } from "zod/locales";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    intention: {
        type: String,
        required: [true, "Intention is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
    },
},{
    _id: false,
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"],
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"],
    },
},{
    _id: false,
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"],
    },
    focus: {
        type: String,
        required: [true, "Focus is required"],
    },
    tasks: [{
        type: String,
        required: [true, "Tasks are required"],
    }],
},{
    _id: false,
})

export const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type:String,
        required:[true,"job Description is required"],
    },
    resume: {
        type:String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    selfDescription: {
        type:String,
    },
    matchScore: {
        type:Number,
        min: [0, "Match score cannot be less than 0"],
        max: [100, "Match score cannot be greater than 100"],
    },
    technicalQuestions: [questionSchema],
    behavioralQuestions: [questionSchema],
    skillgaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    title: {
        type:String,
        required:[true,"Job title is required"],
    }
},{
    timestamps: true,
})

export const InterviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

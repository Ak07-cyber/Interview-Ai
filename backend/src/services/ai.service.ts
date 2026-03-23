import { GoogleGenAI } from "@google/genai";
import { reportSchema, type GenerateReportParams } from "./reportSchema/reportSchema.js";
import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY as string
});//client


export async function generateReport({resume,jobDescription,selfDescription}: GenerateReportParams) {

  const prompt=`Generate an interview preparation report for a candidate based on the following information:
                      Candidate's Resume: ${resume}
                      Job Description: ${jobDescription}
                      Candidate's Self Description: ${selfDescription}`

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config:{
        responseMimeType: "application/json",
        responseSchema: z.toJSONSchema(reportSchema),
    }
  });
  return JSON.parse(response.text || "{}");
}

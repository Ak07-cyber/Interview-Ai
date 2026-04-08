import axios from "axios";

export type GenerateInterviewReportPayload = {
    jobDescription: string;
    selfDescription: string;
    resumeFile: File;
};

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
});

//the api layer of the home page
/**
 * @description Services to generate interview report based on user self description,resume and job description
 */

export const generateInterviewReport=async ({jobDescription,selfDescription,resumeFile}: GenerateInterviewReportPayload)=>{
    const formData=new FormData();
    formData.append("jobDescription",jobDescription);
    formData.append("selfDescription",selfDescription);
    formData.append("resume",resumeFile);

    const response=await api.post("/api/interview/generateReport",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data;
}
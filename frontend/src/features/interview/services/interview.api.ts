import api from "../../../api.client";

export type GenerateInterviewReportPayload = {
    jobDescription: string;
    selfDescription: string;
    resumeFile: File;
};

//the api layer of the home page
/**
 * @description Services to generate interview report based on user self description, resume and job description
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

/**
 * @description Get all interview reports for the authenticated user
 */
export const getUserReports = async () => {
    const response = await api.get("/api/interview/reports");
    return response.data;
}

/**
 * @description Get a single interview report by ID
 */
export const getReportById = async (id: string) => {
    const response = await api.get(`/api/interview/reports/${id}`);
    return response.data;
}

/**
 * @description Download the stored resume text for a specific report
 */
export const downloadResumeById = async (id: string) => {
    const response = await api.get(`/api/interview/reports/${id}/resume`, {
        responseType: 'blob'
    });
    
    // Create a download link and trigger it
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Extract filename from content-disposition header or use default
    const contentDisposition = response.headers['content-disposition'];
    const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
    link.download = filenameMatch ? filenameMatch[1] : 'resume.txt';
    
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}
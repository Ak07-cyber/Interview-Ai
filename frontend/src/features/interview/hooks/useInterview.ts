import { useContext, useCallback } from "react";
import { InterviewContext, type InterviewReport, type ReportSummary } from "../interview.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = useCallback(async ({
        jobDescription,
        selfDescription,
        resumeFile,
    }: {
        jobDescription: string;
        selfDescription: string;
        resumeFile: File;
    }): Promise<{ data?: InterviewReport; error?: string }> => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("resume", resumeFile);
            formData.append("jobDescription", jobDescription);
            formData.append("selfDescription", selfDescription);

            const response = await api.post("/api/interview/generateReport", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const interviewReport = response.data.interviewReport;
            setReport(interviewReport);
            return { data: interviewReport };
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Failed to generate report. Please try again."
                : "Failed to generate report. Please try again.";
            return { error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchReports = useCallback(async (): Promise<{ data?: ReportSummary[]; error?: string }> => {
        try {
            setLoading(true);
            const response = await api.get("/api/interview/reports");
            setReports(response.data.reports);
            return { data: response.data.reports };
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Failed to fetch reports."
                : "Failed to fetch reports.";
            return { error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const getReportById = useCallback(async (id: string): Promise<{ data?: InterviewReport; error?: string }> => {
        try {
            setLoading(true);
            const response = await api.get(`/api/interview/reports/${id}`);
            setReport(response.data.report);
            return { data: response.data.report };
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Failed to fetch report."
                : "Failed to fetch report.";
            return { error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const downloadResume = useCallback(async (id: string) => {
        try {
            const response = await api.get(`/api/interview/reports/${id}/resume`, {
                responseType: "blob",
            });

            const contentDisposition = response.headers["content-disposition"];
            let filename = "resume.txt";
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+?)"?$/);
                if (match) filename = match[1];
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download resume:", error);
        }
    }, []);

    return {
        report,
        reports,
        loading,
        generateReport,
        fetchReports,
        getReportById,
        downloadResume,
    };
};

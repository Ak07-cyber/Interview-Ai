import { generateInterviewReport, getUserReports, getReportById as fetchReportById, downloadResumeById, type GenerateInterviewReportPayload } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext, type InterviewContextType } from "../interview.context";


export const useInterview=()=>{

    const context=useContext(InterviewContext);

    if(!context){
        throw new Error("useInterview must be used within the InterviewProvider")
    }

    const { loading,setLoading,report,setReport,reports,setReports } = context as InterviewContextType;

    const generateReport=async({jobDescription ,selfDescription,resumeFile}: GenerateInterviewReportPayload)=>{
        setLoading(true);
        let response=null;
        try{
            response=await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
            return { data: response.interviewReport, error: null };
        }catch(error: any){
            console.error(error);
            const message = error?.response?.data?.message || "Something went wrong. Please try again.";
            return { data: null, error: message };
        }finally{
            setLoading(false);
        }
    }

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await getUserReports();
            setReports(data.reports);
            return data.reports;
        } catch (error) {
            console.error("Error fetching reports:", error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    const getReportById = async (id: string) => {
        setLoading(true);
        try {
            const data = await fetchReportById(id);
            setReport(data.report);
            return data.report;
        } catch (error) {
            console.error("Error fetching report:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const downloadResume = async (id: string) => {
        try {
            await downloadResumeById(id);
        } catch (error) {
            console.error("Error downloading resume:", error);
        }
    }

    return { loading, report, reports, generateReport, fetchReports, getReportById, downloadResume, setReport, setReports };
}

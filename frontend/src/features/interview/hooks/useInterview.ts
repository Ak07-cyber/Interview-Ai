import { generateInterviewReport, type GenerateInterviewReportPayload } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context"; //this is the store which will store all the content


export const useInterview=()=>{

    const context=useContext(InterviewContext);

    if(!context){
        throw new Error("useInterview must be used within the InterviewProvider")
    }

    const { loading,setLoading,report,setReport,reports,setReports }=context;

    const generateReport=async({jobDescription ,selfDescription,resumeFile}: GenerateInterviewReportPayload)=>{
        setLoading(true);
        let response=null;
        try{
            response=await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
            return response.interviewReport;
        }catch(error){
            console.error(error);
            return null;
        }finally{
            setLoading(false);
        }
    }

    return { loading, report, reports, generateReport, setReport, setReports };
}

import type { ReactNode } from "react";
import { createContext, useState } from "react";

export const InterviewContext=createContext<any>(null);

export const InterviewProvider=({children}:{ children: ReactNode })=>{
    const [loading,setLoading]=useState(false)
    const [report,setReport]=useState(null);
    const [reports,setReports]=useState([]);// will be usefull in the version 2 of the application

    return(
        <InterviewContext.Provider value={{loading,setLoading,report,setReport,reports,setReports}}>
            {children}
        </InterviewContext.Provider>
    )
}

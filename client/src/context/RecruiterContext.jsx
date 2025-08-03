import React ,{createContext,useState,useContext} from "react";

const RecruiterContext = createContext();

export const RecruiterProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    JobTitle : "",
    jobCategory: "",
    jobType:"",
    jobLocation:"",
    jobCity:"",
    salaryRange:"",
    jobDescription:"",
    skills:[],
    selectedDisabilities:[],
    accessibilities:[],
    otherAssistiveTools:"",
    deadline:"",
    contactNumber:"",
    additionalInfo:""

  });

    const updateFormData = (field, value) => {
        setFormData((prev) => ({
        ...prev,
        [field]: value,
        }));
    };  

  return (
    <RecruiterContext.Provider value={{ formData, setFormData ,updateFormData}}>
      {children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiterForm = () => useContext(RecruiterContext);
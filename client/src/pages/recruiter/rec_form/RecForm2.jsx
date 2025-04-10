import React, {useState} from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";


function RecForm2(){
    const [JobTitle, setJobTitle] = useState("");
    const [jobCategory, setJobCategory] = useState("");
    const categories = [
        "Software Development",
        "Design",
        "Marketing",
        "Sales",
        "Customer Support",
        "Finance",
        "Human Resources",
        "Operations",
        "Legal",
        "Healthcare",
        "Education & Training",
        "Engineering",
        "Data Science & Analytics",
        "Information Technology (IT)",
        "Administrative",
        "Manufacturing",
        "Project Management",
        "Business Development",
        "Consulting",
        "Content Writing",
        "Media & Communication",
        "Product Management",
        "Supply Chain & Logistics",
        "Quality Assurance",
        "Research & Development",
        "Public Relations",
        "Security",
        "Real Estate",
        "Arts & Entertainment",
        "Government & Public Service",
        "Non-profit & NGO",
        "Other"
        ];
    const [jobType, setJobType] = useState("");
        const jobTypes = [
            "Full-Time",
            "Part-Time",
            "Contract",
            "Internship"
        ];
    const [jobLocation, setJobLocation] = useState("");

        const locationOptions = [
          "Online",
          "Hybrid",
          "Offline"
        ];
    const [jobCity, setJobCity] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && skillInput.trim() !== "") {
        e.preventDefault();
        if (!skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
        }
        setSkillInput("");
        }
    };

    const removeSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };
    const isFormValid = JobTitle.trim() !== "" && jobCategory.trim() !== "" && jobType.trim() !== "" && jobLocation.trim() !== "" && jobDescription.trim() !== "";
    const navigate = useNavigate();
    const handleContinue = () => {
        if (isFormValid) {
            navigate("/RecForm3");
          } else {
            alert("Please fill in all required fields.");
          }
    };

    return (
        <div>
            <Navbar />
            <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
                <div className="landing-container">
                    <div className="text-section">
                    <h2>Add Job details. </h2>
                    </div>
                    <div className="image-section">
                    <img src="/assets/disabled.jpg" alt="Form" />
                    </div>
                </div> 
            </div>

            <div className="container d-flex justify-content-center">
                <div className="w-100" style={{ maxWidth: "600px" }}>
                    <div className="mb-3">
                        <label htmlFor="JobTitle" className="form-label fw-bold">
                        Job Title <span className="text-danger">*</span>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="JobTitle"
                        value={JobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                        />
                    </div>  

                    <div className="mb-3">
                        <label htmlFor="jobCategory" className="form-label fw-bold">
                            Job Category <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select"
                            id="jobCategory"
                            value={jobCategory}
                            onChange={(e) => setJobCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="jobType" className="form-label fw-bold">
                        Job Type <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        id="jobType"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        required
                    >
                        <option value="">Select job type</option>
                        {jobTypes.map((type, idx) => (
                        <option key={idx} value={type}>
                            {type}
                        </option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="jobLocation" className="form-label fw-bold">
                        Job Location <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        id="jobLocation"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        required
                    >
                        <option value="">Select job location</option>
                        {locationOptions.map((location, idx) => (
                        <option key={idx} value={location}>
                            {location}
                        </option>
                        ))}
                    </select>

                    </div>
                    {jobLocation !== "Online" && jobLocation !== "" && (
                    <div className="mb-3">
                    <label htmlFor="jobCity" className="form-label fw-bold">
                        City <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="jobCity"
                        value={jobCity}
                        onChange={(e) => setJobCity(e.target.value)}
                        placeholder="Enter job city"
                        required
                    />
                    </div>
                    )}
                    <div className="mb-3">
                    <label htmlFor="salaryRange" className="form-label fw-bold">
                        Salary Range <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="salaryRange"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                        placeholder="e.g. ₹30,000 - ₹50,000 per month"
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="jobDescription" className="form-label fw-bold">
                        Job Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                        className="form-control"
                        id="jobDescription"
                        rows="5"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Describe the roles, responsibilities, expectations, etc."
                        required
                    ></textarea>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="requiredSkills" className="form-label fw-bold">
                        Required Skills <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="requiredSkills"
                        placeholder="Type a skill and press Enter"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                        <div className="mt-2 d-flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                            <span key={index} className="badge bg-primary d-flex align-items-center">
                                {skill}
                                <button
                                type="button"
                                className="btn-close btn-close-white btn-sm ms-2"
                                aria-label="Remove"
                                onClick={() => removeSkill(index)}
                                ></button>
                            </span>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mb-5 mt-2">
                        <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleContinue}
                        >
                        Continue
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RecForm2;
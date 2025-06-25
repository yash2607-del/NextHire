import React, {useState} from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";

function RecForm3(){
    const [selectedDisabilities, setSelectedDisabilities] = useState([]);

    const disabilities = [
        "Visual impairment",
        "Hearing impairment",
        "Blindness",
        "Muteness",
        "Upper limbs impairments (hands,arms)",
        "Lower limbs impairments (legs,feet)",
        "Locomoter disability"
    ];

    const handleCheckboxChange = (disability) => {
        if (selectedDisabilities.includes(disability)) {
        setSelectedDisabilities(
            selectedDisabilities.filter((item) => item !== disability)
        );
        } else {
        setSelectedDisabilities([...selectedDisabilities, disability]);
        }
    };
    const [accessibilities, setAccessibilities] = useState([]);

    const options = [
        "Wheelchair access / Ramps",
        "Accessible restrooms",
        "Sign language interpreter",
        "Assistive technology support",
        "Flexible work hours",
        "Remote work option",
        "Personal assistance"
    ];

    const handleChange = (item) => {
        if (accessibilities.includes(item)) {
        setAccessibilities(accessibilities.filter((a) => a !== item));
        } else {
        setAccessibilities([...accessibilities, item]);
        }
    };
    const [otherAssistiveTools, setOtherAssistiveTools] = useState("");
    const navigate = useNavigate();
    
    const handleContinue = () => {
        navigate("/RecForm4");
    };


    return(
        <div>
            <Navbar />
            <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
                <div className="landing-container">
                    <div className="text-section">
                    <h2>Accessibity and Disability Inclusion details. </h2>
                    </div>
                    <div className="image-section">
                    <img src="/assets/inclusion.jpg" alt="Form" />
                    </div>
                </div> 
            </div>
            <div className="container d-flex justify-content-center">
                <div className="w-100" style={{ maxWidth: "600px" }}>
                    
                    <div className="mb-3">
                    <label className="form-label fw-bold">
                        Job is inclusive for (select all that apply)
                    </label>
                    <div className="row">
                        {disabilities.map((disability, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`disability-${index}`}
                                checked={selectedDisabilities.includes(disability)}
                                onChange={() => handleCheckboxChange(disability)}
                            />
                            <label className="form-check-label" htmlFor={`disability-${index}`}>
                                {disability}
                            </label>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="mb-3">
                    <label className="form-label fw-bold">
                        Accommodations Provided (select all that apply)
                    </label>
                    <div className="row">
                        {options.map((option, idx) => (
                        <div className="col-md-6" key={idx}>
                            <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`access-${idx}`}
                                checked={accessibilities.includes(option)}
                                onChange={() => handleChange(option)}
                            />
                            <label className="form-check-label" htmlFor={`access-${idx}`}>
                                {option}
                            </label>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="additionalTools" className="form-label fw-bold">
                        Other Assistive Tools (Optional)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="additionalTools"
                        placeholder="e.g. Braille printer, magnification software"
                        value={otherAssistiveTools}
                        onChange={(e) => setOtherAssistiveTools(e.target.value)}
                    />
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

export default RecForm3;
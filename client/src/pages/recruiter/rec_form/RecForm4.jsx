import React, {useState} from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";

function RecForm4(){
    const [deadline, setDeadline] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');  
    return(
        <div>
            <Navbar />
            <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
                <div className="landing-container">
                    <div className="text-section">
                    <h2>You are all set to post your hiring post.</h2>
                    <h4>Last few details.</h4>
                    </div>
                    <div className="image-section">
                    <img src="/assets/form4.jpg" className="w-50" alt="Form" />
                    </div>
                </div> 
            </div>
            <div className="container d-flex justify-content-center">
                <div className="w-100" style={{ maxWidth: "600px" }}>
                    <div className="mb-3">
                    <label htmlFor="deadline" className="form-label fw-bold">
                        Deadline to Apply
                        <span className="text-danger">*</span></label>
                    <input
                        type="date"
                        id="deadline"
                        className="form-control"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label fw-bold">Contact Number
                        <span className="text-danger">*</span>
                        </label>
                        <input
                        type="tel"
                        id="contactNumber"
                        className="form-control"
                        placeholder="Enter your contact number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="additionalInfo" className="form-label fw-bold">
                            Additional Information
                            </label>
                        <textarea
                        id="additionalInfo"
                        className="form-control"
                        rows="4"
                        placeholder="Any other relevant details"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end mb-5 mt-2">
                        <button
                        type="button"
                        className="btn btn-primary"
                       // onClick={handleContinue}
                        >
                        Submit
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default RecForm4;
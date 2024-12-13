import { useState } from "react"
import BackArrow from "../BackArrow.js";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api.js";
import NotebookTitle from "../NotebookTitle.js";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    
    const forgotPassword = async () => {
        try {
            await api.post("/user/forgotPassword", {
                email
            });
            navigate('/verification-code', { state: { email } });
        } catch (error) {   
            setError(true);
        }
    }

    // Submit the email and call the API
    async function handleSubmit() {
        await forgotPassword(email);
    }

    // Handle form change
    function handleChange(event) {
        setError(null);
        setEmail(event.target.value)
    }

    return (
        <div id="forgot-password--bg-container">
            <BackArrow 
                to="/sign-in"
            />

            <div id="forgot-password--container">
                <NotebookTitle 
                    title2={"Forgot Password"} 
                    additionalClass="no-margin"
                />

                <h3 className="forgot-password-h3">Enter your email and we will send back a link to reset your password.</h3>
                <div className="form-section">
                    <label htmlFor="username" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={handleChange}
                        className={`input--sign-in-up${error ? " border-error" : ""}`}
                    />
                </div>
                {error && <p className="error-p" style={{ marginTop: "-7px", marginLeft: "4px" }}>Incorrect email.</p>}

                <button 
                    type="submit" 
                    className="purple-button"
                    id="forgot-password-button" 
                    onClick={handleSubmit}
                >Reset Password</button>
            </div>
        </div>
    )
}
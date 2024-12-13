import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../BackArrow";
import validators from "../../helpers/validators.js";
import NotebookTitle from "../NotebookTitle.js";
import api from "../../apis/api.js";

export default function NewPassword() {
    const [error, setError] = useState(null);
    const location = useLocation();
    const { email } = location ? location.state : "";
    const { isValidPassword } = validators;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: ""
    })

    // API to submit the new password
    const changeForgottenPassword = async () => {
        try {
            await api.post("/user/changeForgottenPassword", {
                new_password: formData.password,
                email
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Handle form change
    function handleChange(event) {
        setError(null);
        setFormData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    
    // Handle the submission of the form
    async function handleSubmit(event) {
        event.preventDefault();

        const err = {}
        if (isValidPassword(formData.password, formData.confirm_password, err, true)) {
            await changeForgottenPassword();
            navigate('/sign-in');
        } else {
            setError(err);
        }
    }

    return (
        <div id="forgot-password--bg-container">
            <BackArrow 
                to="/forgot-password"
            />
            <div id="forgot-password--container">
                <NotebookTitle 
                    title2={"Reset Password"} 
                    additionalClass="no-margin-top"
                />

                <div className="form-section">
                    <label htmlFor="password" className="form-label">New Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your new password" 
                        className={`input--sign-in-up${error ? " border-error" : ""}`} 
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>

                <div className="form-section">
                    <label htmlFor="password" className="form-label">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirm_password" 
                        name="confirm_password" 
                        placeholder="Enter your new password" 
                        className={`input--sign-in-up${error ? " border-error" : ""}`} 
                        onChange={handleChange}
                        value={formData.confirm_password}
                    />
                </div>
                {error && <p className="error-p" style={{ marginTop: "-5px", marginLeft: "4px" }}>{error.password}</p>}

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
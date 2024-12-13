import { useState, useEffect } from "react";
import BackArrow from "../BackArrow";
import { useLocation, useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import api from "../../apis/api";
import NotebookTitle from "../NotebookTitle";

export default function VerificationCode() {
    const [error] = useState(null);
    const [code, setCode] = useState("");
    
    const navigate = useNavigate();
    
    const [canResend, setCanResend] = useState(false);
    const resendInterval = 60000; // 1 min
    const resendIntervalSeconds = resendInterval / 1000;
    const [timer, setTimer] = useState(resendIntervalSeconds);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return resendIntervalSeconds; // Reset timer
                }

                return prevTimer - 1;
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(countdown);
    }, [timer, resendIntervalSeconds]);

    const location = useLocation();
    const { email } = location ? location.state : "";

    // Submit the OTP
    const verifyOTP = async (otp) => {
        try {
            await api.post("/user/verifyOtp", {
                email,
                otp,
            });

            // the OTP request was successful
            navigate("/new-password", { state: { email } });
        } catch (error) {
            setCode("");
        }
    };
    
    // Resend the OTP 
    const forgotPassword = async () => {
        try {
            await api.post("/user/forgotPassword", {
                email,
            });
            
            // the OTP request was successful
            setCanResend(false);
        } catch (error) {
           console.log(error);
        }
    };
    
    // Handle form submit
    async function handleSubmit(submittedCode) {
        await verifyOTP(submittedCode);
    }

    // Handle link resend
    async function handleResend() {
        await forgotPassword(email);
        setCanResend(false);
        setTimer(resendIntervalSeconds);
    }

    return (
        <div id="forgot-password--bg-container">
            <BackArrow 
                to="/forgot-password"
            />

            <div id="forgot-password--container">
                <NotebookTitle 
                    title2="Verification Code"
                    additionalClass="no-margin"
                />

                <h3 className="forgot-password-h3">A verification code has been sent to the previously provided email. Please enter it below to complete your reset password request.</h3>
                <VerificationInput 
                    classNames={{
                        container: "verification-input--container",
                        character: "verification-input--character",
                        characterInactive: "verification-input-char--inactive",
                        characterSelected: "verification-input-char--selected",
                        characterFilled: "verification-input--char-filled",
                        }}
                        placeholder="_"
                        validChars="0-9"
                        inputProps={{ inputMode: "numeric", autoComplete: "one-time-code" }}
                        onComplete={handleSubmit}
                        onChange={(codeInputted) => setCode(codeInputted)}
                        value={code}
                />
                <div id="no-code--container">
                    <p>Didn't receive a code?</p>
                    {canResend ? 
                    <button 
                        onClick={handleResend}
                    >Resend</button>
                    :
                    <p id="resend--container">
                        <span>Resend in </span>
                        <span className="timer">{timer}</span>
                        <span> seconds</span>
                    </p>
                    }
                </div>
                {error && <p className="error-p" style={{ marginTop: "-10px" }}>Incorrect code</p>}
            </div>
        </div>
    );
}

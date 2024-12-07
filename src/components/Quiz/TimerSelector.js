import React, { useState, useEffect } from "react";

export default function TimerSelector({ onTimerChange }) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // Update the parent with any change in hours, minutes, or seconds
    useEffect(() => {
        onTimerChange({ hours, minutes, seconds });
    }, [hours, minutes, seconds, onTimerChange]);

    return (
        <div className="timer-selector">
            <label className="timer-label">Please select the countdown time for your quiz:</label>
            <div className="timer-dropdowns">
                {/* Hours Dropdown */}
                <select
                    className="timer-dropdown timer-hours"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                >
                    <option value={0}>0 Hours</option>
                    {[...Array(24).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                            {num + 1} Hours
                        </option>
                    ))}
                </select>
                <span className="timer-colon">:</span>
                {/* Minutes Dropdown */}
                <select
                    className="timer-dropdown timer-minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                >
                    <option value={0}>0 Minutes</option>
                    {[...Array(60).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                            {num + 1} Minutes
                        </option>
                    ))}
                </select>
                <span className="timer-colon">:</span>
                {/* Seconds Dropdown */}
                <select
                    className="timer-dropdown timer-seconds"
                    value={seconds}
                    onChange={(e) => setSeconds(Number(e.target.value))}
                >
                    <option value={0}>0 Seconds</option>
                    {[...Array(60).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                            {num + 1} Seconds
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

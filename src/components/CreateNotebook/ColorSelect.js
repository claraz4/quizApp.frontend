import React, { useEffect, useState } from 'react';
import colors from '../../data/colors';

export default function ColorSelect({ formData, setFormData }) {
    const [optionsElement, setOptionsElement] = useState([]);

    useEffect(() => {
        // to convert the hex colors into rgba and be able to change the opacity
        const hexToRgba = (hex, alpha = 0.5) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        setOptionsElement(colors.map((color, idx) => {
            const rgbaColor = formData.color === color ? hexToRgba(color) : "transparent";
            return (
                <div 
                    key={idx}
                    className={`color-square${color === formData.color ? " color-square--selected": ""}`} 
                    style={{ 
                        backgroundColor: color,
                        outlineColor: rgbaColor
                    }}
                    onClick={() => setFormData(prev => {
                        return { ...prev, color };
                    })}
                ></div>
            )
        }))
    }, [formData, setFormData])

    return (
        <div className="color-dropdown--container">
            {optionsElement}
        </div>
    )
}
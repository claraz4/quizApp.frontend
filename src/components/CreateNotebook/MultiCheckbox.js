import React,  { useState, useEffect, useCallback } from 'react';
import CheckboxOption from "./CheckboxOption";
import { SmallSearch } from "./SmallSearch";

export default function MultiCheckbox({ setFormData, keyFormData, isCourses, isGroups, isError, setError }) {
    const [options, setOptions] = useState([]);
    const [optionsElement, setOptionsElement] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const [optionsIds, setOptionsIds] = useState(new Set());
    const [optionsNames, setOptionsNames] = useState(new Set());
    const [selectedOptionsElements, setSelectedOptionsElements] = useState([]);

    // To deal with the checkboxes
    const handleCheckbox = useCallback((event) => {
        setError(null);
        const { value } = event.target;
        const currId = Number(extractId(value));
        const currName = extractName(value);
        
        setSelectedOptions((prev) => {
            const newSelectedOptions = new Set(prev);

            if (prev.has(value)) {
                newSelectedOptions.delete(value);

                setOptionsIds((prevIds) => {
                    const newIds = new Set(prevIds);
                    newIds.delete(Number(currId));
                    return newIds;
                })

                setOptionsNames((prevNames) => {
                    const newNames = new Set(prevNames);
                    newNames.delete(currName);
                    return newNames;
                })
            }
            else {
                newSelectedOptions.add(value);

                setOptionsIds((prevIds) => {
                    const newIds = new Set(prevIds);
                    newIds.add(Number(currId));
                    return newIds;
                })

                setOptionsNames((prevNames) => {
                    const newNames = new Set(prevNames);
                    newNames.add(currName);
                    return newNames;
                })
            };

            return newSelectedOptions;
        })
    }, [])

    // Set up the options
    useEffect(() => {
        setOptionsElement(() => {
            return options.map((option, idx) => {
                const isChecked = optionsIds.has(Number(option.id));
                const field = isCourses ? "courses" : isGroups ? "groups" : "";
                
                return (
                    <div key={idx}>
                        <input id={`${field}-checkbox-${idx}`} type="checkbox" value={`${option.id}-${option.name}`} onChange={handleCheckbox} checked={isChecked} />
                        <label htmlFor={`${field}-checkbox-${idx}`}>{option.name}</label>
                    </div>
                )
            }) 
        })
    }, [options, optionsIds, handleCheckbox, isCourses, isGroups])

    useEffect(() => {
        setFormData(prev => {
            return {
                ...prev,
                [keyFormData]: Array.from(optionsIds)
            }
        })
    }, [optionsIds, setFormData, keyFormData])
    
    // Create the selected options
    useEffect(() => {
        setSelectedOptionsElements(() => Array.from(selectedOptions).map((option, key) => {
            return <CheckboxOption 
                        name={extractName(option)} 
                        key={key} 
                        handleCheckbox={handleCheckbox} 
                        courseInfo={option}
                    />
        }))
    }, [optionsNames, handleCheckbox, selectedOptions])

    // Extract id and name of the checkboxes
    const extractId = (value) => value.substring(0,value.indexOf("-"));
    const extractName = (value) => value.substring(value.indexOf("-") + 1);

    return (
        <div className="courses-options--container">
            <div id="selected-courses--container" className={isError ? "border-error" : ""}>
                {selectedOptionsElements}
            </div>

            <div>
                <SmallSearch 
                    setOptions={setOptions}
                    isCourses={isCourses}
                    isGroups={isGroups}
                />
                <div id="courses-options">
                    {optionsElement}
                </div>
            </div>
            
        </div>
    )
}
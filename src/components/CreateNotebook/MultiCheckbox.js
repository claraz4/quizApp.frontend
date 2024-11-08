import React,  { useState, useEffect, useCallback } from 'react';
import CheckboxOption from "./CheckboxOption";
import { SmallSearch } from "./SmallSearch";

export default function MultiCheckbox({ setFormData, keyFormData, isCourses, isGroups }) {
    const [options, setOptions] = useState([]);
    const [optionsElement, setOptionsElement] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const [coursesIds, setOptionsIds] = useState(new Set());
    const [coursesNames, setOptionsNames] = useState(new Set());
    const [selectedOptionsElements, setSelectedOptionsElements] = useState([]);

    // To deal with the checkboxes
    const handleCheckbox = useCallback((event) => {
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
                const isChecked = coursesIds.has(Number(option.id));
                
                return (
                    <div key={idx}>
                        <input id={`courses-checkbox-${idx}`} type="checkbox" value={`${option.id}-${option.name}`} onChange={handleCheckbox} checked={isChecked} />
                        <label htmlFor={`courses-checkbox-${idx}`}>{option.name}</label>
                    </div>
                )
            }) 
        })
    }, [options, coursesIds, handleCheckbox])

    useEffect(() => {
        setFormData(prev => {
            return {
                ...prev,
                [keyFormData]: Array.from(coursesIds)
            }
        })
    }, [coursesIds, setFormData, keyFormData])
    
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
    }, [coursesNames, handleCheckbox, selectedOptions])

    // Extract id and name of the checkboxes
    const extractId = (value) => value.substring(0,value.indexOf("-"));
    const extractName = (value) => value.substring(value.indexOf("-") + 1);

    return (
        <div className="courses-options--container">
            <div id="selected-courses--container">
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
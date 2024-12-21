import React, { useEffect, useMemo, useState } from 'react';
import Select from "react-select";
import apiPrivate from '../../apis/apiPrivate';

export default function DiscoverSelects({ courseSelected, ratingSelected, majorSelected, setCourseSelected, setMajorSelected, setRatingSelected }) {
    const majorsAllOption = useMemo(() => {
        return { value: "all", label: "All Majors" }
    }, []);
    const coursesAllOption = useMemo(() => {
        return { value: "all", label: "All Courses" }
    }, []);

    const [coursesOptions, setCoursesOptions] = useState([]);
    const [majorsOptions, setMajorsOptions] = useState([]);

    const ratingsOptions = [
        { value: "all", label: "Any Rating"},
        { value: "5", label: "5 Only" },
        { value: "4", label: "4 and Above" },
        { value: "3", label: "3 and Above" },
        { value: "2", label: "2 and Above" },
        { value: "1", label: "1 and Above" },
    ];

    // Get all majors
    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const { data } = await apiPrivate.get("/majors");

                const majorsOptionsArr = data.map(major => {
                    return { value: major.id, label: major.name };
                });
                setMajorsOptions([ majorsAllOption, ...majorsOptionsArr ]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMajors();
    }, [majorsAllOption])

    // Get all courses for the selected majors if any
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await apiPrivate.get(`/courses?major_id=${majorSelected.value !== "all" ? majorSelected.value : ""}`);
                
                const coursesOptionsArr = data.map(course => {
                    return { value: course.id, label: course.name }
                });
                setCoursesOptions([ coursesAllOption, ...coursesOptionsArr ]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCourses();
    }, [majorSelected, coursesAllOption])

    // I don't know what this code did
    // useEffect(() => {
    //     if (Array.isArray(coursesSelected) && checkObjectInArray(coursesSelected, "value", "all")) {
    //         setCoursesSelected(prev => prev.filter(object => object.value !== "all"));
    //     }
    // }, [coursesSelected, setCoursesSelected]);

    // Check that an array contains an object with a specific attribute
    // function checkObjectInArray(array, attributeName, value) {
    //     let isObject;
    //     if (Array.isArray(array)) {
    //         isObject = array.some((obj) => obj[attributeName] === value);
    //     } else {
    //         isObject = array[attributeName] === value;
    //     }

    //     return isObject;
    // }

    // Handle the change of courses
    // function handleCoursesChange(options) {
    //     if (Array.isArray(coursesSelected) && coursesSelected.length !== 1 && checkObjectInArray(options, "value", "all")) {
    //         setCoursesSelected(coursesAllOption);
    //     } else {
    //         setCoursesSelected(options);
    //     }
    // }

    // When no course is selected, set it to the all option
    // useEffect(() => {
    //     if (Array.isArray(coursesSelected) && coursesSelected.length === 0) {
    //         setCoursesSelected(coursesAllOption);
    //     }
    // }, [coursesSelected, coursesAllOption, setCoursesSelected])

    return (
        <div className="select-container--discover">
            <Select 
                options={majorsOptions}
                defaultValue={majorsOptions[0]}
                value={majorSelected}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                    primary25: '#D6BBFB',
                    primary: '#9E77ED',
                    },
                })}
                onChange={(option) => setMajorSelected(option)}
            />
            <Select 
                options={coursesOptions}
                defaultValue={coursesOptions[0]}
                value={courseSelected}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                    primary25: '#D6BBFB',
                    primary: '#9E77ED',
                    },
                })}
                // isMulti={!(coursesSelected && checkObjectInArray(coursesSelected, "value", "all"))}
                onChange={(value) => setCourseSelected(value)}
            />
            {/* <Select 
                options={ratingsOptions}
                defaultValue={ratingsOptions[0]}
                value={ratingSelected}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                    primary25: '#D6BBFB',
                    primary: '#9E77ED',
                    },
                })}
                onChange={(option) => setRatingSelected(option)}
            /> */}
        </div>
    )
}
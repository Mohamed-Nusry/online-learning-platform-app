import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'; 
import { getEnrolledCourseDetails } from "../../../library/store/course";
import { getAuthUserId } from "../../../library/helper";

export default function EnrolledCoursePage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const courseData = useSelector(state => state.course)

    useEffect(() => {
        let student_id = null;

        if(getAuthUserId() != null) {
            student_id = getAuthUserId();
        }

        const payload = {
            student_id: student_id,
        }

        dispatch(getEnrolledCourseDetails(payload));
    }, [])

    const gotoCourseDetails = (id) => {
        history.push(`/user/course/details/${id}`);
    }

    const goBack = () => {
        history.push("/user/dashboard");
    }

    
    if (courseData.isLoading) {
        return <div className="form-box">
        <div className="fullHeight p-ai-center p-d-flex p-jc-center">
                <div className="m-3 px-3 py-4 px-sm-4 py-sm-5">
                    <ProgressSpinner />
                </div>
            </div>
        </div>;
    } else if (courseData && courseData.enrolledData && courseData.enrolledData.length <= 0) {
        return  <div className="container">
            <div className="row">
                <div className="col col-md-12">
                    <Button className="mt-4 mb-4" icon="pi pi-arrow-left" label="Back" onClick={goBack} />
                    <h4 className="mt-4 text-center" >Enrolled Courses</h4>
                </div>
            </div>
            <div className="row pt-4">
                <div className="col col-md-4">
                <p>No Enrolled Courses</p>
                </div>
            </div>
        </div>;
    } else {
        return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-md-12">
                        <Button className="mt-4 mb-4" icon="pi pi-arrow-left" label="Back" onClick={goBack} />
                        <h4 className="mt-4 text-center" >Enrolled Courses</h4>
                    </div>
                </div>
                <div className="row pt-4">
                    {courseData && courseData.enrolledData && courseData.enrolledData.map((item, index) => (
                    <div className="col-12 col-sm-6 col-md-4 mt-4">
                        <Card title={item.course_data.name}>
                            <p className="m-0">
                                Click on view to show details
                            </p>
                            
                            <div className="mt-4 pt-4">
                                <Button label="View" icon="pi pi-eye" onClick={() => gotoCourseDetails(item.course_id)} />
                            </div>
                        </Card>
                    </div>
                    ))}
                </div>
            </div>
        </>
        );
    }
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import { getCourseDetails } from "../../library/store/course";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'; 
import { setEnrollmentSuccessFalse } from "../../library/store/enrollment";

export default function StudentDashboardPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const courseData = useSelector(state => state.course)

    useEffect(() => {
        dispatch(getCourseDetails());
        dispatch(setEnrollmentSuccessFalse());
    }, [])

    const gotoCourseDetails = (id) => {
        history.push(`/user/course/details/${id}`);
    }

    const myEnrolledCourses = () => {
        history.push("/user/course/endrolled");
    }

    
    if (courseData.isLoading) {
        return <div className="form-box">
        <div className="fullHeight p-ai-center p-d-flex p-jc-center">
                <div className="m-3 px-3 py-4 px-sm-4 py-sm-5">
                    <ProgressSpinner />
                </div>
            </div>
        </div>;
    } else if (courseData && courseData.data && courseData.data.length <= 0) {
        return  <div className="container">
            <div className="row">
                <div className="col col-md-12">
                    <h4 className="text-center mt-4" >Welcome to Student Panel</h4>
                    <Button className="mt-3 mb-4" icon="pi pi-arrow-right" iconPos="right" label="My Enrolled Courses" onClick={myEnrolledCourses} />
                    <h4 className="mt-4" >Available Courses</h4>
                </div>
            </div>
            <div className="row pt-4">
                <div className="col col-md-4">
                <p>No Courses</p>
                </div>
            </div>
        </div>;
    } else {

        return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-md-12">
                        <h4 className="text-center mt-4" >Welcome to Student Panel</h4>
                        <Button className="mt-4 mb-4" icon="pi pi-arrow-right" iconPos="right" label="My Enrolled Courses" onClick={myEnrolledCourses} />
                        <h4 className="mt-4" >Available Courses</h4>
                    </div>
                </div>
                <div className="row pt-4">
                    {courseData && courseData.data && courseData.data.map((item, index) => (
                    <div className="col-12 col-sm-6 col-md-4 mt-4">
                        <Card title={item.name}>
                            <p className="m-0">
                                Click on view to show details and enroll
                            </p>
                            
                            <div className="mt-4 pt-4">
                                <Button label="View" icon="pi pi-eye" onClick={() => gotoCourseDetails(item.id)} />
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

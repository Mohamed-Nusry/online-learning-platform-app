import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button'; 
import { useParams } from "react-router-dom";
import { loadOneCourse } from "../../../library/store/course";
import { confirmDialog } from 'primereact/confirmdialog';
import { getAuthUserId } from "../../../library/helper";
import { createNewEnrollment, isAlreadyEnrolled } from "../../../library/store/enrollment";
import { toastMessage } from "../../../library/store/toast";

export default function CourseDetailsPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const courseData = useSelector(state => state.course)
    const createInfo = useSelector(state => state.enrollment);

    const params = useParams();

    useEffect(() => {
        dispatch(loadOneCourse(params.id));
    }, [])

    useEffect(() => {
        let student_id = null;
        let course_id = null;

        if(courseData.singleData && courseData.singleData.id != null) {
            course_id = courseData.singleData && courseData.singleData.id
        }

        if(getAuthUserId() != null) {
            student_id = getAuthUserId();
        }

        const payload = {
            student_id: student_id,
            course_id: course_id
        }

        dispatch(isAlreadyEnrolled(payload));

        if(courseData.isError) {
            const message = {
              severity: "error",
              summary: "Error",
              detail: courseData.errorMessage,
              life: 3000,
            };
            dispatch(toastMessage(message));

            setTimeout(() => {
                history.push("/user/dashboard");
            }, 1000);
        }
    }, [courseData])

    useEffect(() => {
        if(createInfo.isCreateSuccess) {
            const message = {
                severity: "success",
                summary: "Enrollment",
                detail: "Enrolled Successfully!",
                life: 3000,
            };
            dispatch(toastMessage(message));
            history.push("/user/dashboard");
        }
    
        if(createInfo.isError) {
          const message = {
            severity: "error",
            summary: "Error",
            detail: createInfo.errorMessage,
            life: 3000,
          };
          dispatch(toastMessage(message));
        }
    
      },[createInfo])

    const goBack = () => {
        history.push("/user/dashboard");
    }

    const enrollCourse = () => {
        let student_id = null;
        let course_id = null;

        if(courseData.singleData && courseData.singleData.id != null) {
            course_id = courseData.singleData && courseData.singleData.id
        }

        if(getAuthUserId() != null) {
            student_id = getAuthUserId();
        }

        const payload = {
            student_id: student_id,
            course_id: course_id
        }

        confirmDialog({
            message: 'Are you sure want to enroll?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => dispatch(createNewEnrollment(payload)),
            reject: () => null
        });
    }
    
    if (courseData.isLoading) {
        return <div className="form-box">
        <div className="fullHeight p-ai-center p-d-flex p-jc-center">
                <div className="m-3 px-3 py-4 px-sm-4 py-sm-5">
                    <ProgressSpinner />
                </div>
            </div>
        </div>;
    } else if (courseData && courseData.singleData && courseData.singleData == null) {
        return  <div className="container">
            <div className="row">
                <Button className="mt-3" icon="pi pi-arrow-left" label="Home" onClick={goBack} />
                <div className="col col-md-12">
                    <h4 className="mt-4" >Course Details</h4>
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
                    <Button className="mt-3" icon="pi pi-arrow-left" label="Home" onClick={goBack} />
                    <div className="col col-md-12">
                        <h4 className="mt-4 text-center">Course Details</h4>
                    </div>
                </div>
                <div className="row pt-4">              
                    <div className="col col-md-12">

                        <div className="form-box">
                            <div className=" p-d-flex p-jc-center">
                                <div className="shadow card m-3 px-3 py-4 px-sm-4 py-sm-5">
                                    <h4 className="text-center">{courseData.singleData && courseData.singleData.name != null ? courseData.singleData.name : 'N/A'}</h4>
                                    <p className="mt-3">{courseData.singleData && courseData.singleData.description != null ? courseData.singleData.description : 'No Description'}</p>
                                
                                    <Button className="mt-4" label={createInfo.isCheckLoading ? 'Loading...' : createInfo.isUserEnrolled ? 'Already Enrolled' : 'Enroll'} disabled={createInfo.isLoading || createInfo.isCheckLoading || createInfo.isUserEnrolled}  onClick={() => enrollCourse()} />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
        );
    }
}

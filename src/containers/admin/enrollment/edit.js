import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { loadOneEnrollment, updateEnrollment } from "../../../library/store/enrollment";
import { toastMessage } from "../../../library/store/toast";
import { useParams } from "react-router-dom";
import { getStudentDetails } from "../../../library/store/student";
import { getCourseDetails } from "../../../library/store/course";


export default function EditEnrollmentPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const editInfo = useSelector(state => state.enrollment);
  const studentData = useSelector(state => state.student);
  const courseData = useSelector(state => state.course);

  const EnrollmentSchema = Yup.object().shape({
    student_id: Yup.mixed().required("Student is required"),
    course_id: Yup.mixed().required("Course is required"),
  });

  const params = useParams();

  useEffect(() => {
    if(editInfo.singleData != null) {
      formik.initialValues.id = editInfo.singleData.id;
      formik.initialValues.student_id = editInfo.singleData.student_id;
      formik.initialValues.course_id = editInfo.singleData.course_id;
    }

    if(editInfo.isLoading) {
        formik.setSubmitting(true);
    }else {
        formik.setSubmitting(false);
    }

    if(editInfo.isCreateSuccess) {
        const message = {
            severity: "success",
            summary: "Update",
            detail: "Updated Successfully!",
            life: 3000,
        };
        dispatch(toastMessage(message));
        history.push("/admin/enrollments");
    }

    if(editInfo.isError) {
      const message = {
        severity: "error",
        summary: "Error",
        detail: editInfo.errorMessage,
        life: 3000,
      };
      dispatch(toastMessage(message));
    }

  },[editInfo])

  useEffect(() => {
    dispatch(loadOneEnrollment(params.id));
    dispatch(getStudentDetails());
    dispatch(getCourseDetails());
  },[])


  const formik = useFormik({
    initialValues: {
      id: "",
      student_id: "",
      course_id: ""
    },
    validationSchema: EnrollmentSchema,
    onSubmit: (data) => {
      dispatch(updateEnrollment(data));
    },
  });

  const { errors, touched, isSubmitting, handleSubmit } = formik;

  return (
    <div className="form-box">
      <div className=" p-d-flex p-jc-center">
        <div className="shadow card m-3 px-3 py-4 px-sm-4 py-sm-5">
          <h4 className="text-center">Edit Enrollment</h4>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
                <span className="p-float-label">
                <Dropdown 
                  value={formik.values.student_id} 
                  name="student_id" 
                  onChange={formik.handleChange} 
                  options={studentData.data} 
                  optionLabel="first_name" 
                  optionValue="id"
                  placeholder="Select a Student*" 
                  className="w-full md:w-14rem" 
                />
                  <label
                    htmlFor="student_id"
                    className={classNames({
                      "p-error": Boolean(touched.student_id && errors.student_id),
                    })}
                  >
                    
                  </label>
                </span>
                {Boolean(touched.student_id && errors.student_id) && (
                  <small className="p-error">{formik.errors["student_id"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                <Dropdown 
                  value={formik.values.course_id} 
                  name="course_id" 
                  onChange={formik.handleChange} 
                  options={courseData.data} 
                  optionLabel="name" 
                  optionValue="id"
                  placeholder="Select a Course*" 
                  className="w-full md:w-14rem" 
                />
                  <label
                    htmlFor="course_id"
                    className={classNames({
                      "p-error": Boolean(touched.course_id && errors.course_id),
                    })}
                  >
                    
                  </label>
                </span>
                {Boolean(touched.course_id && errors.course_id) && (
                  <small className="p-error">{formik.errors["course_id"]}</small>
                )}
              </div>

              <div className="submitBtnBox">
                <Button
                  type="submit"
                  label="Submit"
                  iconPos="right"
                  loading={isSubmitting}
                  className="mt-4 submitBtn"
                  disabled={isSubmitting}
                />
              </div>
             
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}

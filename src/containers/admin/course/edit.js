import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { loadOneCourse, updateCourse } from "../../../library/store/course";
import { toastMessage } from "../../../library/store/toast";
import { useParams } from "react-router-dom";


export default function EditCoursePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const editInfo = useSelector(state => state.course);

  const CourseSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string()
  });

  const params = useParams();

  useEffect(() => {
    if(editInfo.singleData != null) {
      formik.initialValues.id = editInfo.singleData.id;
      formik.initialValues.name = editInfo.singleData.name;
      formik.initialValues.description = editInfo.singleData.description;
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
        history.push("/admin/courses");
    }

  },[editInfo])

  useEffect(() => {
    dispatch(loadOneCourse(params.id));
  },[])


  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: ""
    },
    validationSchema: CourseSchema,
    onSubmit: (data) => {
      dispatch(updateCourse(data));
    },
  });

  const { errors, touched, isSubmitting, handleSubmit } = formik;

  return (
    <div className="form-box">
      <div className=" p-d-flex p-jc-center">
        <div className="shadow card m-3 px-3 py-4 px-sm-4 py-sm-5">
          <h4 className="text-center">Edit Course</h4>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="p-fluid">
              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.name && errors.name),
                    })}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({
                      "p-error": Boolean(touched.name && errors.name),
                    })}
                  >
                    Course Name*
                  </label>
                </span>
                {Boolean(touched.name && errors.name) && (
                  <small className="p-error">{formik.errors["name"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <InputTextarea
                    rows={5} cols={30}
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.description && errors.description),
                    })}
                  />
                  <label
                    htmlFor="description"
                    className={classNames({
                      "p-error": Boolean(touched.description && errors.description),
                    })}
                  >
                    Description
                  </label>
                </span>
                {Boolean(touched.description && errors.description) && (
                  <small className="p-error">{formik.errors["description"]}</small>
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

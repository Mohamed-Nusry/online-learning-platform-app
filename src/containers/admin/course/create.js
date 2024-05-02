import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { createNewCourse } from "../../../library/store/course";
import { toastMessage } from "../../../library/store/toast";

export default function CreateCoursePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const createInfo = useSelector(state => state.course);

  const CourseSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string()
  });

  useEffect(() => {
    if(createInfo.isLoading) {
        formik.setSubmitting(true);
    }else {
        formik.setSubmitting(false);
    }

    if(createInfo.isCreateSuccess) {
        const message = {
            severity: "success",
            summary: "Creation",
            detail: "Created Successfully!",
            life: 3000,
        };
        dispatch(toastMessage(message));
        history.push("/admin/courses");
    }

  },[createInfo])

  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: CourseSchema,
    onSubmit: (data) => {
      dispatch(createNewCourse(data));
    },
  });

  const { errors, touched, isSubmitting, handleSubmit } = formik;

  return (
    <div className="form-box">
      <div className=" p-d-flex p-jc-center">
        <div className="shadow card m-3 px-3 py-4 px-sm-4 py-sm-5">
          <h4 className="text-center">Create Course</h4>
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

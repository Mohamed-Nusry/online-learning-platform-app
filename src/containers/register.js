import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "../assets/css/login.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Link } from "react-router-dom";
import { registerUser } from "../library/store/authentication";
import { CheckToken, getRole } from "../library/helper";

export default function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginInfo = useSelector(state => state.authentication);

  useEffect(() => {
    if (CheckToken()) {
      if(getRole() != null) {
        if(getRole() === 'ADMIN') {
          history.push("/admin/students");
        }else {
          history.push("/user/dashboard");
        }
      }
    }
  }, [loginInfo]);

  const LoginSchema = Yup.object().shape({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    username: Yup.string().required("username is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string().min(8).required("password is required"),
    password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      dispatch(registerUser(data));

      setTimeout(() => {
        formik.setSubmitting(false);
      }, 2000);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit } = formik;

  return (
    <div className="form-box">
      <div className="fullHeight p-ai-center p-d-flex p-jc-center">
        <div className="shadow card m-3 px-3 py-4 px-sm-4 py-sm-5">
          <h4 className="text-center">Online Learning Platform</h4>
          <p className="text-center mb-3">Enter information to register</p>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="p-fluid">
              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="first_name"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.first_name && errors.first_name),
                    })}
                  />
                  <label
                    htmlFor="first_name"
                    className={classNames({
                      "p-error": Boolean(touched.first_name && errors.first_name),
                    })}
                  >
                    First Name*
                  </label>
                </span>
                {Boolean(touched.first_name && errors.first_name) && (
                  <small className="p-error">{formik.errors["first_name"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="last_name"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.last_name && errors.last_name),
                    })}
                  />
                  <label
                    htmlFor="last_name"
                    className={classNames({
                      "p-error": Boolean(touched.last_name && errors.last_name),
                    })}
                  >
                    Last Name*
                  </label>
                </span>
                {Boolean(touched.last_name && errors.last_name) && (
                  <small className="p-error">{formik.errors["last_name"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.username && errors.username),
                    })}
                  />
                  <label
                    htmlFor="username"
                    className={classNames({
                      "p-error": Boolean(touched.username && errors.username),
                    })}
                  >
                    Username*
                  </label>
                </span>
                {Boolean(touched.username && errors.username) && (
                  <small className="p-error">{formik.errors["username"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.email && errors.email),
                    })}
                  />
                  <label
                    htmlFor="email"
                    className={classNames({
                      "p-error": Boolean(touched.email && errors.email),
                    })}
                  >
                    Email*
                  </label>
                </span>
                {Boolean(touched.email && errors.email) && (
                  <small className="p-error">{formik.errors["email"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <Password
                    id="password"
                    name="password"
                    toggleMask
                    feedback={false}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.password && errors.password),
                    })}
                  />
                  <label
                    htmlFor="password"
                    className={classNames({
                      "p-error": Boolean(touched.password && errors.password),
                    })}
                  >
                    Password*
                  </label>
                </span>
                {Boolean(touched.password && errors.password) && (
                  <small className="p-error">{formik.errors["password"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <Password
                    id="password_confirmation"
                    name="password_confirmation"
                    toggleMask
                    feedback={false}
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.password_confirmation && errors.password_confirmation),
                    })}
                  />
                  <label
                    htmlFor="password_confirmation"
                    className={classNames({
                      "p-error": Boolean(touched.password_confirmation && errors.password_confirmation),
                    })}
                  >
                   Confirm Password*
                  </label>
                </span>
                {Boolean(touched.password_confirmation && errors.password_confirmation) && (
                  <small className="p-error">{formik.errors["password_confirmation"]}</small>
                )}
              </div>

              

              <div className="submitBtnBox">
                <Button
                  type="submit"
                  label="Register"
                  iconPos="right"
                  loading={isSubmitting}
                  className="mt-4 submitBtn"
                  disabled={isSubmitting}
                />
              </div>

              <div className="signupBox mt-3 text-center">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
              
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}

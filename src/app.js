import React from "react";
import LoginPage from "./containers/login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingRoute, PrivateRoute } from "./library/helper";

import ToastManager from "./components/toast";

// pages
import RegisterPage from "./containers/register";
import NotfoundPage from "./containers/notfound";
import CoursesPage from "./containers/admin/course/courses";
import CreateCoursePage from "./containers/admin/course/create";
import EditCoursePage from "./containers/admin/course/edit";
import StudentsPage from "./containers/admin/student/students";
import CreateStudentPage from "./containers/admin/student/create";
import EditStudentPage from "./containers/admin/student/edit";
import EnrollmentsPage from "./containers/admin/enrollment/enrollments";
import CreateEnrollmentPage from "./containers/admin/enrollment/create";
import EditEnrollmentPage from "./containers/admin/enrollment/edit";
import StudentDashboardPage from "./containers/front/dashboard";
import CourseDetailsPage from "./containers/front/course/details";
import EnrolledCoursePage from "./containers/front/course/enrolled";
import LandingPage from "./containers/landing";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <LandingRoute exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/admin/courses" component={CoursesPage} />
          <PrivateRoute exact path="/admin/courses/new" component={CreateCoursePage} />
          <PrivateRoute exact path="/admin/course/edit/:id" component={EditCoursePage} />
          <PrivateRoute exact path="/admin/students" component={StudentsPage} />
          <PrivateRoute exact path="/admin/students/new" component={CreateStudentPage} />
          <PrivateRoute exact path="/admin/student/edit/:id" component={EditStudentPage} />
          <PrivateRoute exact path="/admin/enrollments" component={EnrollmentsPage} />
          <PrivateRoute exact path="/admin/enrollments/new" component={CreateEnrollmentPage} />
          <PrivateRoute exact path="/admin/enrollment/edit/:id" component={EditEnrollmentPage} />
          <PrivateRoute exact path="/user/dashboard" component={StudentDashboardPage} />
          <PrivateRoute exact path="/user/course/endrolled" component={EnrolledCoursePage} />
          <PrivateRoute exact path="/user/course/details/:id" component={CourseDetailsPage} />
          <Route path="*" component={NotfoundPage} />
        </Switch>
      </Router>
      
      <ToastManager />
    </>
  );
}

export default App;

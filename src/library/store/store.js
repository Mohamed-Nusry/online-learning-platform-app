import { configureStore } from "@reduxjs/toolkit";

// reducers
import SideBarReducer from "./sidebar";
import ToastReducer from "./toast";
import AuthenticationReducer from "./authentication";
import CourseReducer from "./course";
import StudentReducer from "./student";
import EnrollmentReducer from "./enrollment";

export const store = configureStore({
  reducer: {
    sidebar: SideBarReducer,
    toast: ToastReducer,
    authentication: AuthenticationReducer,
    course: CourseReducer,
    student: StudentReducer,
    enrollment: EnrollmentReducer,
  },
});

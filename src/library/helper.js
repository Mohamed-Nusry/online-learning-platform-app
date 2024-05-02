import { Route, Redirect } from "react-router-dom";
import LayoutPage from "../components/layout";
import FrontLayoutPage from "../components/frontlayout";
import LandingLayoutPage from "../components/landinglayout";


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      CheckToken() ? (
        getRole() != null && getRole() === 'ADMIN' ? (
        <LayoutPage>
          <Component {...props} />
        </LayoutPage>
      )
    :   <FrontLayoutPage>
          <Component {...props} />
        </FrontLayoutPage>
    ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export const LandingRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      <LandingLayoutPage>
        <Component {...props} />
      </LandingLayoutPage>
    }
  />
);

export const CheckToken = () => {
  var token = getToken();
  if (token) {
    return true;
  }
  return false;
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const getRole = () => {
  return localStorage.getItem("role") || null;
};

export const getAuthUserId = () => {
  return localStorage.getItem("user_id") || null;
};

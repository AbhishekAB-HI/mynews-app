import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../Redux-store/reduxstore";
import { useLocation, useNavigate } from "react-router-dom";

type RootState = ReturnType<typeof store.getState>;

interface ProtectiveCheckProps {
  element: React.ReactNode;
}

const UserLogoutPrivateRoute: React.FC<ProtectiveCheckProps> = ({ element }) => {
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.accessTocken.userTocken
  );
  const navigate = useNavigate();
  const location = useLocation();
console.log("11111111111111111111111111111111",isUserAuthenticated);

  useEffect(() => {
    if (isUserAuthenticated) {
      console.log("222222222222222222222222222222222");
      
      navigate("/homepage", { state: { from: location } });
    }
  }, [isUserAuthenticated, navigate, location]);
console.log("3333333333333333333333333333333333333333");

  return isUserAuthenticated ? null : element;
};

export default UserLogoutPrivateRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
export interface onlyChildProps {
  children: React.ReactElement<any, any> | null;
}

const IsNotLogged: React.FC<onlyChildProps> = ({ children }) => {
  const location = useLocation();
  const user: any = useSelector((state:any) => state.user.user);

  return !user ? (
    children
  ) : (
    <Navigate
      to={"/"}
      replace
      state={{ destinationPathname: location.pathname }}
    />
  );
};

export default IsNotLogged;

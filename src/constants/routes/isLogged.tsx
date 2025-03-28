import React from "react";
import { Navigate, useLocation } from "react-router";
import { routes } from "..";
import { useSelector } from "react-redux";

export interface onlyChildProps {
  children: React.ReactElement<any, any> | null;
}

const IsLogged: React.FC<onlyChildProps> = ({ children }) => {
  const location = useLocation();
  const user: any = useSelector((state:any) => state.user.user); 
  return user && user ? (
    children
  ) : (
    <Navigate
      to={routes.login}
      replace
      state={{ destinationPathname: location.pathname }}
    />
  );
};

export default IsLogged;

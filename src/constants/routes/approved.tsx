import React from "react";
import { Navigate, useLocation } from "react-router";
import { ErrorPages } from "../../providers/ErrorPages";
import { useSelector } from "react-redux";
export interface onlyChildProps {
  children: React.ReactElement<any, any> | null;
}
export enum UserStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

const Approved: React.FC<onlyChildProps> = ({ children }) => {
  const location = useLocation();
  const user: any = useSelector((state) => state.user.user);
  // console.log(user,"useruser")
  return user && user.status === UserStatus.approved ? (
    children
  ) : (
    <Navigate
      to={ErrorPages.no_access}
      replace
      state={{ destinationPathname: location.pathname }}
    />
  );
};

export default Approved;

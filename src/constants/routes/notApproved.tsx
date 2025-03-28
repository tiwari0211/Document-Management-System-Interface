import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
export interface onlyChildProps {
  children: React.ReactElement<any, any> | null;
}
export enum UserStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

const NotApproved: React.FC<onlyChildProps> = ({ children }) => {
  const location = useLocation();
  const user: any = useSelector((state) => state.user.user);
  return user && user.status !== UserStatus.approved ? (
    children
  ) : (
    <Navigate
      to={"/"}
      replace
      state={{ destinationPathname: location.pathname }}
    />
  );
};

export default NotApproved;

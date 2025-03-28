import { FC, useEffect } from "react";
import {  useNavigate } from "react-router";
import NoInternetConnectionPageJSX from "./NoInternetConnectionPageJSX";
import NetworkStatus from "../../providers/NetworkStatus";

const NoInternetConnectionPage: FC = () => {
  const navigate = useNavigate();  
  const  isOnline=NetworkStatus()==="Online"
  useEffect(() => {
    if (  isOnline) {
      navigate(-1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);


  return <NoInternetConnectionPageJSX />;
};

export default NoInternetConnectionPage;

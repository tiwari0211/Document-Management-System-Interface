import { FC } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

import SomethingWentWrongPageJSX from "./SomethingWentWrongPageJSX";
import { ErrorPages } from "../../providers/ErrorPages";
const SomethingWentWrongPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: locationState } = location;
  /* error can of ERROR type
    or custom error 
    {
     message: "Page not found",
     functionName: "registerGuestUser",
     status: response.status,
   }
  */
  const error: any = locationState?.error??{};

  console.log(error);


  const handleGoBack = () => {
    navigate(-1);
  };
 

  if (error && error.status === 404)
    return <Navigate to={ErrorPages.PAGE_NOT_FOUND_ERROR_URL} replace />;


  const DEFAULT_ERROR_MESSSAGE = "Oops, something unexpected occured.";
  return (
    <SomethingWentWrongPageJSX
      errorMessage={
        error && error.message ? error.message :DEFAULT_ERROR_MESSSAGE
      }
      handleGoBack={handleGoBack}
    />
  );
};

export default SomethingWentWrongPage;

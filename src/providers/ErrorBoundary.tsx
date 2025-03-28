import { FC } from "react";
import { Navigate, useRouteError } from "react-router-dom";
import { ErrorPages } from "./ErrorPages";

const ErrorBoundary: FC = () => {
  const error = useRouteError();

  return <Navigate to={ErrorPages.SOMETHING_WENT_WRONG_URL} state={{ message: error }} />;
};

export default ErrorBoundary;

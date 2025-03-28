import { FC } from "react";
import { useNavigate } from "react-router";
import PageNotFoundPageJSX from "./PageNotFoundPageJSX";

const PageNotFoundPage: FC = () => {
  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1);
  };

  return <PageNotFoundPageJSX handleGoBack={handleGoBack} />;
};

export default PageNotFoundPage;

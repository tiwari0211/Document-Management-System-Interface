import { FC } from "react";
import MessageScreen from "../MessageScreen";
import { svgs } from "../../assets";

export interface PageNotFoundPageJSXProps {
  handleGoBack: () => void;
}

const PageNotFoundPageJSX: FC<PageNotFoundPageJSXProps> = ({
  handleGoBack,
}) => {
  return (
    <MessageScreen
      icon={<svgs.BadGatewayErrorIcon />}
      iconsx={{ height: "140px", width: "140px" }}
      heading={"Page not Found"}
      message={
        "Error 404. The page you are looking for does not exist or expired. Go back and try again later."
      }
      button={{
        text: "Go Back",
        onclick: () => {
          handleGoBack();
        },
      }}
    />
  );
};

export default PageNotFoundPageJSX;

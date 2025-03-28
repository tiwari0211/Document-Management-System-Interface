
import { FC } from "react";
import MessageScreen from "../MessageScreen";
import { svgs } from "../../assets";

export interface SomethingWentWrongPageJSXProps {
  errorMessage: string;
  handleGoBack: () => void;
}

const SomethingWentWrongPageJSX: FC<SomethingWentWrongPageJSXProps> = ({
  errorMessage,
  handleGoBack,
}) => {

  return (
    <MessageScreen
    icon={ <svgs.InternalServerErrorIcon />}
    iconsx={{ height: "140px", width: "140px" }}
    heading={"Something went wrong."}
    message={
      errorMessage
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

export default SomethingWentWrongPageJSX;

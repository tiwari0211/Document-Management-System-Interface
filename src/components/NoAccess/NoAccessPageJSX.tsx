import { FC } from "react";
import { svgs } from "../../assets";

import MessageScreen from "../MessageScreen";

export interface NoAccessPageJSXProps {
  handleGoBack: () => void;
}

const NoAccessPageJSX: FC<NoAccessPageJSXProps> = ({ handleGoBack }) => {
  return (
    <MessageScreen
      icon={<svgs.BadGatewayErrorIcon />}
      iconsx={{ height: "140px", width: "140px" }}
      heading={"Access Denied"}
      message={
        "The credential you are using does not have access to this app. Please contact => 9826009863"
      }
      button={{
        text: "Log Out",
        onclick: () => {
          handleGoBack();
        },
      }}
    />
  );
};

export default NoAccessPageJSX;

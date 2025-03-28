import { FC } from "react";
import { svgs } from "../../assets";

import MessageScreen from "../MessageScreen";

export interface NoInternetConnectionPageJSXProps {}

const NoInternetConnectionPageJSX: FC<
  NoInternetConnectionPageJSXProps
> = () => {
  return (
    <MessageScreen
      icon={<svgs.NoInternetConnectionIcon />}
      heading={"No Internet Connection"}
      message={
        "Looks like there is problem connecting to server. Please once check your internet connection and try again."
      }
      button={{
        text: "Try again",
        onclick: () => {
          window.location.reload();
        },
      }}
    />
  );
};

export default NoInternetConnectionPageJSX;

import React from "react";
import { Backdrop } from "@mui/material";
import CircularBar from "../CircularBar";
import { ObjectValues } from "../../interfaces";

export interface GlobalLoaderProps {
    open:boolean,
    sx?:ObjectValues
    backdrop_sx?:ObjectValues
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  open,sx,backdrop_sx
}) => {
  return open===true ? (
<Backdrop
  sx={{ color: '#fff', zIndex: 9999999 ,...backdrop_sx}}
  open={open}
> <CircularBar
          sx={{ height: "50px !important", width: "50px !important",color:"white",...sx }}
        /></Backdrop>) : (
    <></>
  );
};

export default GlobalLoader;

import React from "react";
import GlobalLoader from "../../components/GlobalLoader";
import { onlyChildProps, ObjectValues } from "../../interfaces";
import { useSelector } from "react-redux";

const GlobalLoaderProvider: React.FC<onlyChildProps> = ({ children }) => {
  const { open, sx ,backdrop_sx} = useSelector((state: ObjectValues
    ) => state.constants.global_loader);
  return (
    <React.Fragment>
      <GlobalLoader  open={open} sx={sx??{}} backdrop_sx={backdrop_sx??{}} />
      {children}
    </React.Fragment>
  );
};

export default GlobalLoaderProvider;

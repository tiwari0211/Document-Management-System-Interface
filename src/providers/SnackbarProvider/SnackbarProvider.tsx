import React from "react";
import Snackbars from "../../components/Snackbars";
import { ObjectValues, onlyChildProps } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { hideSnack } from "../../redux/constants/constantSlice";

const SnackbarProvider: React.FC<onlyChildProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { open, message ,severity} = useSelector((state: ObjectValues) => state.constants.snackbar);

  const handleClose = () => {
    dispatch(hideSnack());
  };

  return (
    <React.Fragment>
      <Snackbars severity={severity} open={open} message={message} onClose={handleClose} />
      {children}
    </React.Fragment>
  );
};

export default SnackbarProvider;

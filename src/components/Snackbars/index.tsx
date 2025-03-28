import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import globalColors from "../../themes/globalColors";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface snackbarProps {
  open: boolean;
  message: string;
  severity?: "error" | "warning" | "info" | "success";
}
interface SnackbarsProps extends snackbarProps {
  onClose: () => void;
}

const Snackbars: React.FC<SnackbarsProps> = ({
  open,
  message,
  onClose,
  severity,
}) => {
  return open && message ? (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={severity === "success" ? 2000 : 3000}
      onClose={onClose}
      sx={{maxWidth:"100%"}}
    >
      <Alert
        onClose={onClose}
        severity={severity ?? "info"}
        sx={
          severity === "success"
            ? {
                width: "100%",
                background: globalColors.colorCombinations.new.bg,
                color: globalColors.colorCombinations.new.color,
                whiteSpace: "normal",
              }
            : { width: "100%" }
        }
      >
        {message}
      </Alert>
    </Snackbar>
  ) : (
    <></>
  );
};

export default Snackbars;

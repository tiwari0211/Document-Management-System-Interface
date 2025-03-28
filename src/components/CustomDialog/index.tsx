import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { CustomContainedButtonProps } from "../CustomContainedButton";
import { DialogActions, DialogContent } from "@mui/material";
import CustomIconButton, { CustomIconButtonProps } from "../CustomIconButton";
import { rowSB, rowCenter } from "../../themes/GlobalStyles";
import styled from "@emotion/styled";
import { subHeading } from "../CustomTexts";
import { svgs } from "../../assets";
import { ObjectValues } from "../../interfaces";
export interface action extends CustomContainedButtonProps {}
export interface actionIcon extends CustomIconButtonProps {}
export interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  content: any;
  actions: actionIcon[];
  title?: string;
  customHeader?: any;
  actionsx?: ObjectValues;
  contentsx?: ObjectValues;
  fullScreen?: boolean;
  sx?:any
}

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: "0 15px 15px",
    minHeight: "50px",
  },
  "& .MuiDialogActions-root": {
    // padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    // borderRadius: "20px",
    // maxHeight: "calc(100% - 64px)",
    // height: "calc(100% - 64px)",
    // minWidth: "calc(100% - 200px)",
    // width: "calc(100% - 200px)",
    // margin: "32px 100px",
    padding: "0px",
    display: "flex",
  },
}));
export default function CustomDialog(props: CustomDialogProps) {
  const {
    onClose,
    title,
    open,
    content,
    actions,
    customHeader,
    actionsx,
    contentsx,
    fullScreen,sx
  } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullScreen={fullScreen}
      sx={sx??{}}
    >
      {customHeader ? (
        customHeader
      ) : (
        <DialogTitle
          sx={{ m: 0, p: "20px 15px 15px", ...rowSB , boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"
          }}
          id="customized-dialog-title"
        >
          {subHeading({ text: title ?? "", size: "1.1rem", weight: "600" })}
          <CustomIconButton
            onClick={onClose}
            noHover={true}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
            content={svgs.Cross}
          />
        </DialogTitle>
      )}
      <DialogContent sx={contentsx}> {content ?? ""}</DialogContent>
      {actions && actions.length > 0 && (
        <DialogActions
          sx={{ m: 0, p: "0px 15px 20px", ...rowCenter, ...actionsx }}
        >
          {actions.map((item, i) => {
            return <CustomIconButton {...item} key={`${i}-button`} />;
          })}
        </DialogActions>
      )}
    </BootstrapDialog>
  );
}

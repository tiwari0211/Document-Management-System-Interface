import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import CircularBar from "../CircularBar";
import globalColors from "../../themes/globalColors";
export interface CustomContainedButtonProps {
  content: any;
  loading?: boolean;
  otherProps: ButtonProps;
  icon?: any;
}
const CustomContained = styled(Button)(() => ({
  backgroundColor: globalColors.primary.primary, // You can customize the background color here
  color: globalColors.primary.white, // Ensuring text is readable on the background color
  "&:hover": {
    backgroundColor: globalColors.primary.primary, // You can customize the hover background color here
  },
  textTransform: "capitalize",
  fontWeight: 500,
  fontSize: "0.875rem !important",
  borderRadius: "8px",
  lineHeight: "normal",
  padding: "12px 10px",
  // border:"1px solid"
  // '&.Mui-disabled': {
  //   backgroundColor: globalColors.primary.disableBg, // Change to your desired background color for disabled state
  //   color: globalColors.primary.disableText, // Change to your desired text color for disabled state
  // },
}));
function CustomContainedButton(props: CustomContainedButtonProps) {
  return (
    <CustomContained
      {...{ variant: "contained" }}
      {...props.otherProps}
      disabled={
        props.loading === true ? true : props.otherProps.disabled ?? undefined
      }
      sx={{ ...props.otherProps?.sx, gap: "5px" }}
    >
      {props.loading ? "" : props.icon && props.icon}
      {props.loading ? (
        <CircularBar
          sx={{ height: "17.75px !important", width: "17.75px !important" }}
        />
      ) : (
        props.content
      )}
    </CustomContained>
  );
}

export default CustomContainedButton;

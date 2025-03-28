import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import globalColors from "../../themes/globalColors";

export default function CircularBar(props: CircularProgressProps) {
  const CustomCircularProgress = styled(CircularProgress)(({}) => ({
    // backgroundColor:globalColors.primary.black ,
    color: globalColors.primary.grey,
    // '&:hover': {
    //   backgroundColor: globalColors.primary.black,
    // },
    // textTransform:"capitalize",
    // fontWeight:600,
    // fontSize:"0.9rem",
    // '&.Mui-disabled': {
    //   backgroundColor: globalColors.primary.disableBg, // Change to your desired background color for disabled state
    //   color: globalColors.primary.disableText, // Change to your desired text color for disabled state
    // },
  }));
  return (
    <Box sx={{ display: "flex" }}>
      <CustomCircularProgress {...props} />
    </Box>
  );
}

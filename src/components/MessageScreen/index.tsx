import { Box, Stack, Typography } from "@mui/material";
import { FC, useContext } from "react";
import CustomIconButton from "../CustomIconButton";
import { MobileProvider } from "../../providers/IsMobileProvider";
import { styles } from "../../themes/GlobalStyles";
import globalColors from "../../themes/globalColors";

export interface MessageScreenProps {
  icon: any;  iconsx?: any;
  heading: string;
  message: string;
  button?: {
    text: any;
    onclick(): void;
  };
}

const MessageScreen: FC<MessageScreenProps> = ({
  icon,
  heading,
  message,
  button,iconsx
}) => {
  const isMobile: boolean | null = useContext(MobileProvider);
  return (
    <Stack height={"100%"} width={"100%"} sx={styles.columnCenter}>
      <Stack
        sx={
          isMobile
            ? {
                ...styles.columnCenter,
              }
            : {
                ...styles.columnCenter,
                height: "80%",
                maxHeight: "650px",
                maxWidth: "550px",
                width: "50%",
                borderRadius: "17px",
                boxShadow:
                  "0px 3px 3px -2px #e4cd5b,0px 3px 4px 0px #e4cd5b,0px 1px 8px 0px #e4cd5b",
              }
        }
        spacing={"20px"}
      >
        <Stack
          alignItems={"center"}
          sx={{
            color: globalColors.primary.primary,
            backgroundColor: "rgba(255, 187, 51, 0.1)",
            height: "110px",
            width: "110px",
            ...styles.columnHorizontalCenter,
            p:"25px",
            borderRadius: "50%",
            ...iconsx
          }}
        >
          <Box >{icon}</Box>
        </Stack>

        <Typography
          textAlign={"center"}
        >
          {heading}
        </Typography>
        <Typography
          textAlign={"center"}
          width="85%"
          maxWidth={"600px"}
        >
          {message}
        </Typography>

       {button&& <Stack direction={"row"} width="200px">
          <CustomIconButton
            {...{
              disabled: false,
              onClick: button.onclick,
              variant: "contained",
              fullWidth: true,
            }}
            loading={false}
            content={button.text}
          />
        </Stack>}
      </Stack>
    </Stack>
  );
};

export default MessageScreen;

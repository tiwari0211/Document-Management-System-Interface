import React, { useContext, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Grid,
  Link,
  Divider,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { subHeading } from "../components/CustomTexts";
import OtpTextfeild from "../components/OtpTextfeild";
import { inputProp, ObjectValues } from "../interfaces";
import CustomTextField from "../components/CustomTextfield";
import { isPhoneNumberValid, StopScroll } from "../constants/Regex";
import CustomContainedButton from "../components/CustomContainedButton";
import { showSnack } from "../redux/constants/constantSlice";
import { useDispatch } from "react-redux";
import globalColors from "../themes/globalColors";
import CustomIconButton from "../components/CustomIconButton";
import { svgs } from "../assets";
import { MobileProvider } from "../providers/IsMobileProvider";
import { set_user } from "../redux/user/userSlice";
import { UserStatus } from "../constants/routes/approved";
import { routes } from "../constants";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [details, setDetails] = useState<ObjectValues>({});

  const isMobile: boolean | null = useContext(MobileProvider);
  const handleInputChange = (label: string, value: string | number) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [label]: value,
      [`${label}-error`]: undefined,
    }));
  };
  const validationCheck = () => {
    if (details.otpSent) {
      if (details[otpLabel]?.toString().length === 6) {
        return true;
      }
    } else {
      if (details[numLabel] && isPhoneNumberValid(details[numLabel])) {
        return true;
      }
    }
    return false;
  };

  const onVerify = async () => {
    const userData = {
      status: UserStatus.approved,
      number: details[numLabel],
    };
    localStorage.setItem(
      "file-management-user",
      window.btoa(JSON.stringify(userData))
    );
    dispatch(set_user(userData));
    dispatch(
      showSnack({
        open: true,
        message: "Login Successfully",
        severity: "success",
      })
    );
    Navigate(routes.home);
    setDetails((prve) => {
      return { ...prve, loading: false };
    });
  };
  const handleGenerateOtp = () => {
    setDetails((prve) => {
      return {
        ...prve,
        otpSent: true,
        [otpLabel]: "",
        loading: false,
      };
    });
  };
  const onSubmit = async () => {
    if (validationCheck()) {
      setDetails((prev) => {
        return { ...prev, loading: true };
      });
      if (details.otpSent) {
        onVerify();
      } else {
        handleGenerateOtp();
      }
    }
  };
  const onResend = () => {
    handleGenerateOtp();
    dispatch(
      showSnack({
        open: true,
        message: "OTP sent again Successfully",
        severity: "success",
      })
    );
  };
  function renderTextField({
    label,
    placeholder,
    value,
    error,
    helperText,
    onChange,
    endAdornment,
    startAdornment,
    multiline,
    disabled,
    dataType,
    only_number,
  }: inputProp) {
    return (
      <CustomTextField
        placeholder={placeholder}
        disabled={details.loading === true ? true : disabled ?? false}
        id={label}
        onKeyDown={(evt) => {
          if (only_number === true) {
            evt.key === "." && evt.preventDefault();
          }
          if (dataType === "number") {
            evt.key === "e" && evt.preventDefault();

            evt.key === "E" && evt.preventDefault();
            evt.key === "-" && evt.preventDefault();
            evt.keyCode === 38 && evt.preventDefault();
            evt.keyCode === 40 && evt.preventDefault();
          }
        }}
        onFocus={dataType === "number" ? StopScroll : () => {}}
        variant="outlined"
        error={error}
        type={dataType === "number" ? "number" : "text"}
        helperText={helperText}
        value={value ?? ""}
        maxRows={multiline ?? 1}
        minRows={multiline ?? 1}
        multiline={multiline ? true : false}
        onChange={onChange}
        onKeyPress={async (ev: any) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            onSubmit();
          }
        }}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": { padding: "0" },
          "& .MuiInputBase-input": multiline
            ? {
                padding: "6px 12px",
              }
            : {},
        }}
        InputProps={{
          endAdornment,
          startAdornment,
        }}
        inputProps={{
          // type: details.visible ? "" : type && "password",
          "data-testid": `${label}-input`, // Test ID for testing purposes
        }}
      />
    );
  }
  const onEdit = () => {
    setDetails((prve) => {
      return { ...prve, otpSent: false, [otpLabel]: "" };
    });
  };
  const numLabel = "Mobile Number";
  const otpLabel = "Otp";
  return (
    <Box
      sx={{
        minHeight: "calc(100% - 40px)",
        width: "calc(100% - 40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #f4f6f9, #eef1f5)",
        p: "20px",
      }}
    >
      <Container
        component="main"
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            p: 4,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
            textAlign: "center",
            width: isMobile ? "100%" : "284px",
            // flex: 8,
          }}
        >
          <CardContent>
            <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please sign in to continue
            </Typography>

            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{ mt: 3, textAlign: "start" }}
            >
              <Stack
                direction={"row"}
                sx={{ visibility: details.otpSent ? "unset" : "hidden" }}
                spacing={"5px"}
                width="100%"
              >
                {subHeading({
                  text: "OTP has been sent to",
                  size: "0.8rem",
                })}
                {subHeading({
                  text: details[numLabel],
                  weight: 600,
                  size: "0.8rem",
                })}

                <CustomIconButton
                  content={svgs.edit}
                  onClick={onEdit}
                  noHover={true}
                  disabled={details.loading}
                />
              </Stack>
              {details.otpSent ? (
                <>
                  <Stack mt="15px" width="100%" spacing={"5px"} key={otpLabel}>
                    {subHeading({ text: otpLabel, size: "0.8rem" })}
                    <OtpTextfeild
                      autoComplete="new-password"
                      disabled={details.loading}
                      otp={details[otpLabel] ?? ""}
                      setOtp={(value: any) => {
                        handleInputChange(otpLabel, value);
                      }}
                      onKeyDown={(ev: any) => {
                        if (ev.key === "Enter") {
                          ev.preventDefault();
                          onSubmit();
                        }
                      }}
                    />
                  </Stack>
                </>
              ) : (
                // <form key={"number"} style={{ width: "100%" }}>
                <Stack width="100%" key={"number"} spacing={"5px"}>
                  {subHeading({ text: "Phone Number", size: "0.8rem" })}
                  {renderTextField({
                    label: numLabel,
                    placeholder: "Enter mobile number",
                    value: details[numLabel] ?? "",
                    error: details[`${numLabel}-error`] ?? false,
                    helperText: details[`${numLabel}-error`] ?? " c",
                    onChange: (e: any) =>
                      handleInputChange(numLabel, e.target.value),
                    only_number: true,
                    dataType: "number",
                    startAdornment: <Box p="0 0 0 10px">{"+91"}</Box>,
                  })}
                </Stack>
                // </form>
              )}{" "}
              <Stack
                direction={"row-reverse"}
                mt="10px"
                width="100%"
                sx={{ visibility: details.otpSent ? "unset" : "hidden" }}
              >
                {/* {minutes === 0 && seconds === 0 ? ( */}
                <CustomIconButton
                  disabled={
                    //  !(minutes === 0 && seconds === 0) ? true :
                    details.loading
                  }
                  content={"Resend Code"}
                  noHover={true}
                  onClick={onResend}
                  sx={{
                    fontWeight: 500,
                    color: globalColors.primary.primary,
                    fontSize: "0.8rem",
                  }}
                />
              </Stack>
              <CustomContainedButton
                otherProps={{
                  disabled: !validationCheck(),
                  onClick: onSubmit,
                  fullWidth: true,
                  sx: {
                    mt: 3,
                  },
                }}
                loading={details.loading}
                content={details.otpSent ? "Login" : "Generate OTP"}
              />
              {/* <Divider sx={{ my: 3 }} /> */}
              {/* <Grid container justifyContent="space-between">
                <Grid>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid>
                  <Link href="#" variant="body2">
                    {"Create an account"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SignIn;

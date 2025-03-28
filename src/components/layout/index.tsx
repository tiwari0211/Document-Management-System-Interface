import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { onlyChildProps } from "../../interfaces";
import ConfirmationDialog from "../ConfirmationDialog";
import { useState } from "react";
import { Search, CloudUpload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { showSnack } from "../../redux/constants/constantSlice";
import { AppName, SidebarContent, Version } from "../../constants";
import globalColors from "../../themes/globalColors";
import { styles } from "../../themes/GlobalStyles";
import {
  DashboardLayout,
  DashboardLayoutSlots,
} from "@toolpad/core/DashboardLayout";
import CustomPopover from "../CustomPopover";
import CustemListItem from "../CustemListItem";
import { svgs } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { subHeading } from "../CustomTexts";
import CustomIconButton from "../CustomIconButton";
import { SignOutFunction } from "../../redux/user/thunks/fetchAllUsers";
function Layout({ children }: onlyChildProps) {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const user: any = useSelector((state: any) => state.user.user);
  const confirmation = {
    header: "Logout Confirmation",
    content:
      "Are you sure you want to sign out? This action will delete all cache data.",
    confirmButton: "Logout",
    cancelButton: "No",
  };
  const location = useLocation();
  const Navigate = useNavigate();
  // const dashboardLayoutProps: DashboardLayoutSlots = {
  //   toolbarActions: () => {
  //     return (
  //       <CustomPopover
  //         icon={<Avatar alt="User" src={user?.photoURL ?? ""}></Avatar>}
  //         content={
  //           <List sx={{ m: "0", p: "0", width: "fit-content" }}>
  //             <CustemListItem
  //               key={`${user?.number ?? ""}`}
  //               keyId={`${user?.number ?? ""}`}
  //               isSelected={false}
  //               // onClick={onClick}
  //               primary={user?.number ?? ""}
  //               // icon={icon}
  //               listItemTextsx={{ fontSize: "0.6rem" }}
  //               sx={{
  //                 mb: "0",
  //                 "&:hover": {
  //                   background: globalColors.primary.bgLight, // Change the background color on hover
  //                   borderRadius: "7px", // Change the text color on hover
  //                 },
  //               }}
  //             />{" "}
  //             <CustemListItem
  //               key={`Sign Out`}
  //               keyId={`Sign Out`}
  //               isSelected={false}
  //               onClick={() => setOpenDialog(true)}
  //               primary={"Sign Out"}
  //               icon={svgs.Signout}
  //               listItemTextsx={{ fontSize: "0.6rem" }}
  //               sx={{
  //                 mb: "0",
  //                 "&:hover": {
  //                   background: globalColors.primary.bgLight, // Change the background color on hover
  //                   borderRadius: "7px", // Change the text color on hover
  //                 },
  //               }}
  //             />
  //           </List>
  //         }
  //       />
  //     );
  //   },
  //   sidebarFooter: () => {
  //     return (
  //       <Box
  //         sx={{
  //           width: "calc(100% - 6px)",
  //           ...styles.rowCenter,
  //           m: "3px",
  //           color: globalColors.primary.grey,
  //         }}
  //       >
  //         v{Version}
  //       </Box>
  //     );
  //   },
  //   // toolbarAccount: () => {
  //   //   return <Box>{user?.number ?? ""}</Box>;
  //   // },
  // };
  return (
    <Stack
      height="100%"
      width="100%"
      display={"flex"}
      sx={{ bgcolor: "#f4f6f8" }}
    >
      <ConfirmationDialog
        title={confirmation.header}
        content={<Box pt="16px">{confirmation.content}</Box>}
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        yesButtonText={confirmation.confirmButton}
        noButtonText={confirmation.cancelButton}
        onSubmit={() => {
          SignOutFunction();
          dispatch(
            showSnack({
              open: true,
              message: "You have successfully logged out",
              severity: "success",
            })
          );
          setOpenDialog(false);
        }}
      />
      {/* {user && user.status === UserStatus.approved ? (
        <DashboardLayout
          slots={dashboardLayoutProps}
          hideNavigation={Boolean(
            SidebarContent.list(user.modules).length === 1
          )}
          // defaultSidebarCollapsed={Boolean(SidebarContent.list(user.modules).length===1)}
          navigation={
            SidebarContent.list(user.modules).length === 1
              ? []
              : SidebarContent.list(user.modules)
          }
          branding={{
            logo: "",
            title: AppName,
          }}
        >
          {children}
        </DashboardLayout>
    ) : (
        children
      )} */}
      {user && (
        <Drawer
          variant="permanent"
          sx={{
            width: "80px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "80px",
              boxSizing: "border-box",
              bgcolor: globalColors.primary.primary,
              color: "white",
              display: "flex",
              alignItems: "center",
              py: 2,
            },
          }}
        >
          <List sx={{ flex: 8, width: "100%" }}>
            {(SidebarContent.list(user.modules).length === 1
              ? []
              : SidebarContent.list(user.modules)
            ).map(
              (
                item: {
                  slug: string;
                  title: any;
                  icon: any;
                },
                index: any
              ) => (
                <Tooltip title={item.title} placement="right" key={index}>
                  <ListItem
                    onClick={() => {
                      Navigate(item.slug);
                    }}
                    // button
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      p: "8px",
                      m: "8px",
                      width: "calc(100% - 16px)",
                      borderRadius: "8px",
                      bgcolor:
                        item.slug === location.pathname
                          ? globalColors.primary.white
                          : "",
                      cursor: item.slug === location.pathname ? "" : "pointer",

                      color:
                        item.slug === location.pathname
                          ? globalColors.primary.primary
                          : globalColors.primary.white,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "auto",
                        color:
                          item.slug === location.pathname
                            ? globalColors.primary.primary
                            : globalColors.primary.white,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {item.title}
                  </ListItem>
                </Tooltip>
              )
            )}
          </List>{" "}
          <Stack
            spacing="2px"
            direction={"column"}
            sx={styles.columnVerticalCenter}
          >
            <List
              sx={{
                m: "0",
                p: "0",
                width: "100%",
                ...styles.columnVerticalCenter,
              }}
            >
              {/* <CustemListItem
          key={`Hello`}
          keyId={`Hello`}
          listItemIconsx={{margin:"0 0 0 2px !important"}}
          action={undefined}
          {...{
            primary: user.full_name
              ? `${user.full_name} `
              : user.number ?? "User",
            secondary: "",
          }}
          listItemTextsx={{whiteSpace:"normal",textAlign:"center"}}
          sx={!open ? {
            direction:"column","& .MuiListItem-root": {direction:"column",}} : {}}
          /> */}
              {
                <CustomIconButton
                  sx={{ padding: "5px", maxWidth: "33px", color: "#636b74" }}
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                  content={svgs.Signout}
                />
              }
            </List>
            <Stack
              spacing="2px"
              direction={"column"}
              sx={styles.columnVerticalCenter}
            >
              <Box
                sx={{
                  ...styles.rowCenter,
                  flex: 8,
                  flexDirection: "column",
                  gap: "3px",
                  p: "0 9.5px",
                }}
              >
                {subHeading({
                  text: `Version`,
                  size: "0.7rem",
                  weight: 500,
                  sx: {
                    textAlign: "center",
                    whiteSpace: "normal",
                    lineHeight: "0.9rem",
                    color: globalColors.primary.darkGrey,
                  },
                })}
                {subHeading({
                  text: `${Version}`,
                  size: "0.7rem",
                  weight: 600,
                  sx: {
                    textAlign: "center",
                    whiteSpace: "normal",
                    lineHeight: "0.9rem",
                    color: globalColors.primary.darkGrey,
                  },
                })}
              </Box>
            </Stack>
          </Stack>
        </Drawer>
      )}
      <Box
        sx={{
          width: "calc(100% - 80px)",
          ml: "80px",
          height:"100%",
        }}
      >
        {user && (
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ width: "calc(100% - 40px)",p:'10px 20px',textAlign:"center" }}
          >
            {AppName}
          </Typography>
        )}

        {/* Topbar */}
        {/* <AppBar
          position="static"
          color="transparent"
          elevation={1}
          sx={{ mb: 3, borderRadius: 1, bgcolor: "white", p: 2, width: "100%" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flexGrow: 1, position: "relative", maxWidth: 400 }}>
              <InputBase
                placeholder="Search files..."
                sx={{
                  pl: 2,
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  p: 1,
                  width: "100%",
                }}
                startAdornment={
                  <Search
                    sx={{
                      color: "gray",
                      mr: 1,
                      position: "absolute",
                      left: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                }
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
            >
              Upload File
            </Button>
          </Toolbar>
        </AppBar> */}
        <Stack sx={{ height: "calc(100% - 61.98px)", width: "100%" }}>
          {children}
        </Stack>
      </Box>
    </Stack>
  );
}

export default Layout;

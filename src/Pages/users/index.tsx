import { Box, Stack } from "@mui/system";
import MessageScreen from "../../components/MessageScreen";

import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp";
import { useContext, useEffect, useState } from "react";
import CustomIconButton from "../../components/CustomIconButton";
import CustomDialog from "../../components/CustomDialog";
import { MobileProvider } from "../../providers/IsMobileProvider";
import FormComponent from "../../components/FormComponent";
import { ObjectValues } from "../../interfaces";
import { styles } from "../../themes/GlobalStyles";
import Userslist from "./userslist";
import { UserStatus } from "../../constants/routes/approved";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/user/thunks/createUser";
import { showSnack } from "../../redux/constants/constantSlice";
import { fetchAllUsers } from "../../redux/user/thunks/fetchAllUsers";
import { User } from "../../redux/user/userSlice";
function Users() {
  const dispatch = useDispatch();
  const userStatus = [
    { label: "Pending", id: UserStatus.pending },
    { label: "Approved", id: UserStatus.approved },
    { label: "Rejected", id: UserStatus.rejected },
  ];
  const all_modules = useSelector((state: unknown) => state.user.all_modules);
  const isMobile: boolean | null = useContext(MobileProvider);
  const [details, setDetails] = useState<{ open: boolean; row?: User }>({
    open: false,
  });
  const users = useSelector((state: any) => state.user.all_users);
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const handleClose = () => {
    setDetails({ open: false });
  };

  return (
    <Stack height="100%" width="100%">
      {details.open && (
        <CustomDialog
          open={true}
          title={details.row ? "Update User" : "Create User"}
          sx={{
            "& .MuiDialog-paper": isMobile
              ? {}
              : {
                  borderRadius: "20px",
                  maxHeight: "calc(100% - 64px)",
                  height: "calc(100% - 64px)",
                  minWidth: "50%",
                  width: "calc(100% - 200px)",
                  margin: "32px 100px",
                  padding: "0px",
                  display: "flex",
                },
          }}
          fullScreen={isMobile ? true : false}
          onClose={handleClose}
          content={
            <FormComponent
              inlineCount={1}
              updateOnList={{}}
              {...{
                successMessage: () => {
                  return "Trip added";
                },
                formatPayload: (data: ObjectValues) => {
                  const newObj: ObjectValues = details.row
                    ? {
                        ...data,
                        modules: data.modules.map((s: { id: any }) => s.id),
                      }
                    : {
                        ...data,
                        modules: data.modules.map((s: { id: any }) => s.id),
                      };
                  return newObj;
                },
                extraFields: [],
                inputFormArray: [
                  {
                    label: "Name",
                    placeholder: "Enter",
                    value: undefined,
                    dataType: "text",
                    error: false,
                    autoFocus: true,
                    helperText: " ",
                    defaultValue: { value: details.row?.full_name ?? "" },
                    fieldType: "text",
                    api: "full_name",
                  },
                  {
                    label: "Phone Number",
                    placeholder: "Enter",
                    value: undefined,
                    dataType: "number",
                    disabled: details.row ? true : false,
                    helperText: " ",
                    error: false,
                    defaultValue: { value: details.row?.number ?? "" },
                    fieldType: "text",
                    api: "number",
                    only_number: true,
                  },
                  // {
                  //   label: "Password",
                  //   placeholder: "Enter Password",
                  //   value: undefined,
                  //   defaultValue: { value: "abc123" },
                  //   dataType: "text",
                  //   error: false,
                  //   helperText: " ",
                  //   fieldType: "text",
                  //   disabled: true,
                  // },
                  {
                    label: "Modules",
                    placeholder: "Select the modu",
                    value: undefined,
                    error: false,
                    // disabled: details.row ? false : true,
                    list: all_modules,
                    defaultValue: {
                      value: details.row?.modules
                        ? all_modules.filter((s: { id: string }) =>
                            details.row?.modules.includes(s.id)
                          )
                        : [],
                    },
                    listLabel: "label",
                    helperText: " ",
                    showhelperText: true,
                    fieldType: "autocomplete",
                    api: "modules",
                    multiple: true,
                  },
                  {
                    label: "User Status",
                    placeholder: "Select the Status",
                    value: undefined,
                    error: false,
                    disabled: details.row ? false : true,
                    list: userStatus,
                    defaultValue: {
                      value: details.row?.status
                        ? userStatus.find(
                            (s: { id: string }) => details.row?.status === s.id
                          )?.label
                        : "Approved",
                      id: details.row?.status ?? "approved",
                    },
                    listLabel: "label",
                    helperText: " ",
                    showhelperText: true,
                    fieldType: "autocomplete",
                    api: "status",
                  },
                ],
                header: "wfdw",
                editData: {},
                api: {
                  method: "add",
                  collection_name: "",
                  customFunction: (data) => createUser([...users, data]),
                },
                onSubmit: details.row
                  ? () => {
                      dispatch(
                        showSnack({
                          message: "User updated",
                          severity: "success",
                          open: true,
                        })
                      );
                      handleClose();
                      return "";
                    }
                  : () => {
                      dispatch(
                        showSnack({
                          message: "User created",
                          severity: "success",
                          open: true,
                        })
                      );
                      handleClose();
                      return "";
                    },

                onClear: () => {},
              }}
            />
          }
          actions={[]}
        />
      )}
      {users && users.length > 0 ? (
        <Stack height="100%" width="100%">
          <Box
            sx={{
              width: "calc(100% - 24px)",
              ...styles.rowHorizontalEnd,
              m: "12px",
            }}
          >
            <CustomIconButton
              content={"Add User"}
              variant="contained"
              onClick={() => {
                setDetails({ open: true });
              }}
            />
          </Box>
          <Box sx={{ width: "100%", flex: 8 }}>
            <Userslist
              list={users}
              onUpdate={(row: User) => {
                setDetails({ open: true, row: row });
              }}
            />
          </Box>
        </Stack>
      ) : (
        <MessageScreen
          icon={
            <FlightTakeoffSharpIcon
              fontSize="large"
              sx={{ "& .MuiSvgIcon-root": { width: "60px !important" } }}
            />
          }
          heading={"No User yet!."}
          message={"Looks like no uesr. Start adding new Users."}
          button={{
            text: "Add User",
            onclick: () => {
              setDetails({ open: true });
            },
          }}
        />
      )}
    </Stack>
  );
}

export default Users;

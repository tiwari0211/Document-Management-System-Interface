import { set_all_users, set_user } from "../../userSlice";
import { setLoader } from "../../../constants/constantSlice";
import { store } from "../../../store";
import { UserStatus } from "../../../../constants/routes/notApproved";

export const fetchAllUsers = async () => {
  store.dispatch(
    setLoader({
      open: true,
    })
  );
  store.dispatch(
    set_all_users([
      {
        number: "8871583988",
        status: UserStatus.approved,
        modules: ["home", "users", "files"],
        full_name:"Shashwat tiwari"
      },
    ])
  );
  store.dispatch(
    setLoader({
      open: false,
    })
  );
};
export const reloadUser = async () => {
  const user = await localStorage.getItem("file-management-user");
  if (user) {
    await store.dispatch(set_user(JSON.parse(window.atob(user))));
    return user;
  } else {
    return null;
  }
};
export const SignOutFunction = async () => {
  localStorage.removeItem("file-management-user");
  store.dispatch(set_user(null));
};

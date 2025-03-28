import { FC } from "react";
import NoAccessPageJSX from "./NoAccessPageJSX";
import { ObjectValues } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { showSnack } from "../../redux/constants/constantSlice";
const NoAccessPage: FC = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: ObjectValues) => state.user.user);
  const handleGoBack = () => {
    // navigate(-1);
    // SignOutFunction(userSlice);
    dispatch(
      showSnack({
        open: true,
        message: "You have successfully logged out",
        severity: "success",
      })
    );
  };

  return <NoAccessPageJSX handleGoBack={handleGoBack} />;
};

export default NoAccessPage;

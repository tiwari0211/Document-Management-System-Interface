import { setLoader } from "../../constants/constantSlice";
import { store } from "../../store";
import { set_all_users } from "../userSlice";

// Function to create a new trip
export const createUser = async (param: unknown) => {
  try {
    store.dispatch(setLoader({ open: true }));
    store.dispatch(set_all_users(param));
    store.dispatch(setLoader({ open: false }));
  } catch (error) {
    console.error("Error creating trip:", error);
    store.dispatch(setLoader({ open: false }));
  }
};

// Function to update an existing trip
// export const updateUser = async (userId: string, updatedData: Partial<any>) => {
//   try {
//     store.dispatch(setLoader({ open: true }));

//     store.dispatch(setLoader({ open: false }));
//   } catch (error) {
//     console.error("Error updating trip:", error);
//     store.dispatch(setLoader({ open: false }));
//   }
// };

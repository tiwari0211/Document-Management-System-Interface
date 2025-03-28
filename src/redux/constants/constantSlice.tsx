import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GlobalLoaderProps } from "../../components/GlobalLoader";
import { snackbarProps } from "../../components/Snackbars";
import { allRouteModules, SidebarContent } from "../../constants";
import { ObjectValues } from "../../interfaces";

export interface moduleListProps {
  title: string;
  icon: any;
  slug: string;
}
export type constantsRecord = {
  version: string;
  snackbar: snackbarProps;
  selectedModule: moduleListProps;
  drawerOpen: boolean;
  global_loader: GlobalLoaderProps;
  innerModule: ObjectValues | null;
  height: number;
  paginations: ObjectValues;
};
const defaultSnackbar: snackbarProps = {
  open: false,
  message: "",
  severity: "info",
};
export const getInitialRoute = () => {
  const currentPath = window.location.pathname;
  const tofilterWIth =
    currentPath.indexOf("/", currentPath.indexOf("/") + 1) === -1
      ? currentPath
      : currentPath
          .toString()
          .slice(0, currentPath.indexOf("/", currentPath.indexOf("/") + 1));
  const hasPathContainingSubstring = () => {
    return allRouteModules.find((obj: any) => obj.path === tofilterWIth);
  };
  return hasPathContainingSubstring() ?? SidebarContent.list[1];
};
export const initialModule: any = getInitialRoute();
const initialConstantsRecord: constantsRecord = {
  version: "2.0.3",
  snackbar: defaultSnackbar,
  global_loader: { open: false },
  innerModule: null,
  selectedModule: initialModule,
  drawerOpen: false,
  height: window.visualViewport?.height ?? window.innerHeight,
  paginations: {},
};
const constantSlice = createSlice({
  name: "constantSlice",
  initialState: initialConstantsRecord,
  reducers: {
    showSnack: (state, action: PayloadAction<snackbarProps>) => {
      state.snackbar = action.payload;
    },
    hideSnack: (state) => {
      state.snackbar = defaultSnackbar;
    },
    setSelectedModule: (state, action: PayloadAction<any>) => {
      state.selectedModule = action.payload;
      state.innerModule = null;
    },
    setInnerModule: (state, action: PayloadAction<any>) => {
      state.innerModule = action.payload;
    },
    setPaginations: (state, action: PayloadAction<any>) => {
      state.paginations = action.payload;
    },

    setLoader: (state, action: PayloadAction<GlobalLoaderProps>) => {
      state.global_loader = action.payload;
    },
    setDrawer: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
  },
  extraReducers() {},
});

export const {
  showSnack,
  hideSnack,
  setDrawer,
  setHeight,
  setSelectedModule,
  setInnerModule,
  setLoader,
  setPaginations,
} = constantSlice.actions;
export default constantSlice.reducer;

import { svgs } from "../assets";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { moduleListProps } from "../redux/constants/constantSlice";import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
export const mode: "production" | "development" = "development";
export const AppName: string = "File Management";
export const Version: string = "1.0.0";
export const routes = {
  initial: "/",
  login: "/login",
  home: "/home",
  files: "/files",
  users: "/users",
};
export const SidebarContent: any = {
  list: (modules: string[]) => {
    const sidebars = [
      {
        title: "Home",
        icon: svgs.home,
        slug: routes.home,
        segment: "home",
      },
      {
        title: "Files",
        icon: <DriveFileMoveIcon />,
        slug: routes.files,
        segment: "files",
      },
      {
        title: "Users",
        icon: <PeopleAltIcon />,
        slug: routes.users,
        segment: "users",
      },
    ];

    return sidebars
      .filter((s: { segment: any }) =>
        modules && modules.length > 0 ? modules.includes(s.segment) : true
      )
      .flatMap((item, index) =>
        index > 0
          ? //  && index < arr.length - 1
            [{ kind: "divider" }, item]
          : [item]
      );
  },
};
export const allRouteModules: moduleListProps[] = [
  ...SidebarContent.list(["users", "home", "files"]).filter(
    (s: { kind: any }) => !s.kind
  ),
].filter((obj: any) => obj.title);

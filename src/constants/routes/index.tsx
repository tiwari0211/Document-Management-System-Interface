import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import SnackbarProvider from "../../providers/SnackbarProvider/SnackbarProvider";
import GlobalLoaderProvider from "../../providers/GlobalLoaderProvider";
import IsMobileProvider from "../../providers/IsMobileProvider";
import Layout from "../../components/layout";
import { routes } from "..";
import IsNotLogged from "./IsNotLogged";
import IsLogged from "./isLogged";
import ErrorBoundary from "../../providers/ErrorBoundary";
import { ErrorPages } from "../../providers/ErrorPages";
import NoInternetConnectionPage from "../../components/noInternetConnectionPage/NoInternetConnectionPage";
import PageNotFoundPage from "../../components/pageNotFoundPage/PageNotFoundPage";
import NoAccessPage from "../../components/NoAccess/NoAccessPage";
import NotApproved from "./notApproved";
import SomethingWentWrongPage from "../../components/somethingWentWrongPage/SomethingWentWrongPage";
import Approved from "./approved";
import SignIn from "../../Pages/SignIn";
import FilesManagement from "../../Pages/FilesManagement";
import Home from "../../Pages/Home";
import Users from "../../Pages/users";

const router = createBrowserRouter([
  {
    element: (
      <SnackbarProvider>
        <GlobalLoaderProvider>
          <IsMobileProvider>
            <Layout>
              <Outlet />
            </Layout>
          </IsMobileProvider>
        </GlobalLoaderProvider>
      </SnackbarProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: routes.initial, element: <Navigate to={routes.home} /> },
      {
        path: ErrorPages.NO_INTERNET_CONNECTION_URL,
        element: <NoInternetConnectionPage />,
      },
      {
        path: ErrorPages.SOMETHING_WENT_WRONG_URL,
        element: <SomethingWentWrongPage />,
      },
      {
        path: ErrorPages.PAGE_NOT_FOUND_ERROR_URL,
        element: <PageNotFoundPage />,
      },
      {
        path: ErrorPages.no_access,
        element: (
          <NotApproved>
            <NoAccessPage />
          </NotApproved>
        ),
      },
      //  public routes
      {
        element: (
          <IsNotLogged>
            <Outlet />
          </IsNotLogged>
        ),
        children: [
          {
            path: routes.login,
            element: <SignIn />,
          },
        ],
      },

      // unknown sources
      {
        path: "*",
        element: <PageNotFoundPage />,
      },
      // protected routes
      {
        element: (
          <IsLogged>
            <Approved>
              <Outlet />
            </Approved>
          </IsLogged>
        ),
        children: [
          {
            path: routes.home,
            element: (
              <Home />
              // <Home/>
            ),
            children: [],
          },
          {
            path: routes.files,
            element: <FilesManagement />,
            children: [],
          },
          {
            path: routes.users,
            element: <Users />,
            children: [],
          },
        ],
      },
    ],
  },
]);

export default router;

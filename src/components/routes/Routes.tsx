import { createBrowserRouter, Navigate } from "react-router-dom";
import { ChooseLanguage } from "../pages/chooseLanguage/ChooseLanguage";
import CodeConfirm from "../pages/codeConfirm/CodeConfirm";
import Info from "../pages/info/Info";
import { Policy } from "../pages/legalInfo/Policy";
import { Terms } from "../pages/legalInfo/Terms";
import NotFound from "../pages/notFound/NotFound";
import Signup from "../pages/signup/Signup";
import localStorageHandler from "../utils/local-storage-hendler";
import {
  edit_route_group,
  payment_route_group,
  profile_setting_route_group,
  view_content_route_group,
} from "./privateRoutes";

interface IRout {
  path: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  return localStorageHandler.isUserExist() ? children : <Navigate to={"../"} />;
};

const getPrivateRoute = (routeArr: IRout[]): IRout[] => {
  const privateRoutes = routeArr.map((item) => {
    return {
      path: item.path,
      element: <RequireAuth>{item.element}</RequireAuth>,
      errorElement: <Info />,
    };
  });
  return privateRoutes;
};

const signup_route_group = [
  {
    path: "/confirm",
    element: <CodeConfirm />,
    errorElement: <Info />,
  },
  {
    path: "/",
    element: <Signup />,
    errorElement: <Info />,
  },
  {
    path: "/lang",
    element: <ChooseLanguage />,
    errorElement: <Info />,
  },
];

const policy_route_group = [
  {
    path: "/policy",
    element: <Policy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
];

const service_route_group = [
  {
    path: "/info/:message",
    element: <Info />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter([
  ...getPrivateRoute(profile_setting_route_group),
  ...getPrivateRoute(view_content_route_group),
  ...signup_route_group,
  ...service_route_group,
  ...getPrivateRoute(edit_route_group),
  ...getPrivateRoute(payment_route_group),
  ...policy_route_group,
]);

export default router;

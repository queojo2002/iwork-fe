import { Navigate } from "react-router-dom";

import { initialUrl } from "@crema/constants/AppConst";
import Error403 from "../../../modules/errorPages/Error403";
import { accountPagesConfigs } from "./AccountRoutes";
import { authRouteConfig } from "./AuthRoutes";
import { errorPagesConfigs } from "./ErrorPagesRoutes";
import { samplePagesConfigs } from "./SamplePages.tsx";

const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [...samplePagesConfigs, ...accountPagesConfigs]
};

const publicStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig
};
const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: "/",
      element: <Navigate to={initialUrl} />
    },
    {
      path: "*",
      element: <Navigate to="/error-pages/error-404" />
    }
  ])
};

export { anonymousStructure, authorizedStructure, publicStructure };

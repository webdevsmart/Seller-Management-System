import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const StorageList = EgretLoadable({
  loader: () => import("./StorageList")
});

const storageRoutes = [
  {
    path: "/storage/list",
    exact: true,
    component: StorageList,
    auth: authRoles.admin
  },
];

export default storageRoutes;

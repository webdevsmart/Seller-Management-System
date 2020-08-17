import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const MiscList = EgretLoadable({
  loader: () => import("./MiscList")
});

const miscRoutes = [
  {
    path: "/misc/list",
    exact: true,
    component: MiscList,
    auth: authRoles.admin
  },
];

export default miscRoutes;

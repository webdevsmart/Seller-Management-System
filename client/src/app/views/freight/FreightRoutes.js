import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const FreightList = EgretLoadable({
  loader: () => import("./FreightList")
});

const freightRoutes = [
  {
    path: "/freight/list",
    exact: true,
    component: FreightList,
    auth: authRoles.admin
  },
];

export default freightRoutes;

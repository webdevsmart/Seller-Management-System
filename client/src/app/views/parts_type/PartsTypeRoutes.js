import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const PartsTypeList = EgretLoadable({
  loader: () => import("./PartsTypeList")
});

const partsTypeRoutes = [
  {
    path: "/parts-type/list",
    exact: true,
    component: PartsTypeList,
    auth: authRoles.admin
  },
];

export default partsTypeRoutes;

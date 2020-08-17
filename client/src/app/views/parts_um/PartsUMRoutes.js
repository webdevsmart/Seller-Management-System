import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const PartsUMList = EgretLoadable({
  loader: () => import("./PartsUMList")
});

const partsUMRoutes = [
  {
    path: "/parts-um/list",
    exact: true,
    component: PartsUMList,
    auth: authRoles.admin
  },
];

export default partsUMRoutes;

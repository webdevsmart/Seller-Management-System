import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const PartsList = EgretLoadable({
  loader: () => import("./PartsList")
});

const partsRoutes = [
  {
    path: "/parts/list",
    exact: true,
    component: PartsList,
    auth: authRoles.admin
  },
];

export default partsRoutes;

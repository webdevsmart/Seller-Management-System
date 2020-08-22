import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const LocationTypeList = EgretLoadable({
  loader: () => import("./LocationTypeList")
});

const warehouseLocationTypeRoutes = [
  {
    path: "/warehouse-location-type/list",
    exact: true,
    component: LocationTypeList,
    auth: authRoles.admin
  },
];

export default warehouseLocationTypeRoutes;

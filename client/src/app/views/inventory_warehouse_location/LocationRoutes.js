import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const LocationList = EgretLoadable({
  loader: () => import("./LocationList")
});

const inventoryWarehouseLocationRoutes = [
  {
    path: "/inventory-warehouse-location/list",
    exact: true,
    component: LocationList,
    auth: authRoles.admin
  },
];

export default inventoryWarehouseLocationRoutes;

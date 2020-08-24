import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const InventoryForecastList = EgretLoadable({
  loader: () => import("./InventoryForecastList")
});

const inventoryForecastRoutes = [
  {
    path: "/inventory-forecast/index",
    exact: true,
    component: InventoryForecastList,
    auth: authRoles.admin
  },
];

export default inventoryForecastRoutes;

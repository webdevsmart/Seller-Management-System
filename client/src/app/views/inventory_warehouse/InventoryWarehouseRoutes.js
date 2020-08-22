import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const AddInventory = EgretLoadable({
  loader: () => import("./AddInventory")
});

const inventoryWarehouseRoutes = [
  {
    path: "/inventory-warehouse/add",
    exact: true,
    component: AddInventory,
    auth: authRoles.admin
  },
];

export default inventoryWarehouseRoutes;

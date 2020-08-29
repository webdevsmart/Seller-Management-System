import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const InventoryFactory = EgretLoadable({
  loader: () => import("./InventoryFactory")
});

const inventoryFactoryRoutes = [
  {
    path: "/inventory-factory/add",
    exact: true,
    component: InventoryFactory,
    auth: authRoles.admin
  },
];

export default inventoryFactoryRoutes;

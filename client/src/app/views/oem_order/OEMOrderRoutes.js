import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const ManageOEMOrder = EgretLoadable({
  loader: () => import("./ManageOEMOrder")
});

const ViewOrder = EgretLoadable({
  loader: () => import("./ViewOrder")
});

const oemOrderRoutes = [
  {
    path: "/oem-order/index",
    exact: true,
    component: ManageOEMOrder,
    auth: authRoles.admin
  },
  {
    path: "/oem-order/view/:id",
    exact: true,
    component: ViewOrder,
    auth: authRoles.admin
  },
];

export default oemOrderRoutes;

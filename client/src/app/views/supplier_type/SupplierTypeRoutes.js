import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const SupplierTypeList = EgretLoadable({
  loader: () => import("./SupplierTypeList")
});

const supplierTypeRoutes = [
  {
    path: "/supplier-type/list",
    exact: true,
    component: SupplierTypeList,
    auth: authRoles.admin
  },
];

export default supplierTypeRoutes;

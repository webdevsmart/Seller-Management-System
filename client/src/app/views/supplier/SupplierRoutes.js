import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const SupplierList = EgretLoadable({
  loader: () => import("./SupplierList")
});

const AddNewSupplier = EgretLoadable({
  loader: () => import("./AddNewSupplier")
});

const EditSupplier = EgretLoadable({
  loader: () => import("./EditSupplier")
});

const supplierRoutes = [
  {
    path: "/supplier/list",
    exact: true,
    component: SupplierList,
    auth: authRoles.admin
  },
  {
    path: "/supplier/add-new",
    component: AddNewSupplier,
    auth: authRoles.admin
  },
  {
    path: "/supplier/edit/:id",
    exact: true,
    component: EditSupplier,
    auth: authRoles.admin
  },
];

export default supplierRoutes;

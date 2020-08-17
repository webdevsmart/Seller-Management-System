import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const ProductCostList = EgretLoadable({
  loader: () => import("./ProductCostList")
});

const productCostRoutes = [
  {
    path: "/product-cost/list",
    exact: true,
    component: ProductCostList,
    auth: authRoles.admin
  },
];

export default productCostRoutes;

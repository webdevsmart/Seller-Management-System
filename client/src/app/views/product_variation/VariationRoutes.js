import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const ProductVariationList = EgretLoadable({
  loader: () => import("./VariationList")
});

const productVariationRoutes = [
  {
    path: "/product-variation/list",
    exact: true,
    component: ProductVariationList,
    auth: authRoles.admin
  },
];

export default productVariationRoutes;

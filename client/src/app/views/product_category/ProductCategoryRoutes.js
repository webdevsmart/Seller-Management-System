import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const ProductCategoryList = EgretLoadable({
  loader: () => import("./ProductCategoryList")
});

const productCategoryRoutes = [
  {
    path: "/product-category/list",
    exact: true,
    component: ProductCategoryList,
    auth: authRoles.admin
  },
];

export default productCategoryRoutes;

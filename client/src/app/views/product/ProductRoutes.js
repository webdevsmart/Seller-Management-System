import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const ProductList = EgretLoadable({
  loader: () => import("./ProductList")
});

const AddNewProduct = EgretLoadable({
  loader: () => import("./AddNewProduct")
});

const EditProduct = EgretLoadable({
  loader: () => import("./EditProduct")
});


const productRoutes = [
  {
    path: "/product/list",
    exact: true,
    component: ProductList,
    auth: authRoles.admin
  },
  {
    path: "/product/add-new",
    component: AddNewProduct,
    auth: authRoles.admin
  },
  {
    path: "/product/edit/:id",
    exact: true,
    component: EditProduct,
    auth: authRoles.admin
  },
];

export default productRoutes;

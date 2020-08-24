import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const SalesOutletList = EgretLoadable({
  loader: () => import("./SalesOutletList")
});

const salesOutletRoutes = [
  {
    path: "/sales-outlet/list",
    exact: true,
    component: SalesOutletList,
    auth: authRoles.admin
  },
];

export default salesOutletRoutes;

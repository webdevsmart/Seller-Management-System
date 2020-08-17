import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const FullfillmentList = EgretLoadable({
  loader: () => import("./FullfillmentList")
});

const fullfillmentRoutes = [
  {
    path: "/fullfillment/list",
    exact: true,
    component: FullfillmentList,
    auth: authRoles.admin
  },
];

export default fullfillmentRoutes;

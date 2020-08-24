import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const SalesOutletReport = EgretLoadable({
  loader: () => import("./SalesOutletReport")
});

const salesOutletReportRoutes = [
  {
    path: "/sales-outlet-report/index",
    exact: true,
    component: SalesOutletReport,
    auth: authRoles.admin
  },
];

export default salesOutletReportRoutes;

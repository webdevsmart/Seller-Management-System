import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const SalesReportSummary = EgretLoadable({
  loader: () => import("./SalesReportSummary")
});

const salesReportSummaryRoutes = [
  {
    path: "/sales-report-summary/index",
    exact: true,
    component: SalesReportSummary,
    auth: authRoles.admin
  },
];

export default salesReportSummaryRoutes;

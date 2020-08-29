import { EgretLoadable } from "egret";
import { authRoles } from "../../auth/authRoles";

const ReportList = EgretLoadable({
  loader: () => import("./ReportList")
});

const EditInventoryReport = EgretLoadable({
  loader: () => import("../inventory_warehouse/EditInventoryReport")
});

const EditSalesOutletReport = EgretLoadable({
  loader: () => import("../sales_outlet_report/EditSalesOutletReport")
});

const EditInventoryFactory = EgretLoadable({
  loader: () => import("../inventory_factory/EditInventoryFactory")
});

const reportRoutes = [
  {
    path: "/reports/index",
    exact: true,
    component: ReportList,
    auth: authRoles.admin
  },
  {
    path: "/reports/inventory-warehouse-report/:id",
    exact: true,
    component: EditInventoryReport,
    auth: authRoles.admin
  },
  {
    path: "/reports/inventory-factory-report/:id",
    exact: true,
    component: EditInventoryFactory,
    auth: authRoles.admin
  },
  {
    path: "/reports/sales-report/:id",
    exact: true,
    component: EditSalesOutletReport,
    auth: authRoles.admin
  },
];

export default reportRoutes;

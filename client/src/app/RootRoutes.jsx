import React from "react";
import { Redirect } from "react-router-dom";

import productCategoryRoutes from "./views/product_category/ProductCategoryRoutes";
import productRoutes from "./views/product/ProductRoutes";
import productCostRoutes from "./views/product_cost/ProductCostRoutes";
import productVariationRoutes from "./views/product_variation/VariationRoutes";
import partsUMRoutes from "./views/parts_um/PartsUMRoutes";
import freightRoutes from "./views/freight/FreightRoutes";
import partsRoutes from "./views/parts/PartsRoutes";
import partsTypeRoutes from "./views/parts_type/PartsTypeRoutes";
import supplierRoutes from "./views/supplier/SupplierRoutes";
import supplierTypeRoutes from "./views/supplier_type/SupplierTypeRoutes";
import storageRoutes from "./views/storage/StorageRoutes";
import fullfillmentRoutes from "./views/fullfillment/FullfillmentRoutes";
import miscRoutes from "./views/misc/MiscRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import userRoutes from "./views/users/UserRoutes";
import warehouseLocationTypeRoutes from "./views/warehouse_location_type/LocationTypeRoutes";
import inventoryWarehouseLocationRoutes from "./views/inventory_warehouse_location/LocationRoutes";
import inventoryWarehouseRoutes from "./views/inventory_warehouse/InventoryWarehouseRoutes";
import inventoryFactoryRoutes from "./views/inventory_factory/InventoryFactoryRoutes";
import inventoryForecastRoutes from "./views/inventory_forecast/InventoryForecastRoutes";
import salesOutletRoutes from "./views/sales_outlet/SalesOutletRoutes";
import salesOutletReportRoutes from "./views/sales_outlet_report/SalesOutletReportRoutes";
import salesReportSummaryRoutes from "./views/sales_report_summary/SalesReportSummaryRoutes";
import reportRoutes from "./views/report/ReportRoutes";
import oemOrderRoutes from "./views/oem_order/OEMOrderRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/product/list" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...productRoutes,
  ...productCostRoutes,
  ...productCategoryRoutes,
  ...productVariationRoutes,
  ...partsRoutes,
  ...partsUMRoutes,
  ...partsTypeRoutes,
  ...supplierRoutes,
  ...supplierTypeRoutes,
  ...freightRoutes,
  ...storageRoutes,
  ...fullfillmentRoutes,
  ...miscRoutes,
  ...userRoutes,
  ...inventoryForecastRoutes,
  ...warehouseLocationTypeRoutes,
  ...inventoryWarehouseLocationRoutes,
  ...inventoryWarehouseRoutes,
  ...inventoryFactoryRoutes,
  ...salesOutletRoutes,
  ...salesOutletReportRoutes,
  ...salesReportSummaryRoutes,
  ...reportRoutes,
  ...oemOrderRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;

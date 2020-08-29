const express = require("express");
const router = express.Router();
// Load Project model
const InventoryWarehouseLocation = require("../../models/InventoryWarehouseLocation");
const InventoryWarehouse = require("../../models/InventoryWarehouse");
const WarehouseMeta = require("../../models/WarehouseMeta");
const Product = require("../../models/Product");
const SalesOutletReport = require("../../models/SalesOutletReport");
const SalesOutletReportMeta = require("../../models/SalesOutletReportMeta");
const SalesOutlet = require("../../models/SalesOutlet");

router.post("/report", async (req, res) => {
  const { forecastType, warehouse, monthYear, groupOption } = req.body;

  const selectedMonthYear = new Date(monthYear);
  const fullYear = selectedMonthYear.getFullYear();
  const fullMonth = selectedMonthYear.getMonth() + 1;
  const thisYearMonth = fullYear + "-" + fullMonth;
  const lastYearMonth = fullYear - 1 + "-" + fullMonth;
  const lastYearNext90 = [
    fullYear - 1 + "-" + (fullMonth + 1),
    fullYear - 1 + "-" + (fullMonth + 2),
    fullYear - 1 + "-" + (fullMonth + 3),
  ];
  let warehouseIDs = [];
  if (forecastType == "single") {
    warehouseIDs.push(warehouse);
  } else if (forecastType == "group") {
    if (groupOption == "country") {
      warehouseIDs = await InventoryWarehouseLocation.find({country: req.body.country}).select({_id: 1});
    }
    else if (groupOption == "type") {
      warehouseIDs = await InventoryWarehouseLocation.find({type: req.body.type}).select({_id: 1});
    }
    else if (groupOption == "region") {
      warehouseIDs = await InventoryWarehouseLocation.find({region: req.body.region}).select({_id: 1});
    }
    warehouseIDs = warehouseIDs.map((id) => {
      return id._id;
    });
  }
  let warehouseList = await InventoryWarehouseLocation.find({ _id: {$in : warehouseIDs} });
  InventoryWarehouse.find({ warehouse: { $in: warehouseIDs } })
  .populate("warehouse")
  .populate({
    path: "warehouse",
    populate: {
      path: "type",
      model: "warehouse_location_type",
    },
  })
  .sort({ date: -1 })
  .exec(function (err, warehouse_docs) {
    Product.find({}, async function (err2, product_docs) {
      if (err2) return res.status(400).json({ message: err2 });
      let results = await Promise.all(
        product_docs.map(async (product_doc) => {
          let newObj = {
            product_id: product_doc._id,
            sku: product_doc.sku,
            upc: product_doc.upc,
            asin: product_doc.asin,
            name: product_doc.name,
          };
          if (warehouse_docs.length > 0) {
            let meta = await WarehouseMeta.findOne({
              inventory_warehouse: warehouse_docs[0]._id,
              product: product_doc._id,
            });

            let warehouseKey = `${warehouse_docs[0].warehouse.type.name}_warehouse`;
            let warehouseInboundKey = `${warehouse_docs[0].warehouse.type.name}_warehouse_inbound`;

            newObj[warehouseKey] = meta ? meta.warehouse : 0;
            newObj[warehouseInboundKey] = meta ? meta.warehouse_inbound : 0;
          }

          let thisYearSold = 0;
          let lastYearSold = 0;
          let lastNext90Sold = 0;
          let salesOutlets = await SalesOutlet.find({
            warehouse: { $in: warehouseIDs },
          }).select({ _id: 1 });
          salesOutlets = salesOutlets.map((id) => {
            return id._id;
          });
          let thisYearReportIDs = await SalesOutletReport.find({
            sales_outlet: { $in: salesOutlets },
            date: thisYearMonth,
          }).select({ _id: 1 });
          thisYearReportIDs = thisYearReportIDs.map((id) => {
            return id._id;
          });
          let lastYearReportIDs = await SalesOutletReport.find({
            sales_outlet: { $in: salesOutlets },
            date: lastYearMonth,
          }).select({ _id: 1 });
          lastYearReportIDs = lastYearReportIDs.map((id) => {
            return id._id;
          });
          let lastNext90ReportIDs = await SalesOutletReport.find({
            sales_outlet: { $in: salesOutlets },
            date: { $in: lastYearNext90 },
          }).select({ _id: 1 });
          lastNext90ReportIDs = lastNext90ReportIDs.map((id) => {
            return id._id;
          });

          let thisYearReportData = await SalesOutletReportMeta.find({
            sales_outlet_report: { $in: thisYearReportIDs },
            product: product_doc._id,
          }).select({ _id: 0, sold: 1 });
          let lastYearReportData = await SalesOutletReportMeta.find({
            sales_outlet_report: { $in: lastYearReportIDs },
            product: product_doc._id,
          }).select({ _id: 0, sold: 1 });
          let lastNext90ReportData = await SalesOutletReportMeta.find({
            sales_outlet_report: { $in: lastNext90ReportIDs },
            product: product_doc._id,
          }).select({ _id: 0, sold: 1 });

          thisYearReportData.map((data) => {
            thisYearSold += data.sold;
          });
          lastYearReportData.map((data) => {
            lastYearSold += data.sold;
          });
          lastNext90ReportData.map((data) => {
            lastNext90Sold += data.sold;
          });
          newObj.this_year_sales_sold = thisYearSold;
          newObj.last_year_sales_sold = lastYearSold;
          newObj.last_year_next_90_sales_sold = lastNext90Sold;
          return newObj;
        })
      );
      return res.status(200).json({results:results, warehouseList: warehouseList});
    });
  });

});

module.exports = router;

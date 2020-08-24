const express = require("express");
const router = express.Router();
// Load Project model
const InventoryWarehouse = require("../../models/InventoryWarehouse");
const WarehouseMeta = require("../../models/WarehouseMeta");
const Product = require("../../models/Product");

router.post("/report", (req, res) => {
  const { forecastType, warehouse } = req.body;
  if (forecastType == "single") {
    InventoryWarehouse.find({ warehouse: warehouse })
      .populate('warehouse') 
      .populate({ path: 'warehouse',
          populate: {
            path: 'type',
            model: 'warehouse_location_type'
      }})
      .sort({ date: -1 })
      .exec(function (err, warehouse_docs) {
        Product.find({}, async function (err2, product_docs) {
          if (err2) return res.status(400).json({ message: err2 });
          if (warehouse_docs.length == 0)
            return res
              .status(200)
              .json({ is_exist: false, results: product_docs });
          let results = await Promise.all(
            product_docs.map(async (product_doc) => {
              let meta = await WarehouseMeta.findOne({
                inventory_warehouse: warehouse_docs[0]._id,
                product: product_doc._id,
              });
              let warehouseKey = `${warehouse_docs[0].warehouse.type.name}_warehouse`;
              let warehouseInboundKey = `${warehouse_docs[0].warehouse.type.name}_warehouse_inbound`;
              return {
                product_id: product_doc._id,
                sku: product_doc.sku,
                upc: product_doc.upc,
                asin: product_doc.asin,
                name: product_doc.name,
                [warehouseKey]: meta ? meta.warehouse : 0,
                [warehouseInboundKey]: meta ? meta.warehouse_inbound : 0,
              };
            })
          );
          return res.status(200).json({
            is_exist: true,
            results: results,
          });
        });
      });
  } else if (forecastType == "group") {
    return res.status(200).json({ message: "Success" });
  }
});

module.exports = router;

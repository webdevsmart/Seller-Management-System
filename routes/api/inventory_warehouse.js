const express = require("express");
const router = express.Router();
// Load Project model
const InventoryWarehouse = require("../../models/InventoryWarehouse");
const WarehouseMeta = require("../../models/WarehouseMeta");
const Product = require("../../models/Product");

router.post("/report", (req, res) => {
  const date = new Date(req.body.date);
  const start_date = date.setHours(0, 0, 0, 0);
  const end_date = date.setHours(24, 59, 59, 59);
  InventoryWarehouse.findOne({
    date: { $gte: new Date(start_date), $lte: new Date(end_date) },
    warehouse: req.body.warehouse,
  })
    .populate("submitted_user")
    .exec(function (err, doc) {
      if (err) return res.status(400).json({ message: err });
      if (doc) {
        Product.find({}, async function (err2, docs1) {
          if (err2) return res.status(400).json({ message: err2 });
          let results = await Promise.all(
            docs1.map(async (product_doc) => {
              let meta = await WarehouseMeta.findOne({
                inventory_warehouse: doc._id,
                product: product_doc._id,
              });
              return {
                product_id: product_doc._id,
                sku: product_doc.sku,
                upc: product_doc.upc,
                asin: product_doc.asin,
                name: product_doc.name,
                warehouse: meta ? meta.warehouse : 0,
                warehouse_inbound: meta ? meta.warehouse_inbound : 0,
              };
            })
          );
          return res.status(200).json({
            is_exist: true,
            results: results,
            submitted_user: doc.submitted_user.name,
            modified_at: doc.modified_at,
          });
        });
      } else {
        Product.find({}, function (err2, docs1) {
          if (err2) return res.status(400).json({ message: err2 });
          return res.status(200).json({ is_exist: false, results: docs1 });
        });
      }
    });
});

router.post("/add", async (req, res) => {
  const date = new Date(req.body.date);
  const start_date = date.setHours(0, 0, 0, 0);
  const end_date = date.setHours(24, 59, 59, 59);
  let query = {
    date: { $gte: new Date(start_date), $lte: new Date(end_date) },
    warehouse_name: req.body.warehouse_name,
    country: req.body.country,
  };
  const modified_at = new Date();
  InventoryWarehouse.findOne(query, async function (err, doc) {
    if (doc) {
      await InventoryWarehouse.updateOne(
        { _id: doc._id },
        { $set: { modified_at: modified_at, submitted_user: req.body.submitted_user } }
      );
      await WarehouseMeta.deleteMany({ inventory_warehouse: doc._id });
      let items = req.body.items;
      items = items.map(function (entry) {
        entry.inventory_warehouse = doc._id;
        return entry;
      });
      WarehouseMeta.insertMany(items, function (err, docs) {
        if (err) {
          return res.status(400).json({ message: err });
        }
        return res.status(200).json({ message: "Success", modified_at: modified_at });
      });
    } else {
      let newWarehouse = new InventoryWarehouse(req.body);
      newWarehouse
        .save()
        .then((doc) => {
          let items = req.body.items;
          items = items.map(function (entry) {
            entry.inventory_warehouse = doc._id;
            return entry;
          });
          WarehouseMeta.insertMany(items, function (err, doc) {
            if (err) {
              return res.status(400).json({ message: err });
            }
            return res.status(200).json({ message: "Success", modified_at: modified_at });
          });
        })
        .catch((err) => {
          return res.status(400).json({ message: err });
        });
    }
  });
});
module.exports = router;

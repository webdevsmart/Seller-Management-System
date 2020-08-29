const express = require("express");
const router = express.Router();
// Load Project model
const InventoryWarehouse = require("../../models/InventoryWarehouse");
const WarehouseMeta = require("../../models/WarehouseMeta");
const Product = require("../../models/Product");
const Report = require("../../models/Report");
const InventoryFactoryMeta = require("../../models/InventoryFactoryMeta");

// router.post("/report", (req, res) => {
//   const date = new Date(req.body.date);
//   const start_date = date.setHours(0, 0, 0, 0);
//   const end_date = date.setHours(24, 59, 59, 59);
//   InventoryWarehouse.findOne({
//     date: { $gte: new Date(start_date), $lte: new Date(end_date) },
//     warehouse: req.body.warehouse,
//   })
//     .populate("submitted_user")
//     .exec(function (err, doc) {
//       if (err) return res.status(400).json({ message: err });
//       if (doc) {
//         Product.find({}, async function (err2, docs1) {
//           if (err2) return res.status(400).json({ message: err2 });
//           let results = await Promise.all(
//             docs1.map(async (product_doc) => {
//               let meta = await WarehouseMeta.findOne({
//                 inventory_warehouse: doc._id,
//                 product: product_doc._id,
//               });
//               return {
//                 product_id: product_doc._id,
//                 sku: product_doc.sku,
//                 upc: product_doc.upc,
//                 asin: product_doc.asin,
//                 name: product_doc.name,
//                 warehouse: meta ? meta.warehouse : 0,
//                 warehouse_inbound: meta ? meta.warehouse_inbound : 0,
//               };
//             })
//           );
//           return res.status(200).json({
//             is_exist: true,
//             results: results,
//             submitted_user: doc.submitted_user.name,
//             modified_at: doc.modified_at,
//           });
//         });
//       } else {
//         Product.find({}, function (err2, docs1) {
//           if (err2) return res.status(400).json({ message: err2 });
//           return res.status(200).json({ is_exist: false, results: docs1 });
//         });
//       }
//     });
// });

router.get("/get", (req, res) => {
  InventoryWarehouse.findOne({_id: req.query._id}).populate('editted_user').populate('warehouse').populate({
    path: "warehouse",
    populate: {
      path: "type",
      model: "warehouse_location_type",
    }}).exec(async function (err, doc) {
    if (err) return res.status(400).json({message: err});
    let items = await WarehouseMeta.find({inventory_warehouse: req.query._id}).populate('product');
    return res.status(200).json({items, report: doc});
  });
});

router.post("/add", async (req, res) => {
  let newWarehouse = new InventoryWarehouse({
    ID: req.body.ID,
    warehouse: req.body.warehouse,
    datetime: req.body.datetime,
    submitted_user: req.body.submitted_user,
    editted_user: req.body.editted_user,
    created_at: new Date(),
    modified_at: new Date(),
  });
  newWarehouse
    .save()
    .then((doc) => {
      let newReport = new Report({
        report_type: 'INVENTORY_WAREHOUSE',
        model_id: doc._id,
      });
      newReport.save();
      let items = req.body.items;
      items = items.map(function (entry) {
        entry.inventory_warehouse = doc._id;
        return entry;
      });
      WarehouseMeta.insertMany(items, function (err, doc) {
        if (err) {
          return res.status(400).json({ message: err });
        }
        return res.status(200).json({ message: "Success" });
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

router.post("/update", async (req, res) => {
  let newObj = {
    $set: {
      modified_at: new Date(),
      warehouse: req.body.warehouse,
      datetime: req.body.datetime,
      editted_user: req.body.editted_user
    }
  };
  InventoryWarehouse.findByIdAndUpdate({_id: req.body._id}, newObj, async function (err, doc) {
    await WarehouseMeta.deleteMany({"inventory_warehouse": doc._id});

    let items = req.body.items;
    items = items.map(function (entry) {
      entry.inventory_warehouse = doc._id;
      return entry;
    });
    
    WarehouseMeta.insertMany(items, function (err, doc) {
      if (err) {
        return res.status(400).json({ message: err });
      }
      return res.status(200).json({ message: "Success" });
    });
  });
});

module.exports = router;

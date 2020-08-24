const express = require("express");
const router = express.Router();
// Load Project model
const SalesOutletReport = require("../../models/SalesOutletReport");
const SalesOutletReportMeta = require("../../models/SalesOutletReportMeta");
const Product = require("../../models/Product");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.post("/get", async (req, res) => {
    const date = new Date(req.body.date);
    SalesOutletReport.findOne({
      date: date.getFullYear() + '-' + (date.getMonth() + 1),
      sales_outlet: req.body.salesOutlet,
    })
      .populate("submitted_user")
      .exec(function (err, doc) {
        if (err) return res.status(400).json({ message: err });
        if (doc) {
          Product.find({}, async function (err2, docs1) {
            if (err2) return res.status(400).json({ message: err2 });
            let results = await Promise.all(
              docs1.map(async (product_doc) => {
                let meta = await SalesOutletReportMeta.findOne({
                  sales_outlet_report: doc._id,
                  product: product_doc._id,
                });
                return {
                  product_id: product_doc._id,
                  sku: product_doc.sku,
                  upc: product_doc.upc,
                  asin: product_doc.asin,
                  name: product_doc.name,
                  sold: meta ? meta.sold : 0,
                  returned: meta ? meta.returned : 0,
                  refunded: meta ? meta.refunded : 0,
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
  let query = {
    date: date.getFullYear() + '-' + (date.getMonth() + 1),
    sales_outlet: req.body.sales_outlet,
  };
  const modified_at = new Date();
  SalesOutletReport.findOne(query, async function (err, doc) {
    if (doc) {
      await SalesOutletReport.updateOne(
        { _id: doc._id },
        { $set: { modified_at: modified_at, submitted_user: req.body.submitted_user } }
      );
      await SalesOutletReportMeta.deleteMany({ sales_outlet_report: doc._id });
      let items = req.body.items;
      items = items.map(function (entry) {
        entry.sales_outlet_report = doc._id;
        return entry;
      });
      SalesOutletReportMeta.insertMany(items, function (err, docs) {
        if (err) {
          return res.status(400).json({ message: err });
        }
        return res.status(200).json({ message: "Success", modified_at: modified_at });
      });
    } else {
      let newSalesOutletReort = new SalesOutletReport({
        sales_outlet: req.body.sales_outlet,
        date: date.getFullYear() + '-' + (date.getMonth() + 1),
        submitted_user: req.body.submitted_user,
      });
      newSalesOutletReort
        .save()
        .then((doc) => {
          let items = req.body.items;
          items = items.map(function (entry) {
            entry.sales_outlet_report = doc._id;
            return entry;
          });
          SalesOutletReportMeta.insertMany(items, function (err, doc) {
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

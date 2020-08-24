const express = require("express");
const router = express.Router();
// Load Project model
const SalesOutletReport = require("../../models/SalesOutletReport");
const SalesOutletReportMeta = require("../../models/SalesOutletReportMeta");
const Product = require("../../models/Product");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.post("/get", async (req, res) => {
    const date = new Date(req.body.date);
    SalesOutletReport.find({
      date: date.getFullYear() + '-' +(date.getMonth() + 1),
    })
      .populate("sales_outlet")
      .exec(function (err, reportDocs) {
        if (err) return res.status(400).json({ message: err });
        if (reportDocs.length != 0) {
          Product.find({}, async function (err2, productDocs) {
            if (err2) return res.status(400).json({ message: err2 });
            let results = await Promise.all(
              productDocs.map(async (product_doc) => {
                let newObj = {
                  product_id: product_doc._id,
                  sku: product_doc.sku,
                  upc: product_doc.upc,
                  asin: product_doc.asin,
                  name: product_doc.name,
                }
                await Promise.all(
                  reportDocs.map( async (sales_report) => {
                    let meta = await SalesOutletReportMeta.findOne({
                      sales_outlet_report: sales_report._id,
                      product: product_doc._id,
                    });
                    newObj[sales_report.sales_outlet.short_name] = meta ? meta.sold : 0;
                }));
                return newObj;
              })
            );
            return res.status(200).json({
              is_exist: true,
              results: results,
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

module.exports = router;

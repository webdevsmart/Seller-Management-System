const express = require("express");
const router = express.Router();
// Load Project model
const SalesOutletReport = require("../../models/SalesOutletReport");
const SalesOutletReportMeta = require("../../models/SalesOutletReportMeta");
const Product = require("../../models/Product");
const Report = require("../../models/Report");

router.get("/get", (req, res) => {
  SalesOutletReport.findOne({_id: req.query._id}).populate('editted_user').populate('sales_outlet').populate({
    path: "warehouse",
    populate: {
      path: "type",
      model: "warehouse_location_type",
    }}).exec(async function (err, doc) {
    if (err) return res.status(400).json({message: err});
    let items = await SalesOutletReportMeta.find({sales_outlet_report: req.query._id}).populate('product');
    return res.status(200).json({items, report: doc});
  });
});

router.post("/add", async (req, res) => {
  const date = new Date(req.body.date);
  let newSalesOutletReort = new SalesOutletReport({
    ID: req.body.ID,
    sales_outlet: req.body.sales_outlet,
    date: date.getFullYear() + '-' + (date.getMonth() + 1),
    submitted_user: req.body.submitted_user,
    editted_user: req.body.editted_user,
    created_at: new Date(),
    modified_at: new Date(),
  });
  newSalesOutletReort
    .save()
    .then((doc) => {
      let newReport = new Report({
        report_type: 'SALES',
        model_id: doc._id
      });
      newReport.save();
      let items = req.body.items;
      items = items.map(function (entry) {
        entry.sales_outlet_report = doc._id;
        return entry;
      });
      SalesOutletReportMeta.insertMany(items, function (err, doc) {
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
      sales_outlet: req.body.sales_outlet,
      date: req.body.date,
      editted_user: req.body.editted_user
    }
  };
  SalesOutletReport.findByIdAndUpdate({_id: req.body._id}, newObj, async function (err, doc) {
    await SalesOutletReportMeta.deleteMany({"sales_outlet_report": doc._id});

    let items = req.body.items;
    items = items.map(function (entry) {
      entry.sales_outlet_report = doc._id;
      return entry;
    });
    
    SalesOutletReportMeta.insertMany(items, function (err, doc) {
      if (err) {
        return res.status(400).json({ message: err });
      }
      return res.status(200).json({ message: "Success" });
    });
  });
});

module.exports = router;

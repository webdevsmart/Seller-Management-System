const express = require("express");
const router = express.Router();
// Load Project model
const InventoryFactory = require("../../models/InventoryFactory");
const InventoryFactoryMeta = require("../../models/InventoryFactoryMeta");
const Product = require("../../models/Product");
const Report = require("../../models/Report");

router.get("/get", (req, res) => {
  InventoryFactory.findOne({_id: req.query._id}).populate('warehouse').populate('editted_user').populate({
    path: "warehouse",
    populate: {
      path: "type",
      model: "warehouse_location_type",
    }}).exec(async function (err, doc) {
    if (err) return res.status(400).json({message: err});
    let items = await InventoryFactoryMeta.find({inventory_factory: req.query._id}).populate('product');
    return res.status(200).json({items, report: doc});
  });
});


router.post("/add", async (req, res) => {
  let newReport = new InventoryFactory({
    ID: req.body.ID,
    warehouse: req.body.warehouse,
    datetime: req.body.datetime,
    submitted_user: req.body.submitted_user,
    editted_user: req.body.editted_user,
    created_at: new Date(),
    modified_at: new Date(),
  });
  newReport
    .save()
    .then((doc) => {
      let newReport = new Report({
        report_type: 'INVENTORY_FACTORY',
        model_id: doc._id,
      });
      newReport.save();
      let items = req.body.items;
      items = items.map(function (entry) {
        entry.inventory_factory = doc._id;
        return entry;
      });
      InventoryFactoryMeta.insertMany(items, function (err, doc) {
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
  InventoryFactory.findByIdAndUpdate({_id: req.body._id}, newObj, async function (err, doc) {
    await InventoryFactoryMeta.deleteMany({"inventory_factory": doc._id});

    let items = req.body.items;
    items = items.map(function (entry) {
      entry.inventory_factory = doc._id;
      return entry;
    });
    
    InventoryFactoryMeta.insertMany(items, function (err, doc) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(200).json({ message: "Success" });
    });
  });
});

module.exports = router;

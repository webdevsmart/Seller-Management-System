const express = require("express");
const router = express.Router();
// Load Project model
const InventoryWarehouseLocation = require("../../models/InventoryWarehouseLocation");
const Supplier = require("../../models/Supplier");
const { ObjectId } = require("mongodb"); // or ObjectID

router.get("/list", async (req, res) => {
  try {
    const locations = await InventoryWarehouseLocation.find({}).populate(
      "type"
    );
    return res.json(locations);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/name-list", async (req, res) => {
  InventoryWarehouseLocation.aggregate(
    [{ $group: { _id: "$name" } }],
    function (err, results) {
      if (err) return res.statu(400).json(err);
      return res.status(200).json(results);
    }
  );
});

router.post("/location-list", async (req, res) => {
  InventoryWarehouseLocation.aggregate(
    [{ $match: { name: req.body.name } }, { $group: { _id: "$country" } }],
    function (err, results) {
      if (err) return res.statu(400).json(err);
      return res.status(200).json(results);
    }
  );
});

router.post("/add", async (req, res) => {
  const newType = new InventoryWarehouseLocation(req.body);
  newType
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

router.get("/get", async (req, res) => {
  const item = await InventoryWarehouseLocation.findById(
    req.query.uid
  ).populate("type");
  res.json(item);
});

router.post("/update", async (req, res) => {
  const query = { _id: req.body._id };
  const newvalues = {
    $set: {
      name: req.body.name,
      short_name: req.body.short_name,
      type: req.body.type,
      country: req.body.country,
    },
  };
  InventoryWarehouseLocation.updateOne(query, newvalues, function (
    err,
    response
  ) {
    return res.status(200).json({ message: "Success" });
  });
});

router.post("/delete", async (req, res) => {
  const query = { _id: req.query.uid };
  const len = await Supplier.count({ type: req.query.uid });
  if (len == 0) {
    InventoryWarehouseLocation.deleteOne(query, function (err, response) {
      return res.status(200).json({ message: "Success" });
    });
  } else {
    return res
      .status(400)
      .send({
        message: "This supplier type is already used in other suppliers.",
      });
  }
});

module.exports = router;

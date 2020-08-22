const express = require("express");
const router = express.Router();
// Load Project model
const WarehouseLocationType = require("../../models/WarehouseLocationType");
const InventoryWarehouseLocation = require("../../models/InventoryWarehouseLocation");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const types = await WarehouseLocationType.find({});
        return res.json(types);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newType = new WarehouseLocationType({
        ID: req.body.ID,
        name: req.body.name
    });
    newType.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await WarehouseLocationType.findById(req.query.uid);
    res.json(item);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {name: req.body.name} };
    WarehouseLocationType.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query.uid };
    const len = await InventoryWarehouseLocation.count({type: req.query.uid});
    if (len == 0) {
        WarehouseLocationType.deleteOne(query, function(err, response) {
            return res.status(200).json({message: "Success"});
        });
    }
    else {
        return res.status(400).send({message: "This type is already used in other locations."})
    }
});

module.exports = router;

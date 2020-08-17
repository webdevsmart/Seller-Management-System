const express = require("express");
const router = express.Router();
// Load Project model
const SupplierType = require("../../models/SupplierType");
const Supplier = require("../../models/Supplier");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const categories = await SupplierType.find({});
        return res.json(categories);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newType = new SupplierType({
        ID: req.body.ID,
        name: req.body.name
    });
    newType.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await SupplierType.findById(req.query.uid);
    res.json(item);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {name: req.body.name} };
    SupplierType.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query.uid };
    const len = await Supplier.count({type: req.query.uid});
    if (len == 0) {
        SupplierType.deleteOne(query, function(err, response) {
            return res.status(200).json({message: "Success"});
        });
    }
    else {
        return res.status(400).send({message: "This supplier type is already used in other suppliers."})
    }
});

module.exports = router;

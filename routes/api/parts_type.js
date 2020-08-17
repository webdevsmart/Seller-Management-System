const express = require("express");
const router = express.Router();
// Load Project model
const PartsType = require("../../models/PartsType");
const Parts = require("../../models/Parts");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const list = await PartsType.find({});
        return res.json(list);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newPartsType = new PartsType({
        ID: req.body.ID,
        name: req.body.name,
    });
    newPartsType.save()
    .then(category => res.json(category))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await PartsType.findById(req.query._id);
    res.json(item);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {name: req.body.name} };
    PartsType.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query._id };
    const len = await Parts.count({type: req.query._id});
    if (len == 0) {
        PartsType.deleteOne(query, function(err, response) {
            return res.status(200).json({message: "Success"});
        });
    }
    else {
        return res.status(400).send({message: "This supplier type is already used in other suppliers."})
    }
});

module.exports = router;

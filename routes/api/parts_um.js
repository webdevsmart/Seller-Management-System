const express = require("express");
const router = express.Router();
// Load Project model
const PartsUM = require("../../models/PartsUM");
const Parts = require("../../models/Parts");
const Fullfillment = require("../../models/Fullfillment");
const Freight = require("../../models/Freight");
const Misc = require("../../models/Misc");
const Storage = require("../../models/Storage");

const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const list = await PartsUM.find({});
        return res.json(list);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newPartsUM = new PartsUM({
        ID: req.body.ID,
        name: req.body.name,
        short_name: req.body.short_name
    });
    newPartsUM.save()
    .then(category => res.json(category))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await PartsUM.findById(req.query._id);
    res.json(item);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {name: req.body.name, short_name: req.body.short_name} };
    PartsUM.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query._id };
    const len = await Parts.count({UM: req.query._id});
    const len1 = await Freight.count({UM: req.query._id});
    const len2 = await Fullfillment.count({UM: req.query._id});
    const len3 = await Misc.count({UM: req.query._id});
    const len4 = await Storage.count({UM: req.query._id});
    if (len== 0) {
        if (len1 == 0) {
            if (len2 == 0) {
                if (len3 == 0) {
                    if (len4 == 0) {
                        PartsUM.deleteOne(query, function(err, response) {
                            return res.status(200).json({message: "Success"});
                        });
                    }
                    else {
                        return res.status(400).send({message: "This parts UM is already used in other storage."})
                    }
                }
                else {
                    return res.status(400).send({message: "This parts UM is already used in other misc."})
                }
            }
            else {
                return res.status(400).send({message: "This parts UM is already used in other fullfillment."})
            }
        }
        else {
            return res.status(400).send({message: "This parts UM is already used in other freight."})
        }
    }
    else {
        return res.status(400).send({message: "This parts UM is already used in other parts."})
    }
});

module.exports = router;

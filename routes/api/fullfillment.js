const express = require("express");
const router = express.Router();
// Load Project model
const Fullfillment = require("../../models/Fullfillment");
const Product = require("../../models/Product");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const list = await Fullfillment.find().populate('UM');
        return res.json(list);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newFullfillment = new Fullfillment(req.body);
    newFullfillment.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await Fullfillment.findById(req.query._id).populate("UM");
    res.json(item);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {
        name: req.body.name,
        rate: req.body.rate,
        UM: req.body.UM,
    } };
    
    Fullfillment.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query._id };
    const len = await Product.count({$or:[{"fullfillment_amazon":req.query._id},{"fullfillment_thirdparty":req.query._id},{"fullfillment_us":req.query._id},{"fullfillment_fba_fee":req.query._id}]});
    if (len == 0) {
        Fullfillment.deleteOne(query, function(err, response) {
            return res.status(200).json({message: "Success"});
        });
    }
    else {
        return res.status(400).send({message: "This fullfillment is already used in other products."})
    }
});

module.exports = router;

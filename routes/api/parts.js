const express = require("express");
const router = express.Router();
// Load Project model
const Parts = require("../../models/Parts");
const Product = require("../../models/Product");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const list = await Parts.find().populate('type').populate('UM').populate('supplier_id');
        return res.json(list);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    Parts.insertMany(req.body)
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await Parts.findById(req.query._id).populate("type").populate("UM");
    res.json(item);
});

router.post("/update-list", async (req, res) => {
    let list = req.body;
    Promise.all(list.map(item =>
        Parts.findOneAndUpdate({ _id: item._id }, item)
    )).then(() => {
        res.status(200).json({message: "Success"});
    });
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {
        name: req.body.name,
        type: req.body.type,
        cost_usd: req.body.costUSD,
        UM: req.body.UM,
        qty: req.body.qty,
    } };
    
    Parts.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query._id };
    const len = await Product.count({ parts: { $elemMatch: { $eq: req.query._id} } })
    if (len == 0) {
        Parts.deleteOne(query, function(err, response) {
            return res.status(200).json({message: "Success"});
        });
    }
    else {
        return res.status(400).send({message: "This part is already used in other products."})
    }
});




module.exports = router;

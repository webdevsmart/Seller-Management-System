const express = require("express");
const router = express.Router();
// Load Project model
const SalesOutlet = require("../../models/SalesOutlet");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const categories = await SalesOutlet.find({}).populate('warehouse');
        return res.json(categories);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newItem = new SalesOutlet(req.body);
    newItem.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await SalesOutlet.findById(req.query.uid).populate('warehouse');
    res.json(item);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: req.body };
    SalesOutlet.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query.uid };
    SalesOutlet.deleteOne(query, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.get("/name-list", async (req, res) => {
    SalesOutlet.aggregate( 
        [ { '$group': { '_id': "$name" } } ],	  
        function(err, results) {
            if (err)
                return res.statu(400).json(err);
            return res.status(200).json(results);
        }
    );
});

router.post("/location-list-by-id", async (req, res) => {
    SalesOutlet.find({name: req.body.name}, function (err, docs) {
        return res.status(200).json(docs);
    });
});


module.exports = router;

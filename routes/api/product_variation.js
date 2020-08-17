const express = require("express");
const router = express.Router();
// Load Project model
const ProductVariation = require("../../models/ProductVariation");
const Product = require("../../models/Product");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const list = await ProductVariation.find({});
        return res.json(list);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newCategory = new ProductVariation({
        unique_id: req.body.uid,
        type: req.body.type,
        value: req.body.value
    });
    newCategory.save()
    .then(category => res.json(category))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await ProductVariation.findById(req.query._id);
    res.json(item);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {type: req.body.type, value: req.body.value} };
    ProductVariation.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query._id };
    ProductVariation.deleteOne(query, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.get("/type_list", async (req, res) => {
    ProductVariation.aggregate( 
        [ { '$group': { '_id': "$type" } } ],	  
        function(err, results) {
            if (err)
                return res.statu(400).json(err);
            return res.status(200).json(results);
        }
    );
});

router.get("/value_list", async (req, res) => {
    ProductVariation.aggregate( 
        [ { '$match': { "type": req.query.type } },
          { '$group': { '_id': "$value" } } ],	  
        function(err, results) {
            if (err)
                return res.statu(400).json(err);
            return res.status(200).json(results);
        }
    );
});
module.exports = router;

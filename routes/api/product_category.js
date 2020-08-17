const express = require("express");
const router = express.Router();
// Load Project model
const ProductCategory = require("../../models/ProductCategory");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const categories = await ProductCategory.find({});
        return res.json(categories);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newCategory = new ProductCategory({
        ID: req.body.ID,
        category: req.body.category
    });
    newCategory.save()
    .then(category => res.json(category))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const category = await ProductCategory.findById(req.query.uid);
    res.json(category);
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {category: req.body.category} };
    ProductCategory.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query.uid };
    const len = await Product.count({ categories: { $elemMatch: { $eq: req.query.uid} } });
    const len1 = await Product.count({ parent_category: req.query.uid });
    if (len + len1 == 0) {
        ProductCategory.deleteOne(query, function(err, response) {
            return res.status(200).json({message: "Success"});
        });
    }
    else {
        return res.status(400).send({message: "This category is already used in other products."})
    }
});




module.exports = router;

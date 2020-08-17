const express = require("express");
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
// Load Project model
const PartsUM = require("../../models/PartsUM");
const Parts = require("../../models/Parts");
const path = require('path');
const {ObjectId} = require('mongodb'); // or ObjectID 
const Product = require("../../models/Product");
 
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
      });
      //cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get("/list", async (req, res) => {
    try {
        const list = await Product.find({}).populate('categories').populate('parent_category');
        return res.json(list);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", upload.single('file'), async (req, res) => {
    const newProduct = new Product({
        ...JSON.parse(req.body.new_product),
        img: req.file.path,
    }); 
    newProduct.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json(err.message));
});

router.get("/get", async (req, res) => {
    const item = await Product.findById(req.query._id)
                .populate('parent_category')
                .populate('categories')
                .populate('fullfillment_amazon')
                .populate('fullfillment_thirdparty')
                .populate('fullfillment_us')
                .populate('freight')
                .populate('parts')
                .populate('storage')
                .populate('fullfillment_fba_fee')
                .populate('fullfillment_thirdparty')
                .populate({ path: 'freight',
                    populate: {
                      path: 'UM',
                      model: 'parts_um'
                }})
                .populate({ path: 'storage',
                    populate: {
                      path: 'UM',
                      model: 'parts_um'
                }})
                .populate({ path: 'parts',
                    populate: {
                      path: 'UM',
                      model: 'parts_um'
                }})
                .populate({ path: 'parts',
                    populate: {
                      path: 'type',
                      model: 'parts_type'
                }})
    res.json(item);
});

router.post("/update", upload.single('file'), async (req, res) => {
    const query = { _id: req.body._id };
    let newvalues = { $set: { ...JSON.parse(req.body.new_product) } };
    if (req.body.is_new_image == 'true') {
        newvalues = { $set: { ...JSON.parse(req.body.new_product), img: req.file.path } }
    }
    Product.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query._id };
    Product.deleteOne(query, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.get("/cost-list", async (req, res) => {
    const item = await Product.find()
                .populate('parent_category')
                .populate('categories')
                .populate('fullfillment_amazon')
                .populate('fullfillment_thirdparty')
                .populate('fullfillment_us')
                .populate('freight')
                .populate('parts')
                .populate('storage')
                .populate('fullfillment_fba_fee')
                .populate('fullfillment_thirdparty')
                .populate({ path: 'freight',
                    populate: {
                      path: 'UM',
                      model: 'parts_um'
                }})
                .populate({ path: 'storage',
                    populate: {
                      path: 'UM',
                      model: 'parts_um'
                }})
                .populate({ path: 'parts',
                    populate: {
                      path: 'UM',
                      model: 'parts_um'
                }});
    res.json(item);
});

module.exports = router;

const express = require("express");
const router = express.Router();
// Load Project model
const Supplier = require("../../models/Supplier");
const Parts = require("../../models/Parts");
const {ObjectId} = require('mongodb'); // or ObjectID 
 
router.get("/list", async (req, res) => {
    try {
        const suppliers = await Supplier.find().populate("type");
        return res.json(suppliers);
    } catch(error) {
        throw new Error(error);
    }
});

router.post("/add", async (req, res) => {
    const newSupplier = new Supplier({
        ID: req.body.ID,
        start_date: req.body.start_date,
        type: req.body.type,
        country: req.body.country,
        name: req.body.name,
        contact: req.body.contact,
        skype: req.body.skype,
        wechat: req.body.wechat,
        whatsapp: req.body.whatsapp,
        mobile: req.body.mobile,
        office: req.body.office,
        email: req.body.email,
        main_products_services: req.body.main_products_services,
        address: req.body.address,
        notes: req.body.notes
    });
    newSupplier.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.get("/get", async (req, res) => {
    const item = await Supplier.findById(req.query.uid).populate("type");
    const parts = await Parts.find({supplier_id: req.query.uid}).populate("type").populate("UM");
    res.json({parts: parts, supplier: item});
});

router.post("/update", async (req, res) => {
    const query = { _id: req.body._id };
    const newvalues = { $set: {
        ID: req.body.ID,
        start_date: req.body.start_date,
        type: req.body.type,
        country: req.body.country,
        name: req.body.name,
        contact: req.body.contact,
        skype: req.body.skype,
        wechat: req.body.wechat,
        whatsapp: req.body.whatsapp,
        mobile: req.body.mobile,
        office: req.body.office,
        email: req.body.email,
        main_products_services: req.body.main_products_services,
        address: req.body.address,
        notes: req.body.notes
    } };
    Supplier.updateOne(query, newvalues, function(err, response) {
        return res.status(200).json({message: "Success"});
    });
});

router.post("/delete", async (req, res) => {
    const query = { _id: req.query.uid };
    const len = await Parts.count({supplier_id: req.query.uid});
    if (len == 0) {
        Supplier.deleteOne(query, function(err, response) {
            return res.status(200).json({message: "Success"});
        });
    }
    else {
        return res.status(400).send({message: "This supplier is already used in other parts."})
    }
});

module.exports = router;

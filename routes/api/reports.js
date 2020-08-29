const moment =require("moment");
const express = require("express");
const router = express.Router();
// Load Project model
const Report = require("../../models/Report");
const SalesOutletReport = require("../../models/SalesOutletReport");
const SalesOutletReportMeta = require("../../models/SalesOutletReportMeta");
const InventoryWarehouse = require("../../models/InventoryWarehouse");
const InventoryFactory = require("../../models/InventoryFactory");
const InventoryFactoryMeta = require("../../models/InventoryFactoryMeta");
const WarehouseMeta = require("../../models/WarehouseMeta");
const User = require("../../models/User");
const { ObjectId } = require("mongodb"); // or ObjectID

router.get("/list", async (req, res) => {
  Report.find({}, async (err, docs) => {
    let results = await Promise.all(
      docs.map(async (doc) => {
        let newObj = {
          _id: doc._id,
          model_id: doc.model_id,
        }
        let details = null;
        if (doc.report_type == "SALES") {
          details = await SalesOutletReport.findOne({ _id: doc.model_id });
          newObj.report_type = "Sales";
          
        }
        else if (doc.report_type == "INVENTORY_WAREHOUSE") {
          details = await InventoryWarehouse.findOne({ _id: doc.model_id });
          newObj.report_type = "Inventory Warehouse";
          
        }
        
        else if (doc.report_type == "INVENTORY_FACTORY") {
          details = await InventoryFactory.findOne({ _id: doc.model_id });
          newObj.report_type = "Inventory Factory";
          
        }
        newObj.submitted_datetime = moment(details.created_at).format('YYYY-MM-DD h:mm:ss A');
        newObj.report_id = details.ID;
        let user = await User.findOne({_id: details.submitted_user});
        newObj.user = user.name;
        newObj.editted_date =  moment(details.modified_at).format('YYYY-MM-DD h:mm:ss A');
        let editted_user = await User.findOne({_id: details.editted_user});
        newObj.editted_user = editted_user.name;
        return newObj;
      })
    );
    return res.json(results);
  });
});

router.post("/delete", async (req, res) => {
  Report.findOne({_id: req.query.id}, async (err, doc) => {
    if (doc.report_type == 'SALES') {
      await SalesOutletReport.deleteOne({_id: doc.model_id});
      await SalesOutletReportMeta.deleteMany({"sales_outlet_report": doc.model_id});
    }
    else if (doc.report_type == 'INVENTORY_WAREHOUSE') {
      await WarehouseMeta.deleteMany({"inventory_warehouse": doc.model_id});
      await InventoryWarehouse.deleteOne({_id: doc.model_id});
    }
    else if (doc.report_type == 'INVENTORY_FACTORY') {
      await InventoryFactoryMeta.deleteMany({"inventory_factory": doc.model_id});
      await InventoryFactory.deleteOne({_id: doc.model_id});
    }
    await Report.deleteOne({_id: req.query.id});
    return res.json({message: "Success"});
  });
});

module.exports = router;


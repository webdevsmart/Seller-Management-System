const express = require("express");
const router = express.Router();
// Load Project model
const Parts = require("../../models/Parts");
const Product = require("../../models/Product");
const OEMOrder = require("../../models/OEMOrder");
const OEMOrderMeta = require("../../models/OEMOrderMeta");
const Report = require("../../models/Report");
const excel = require("exceljs");
const { ObjectId } = require("mongodb"); // or ObjectID

router.post("/add", async (req, res) => {
  let newOrder = new OEMOrder(req.body);
  newOrder.save().then((doc) => {
    let items = req.body.items;
    items = items.map(function (entry) {
      entry.oem_order = doc._id;
      return entry;
    });
    OEMOrderMeta.insertMany(items, function (err, docs) {
      if (err) {
        return res.status(400).json({ message: err });
      }
      return res.status(200).json({ message: "Success" });
    });
  });
});

router.get("/list", async (req, res) => {
  OEMOrder.find({})
    .populate("warehouse_for_qty")
    .populate("submitted_user")
    .populate({
      path: "warehouse_for_qty",
      populate: {
        path: "type",
        model: "warehouse_location_type",
      },
    })
    .exec(function (err, docs) {
      return res.json(docs);
    });
});

router.get("/get", async (req, res) => {
  OEMOrder.findOne({ _id: req.query._id })
    .populate("warehouse_for_qty")
    .populate("submitted_user")
    .populate({
      path: "warehouse_for_qty",
      populate: {
        path: "type",
        model: "warehouse_location_type",
      },
    })
    .exec(async function (err, doc) {
      let warehouse = doc.warehouse_for_qty;
      let order_details = doc;
      let products = await Product.find({});
      let product_list = await Promise.all(
        products.map(async (product) => {
          let meta = await OEMOrderMeta.findOne({
            product_id: product._id,
            oem_order: doc._id,
          });
          let parts_list = await Promise.all(
            product.parts.map(async (part_id, index) => {
              let part = await Parts.findOne({ _id: part_id })
                .populate("UM")
                .populate("type")
                .populate("supplier_id");
              return {
                ...part._doc,
                quantity: parseFloat(product.parts_qty[index]) * meta.order_qty,
              };
            })
          );
          return {
            parts_list: parts_list,
            quantity: meta.order_qty,
            upc: product.upc,
            fnsku: product.fnsku,
            design: product.design,
            name: product.name,
          };
        })
      );
      return res.status(200).json({ warehouse, order_details, product_list });
    });
});

router.get("/list", async (req, res) => {
  OEMOrder.find({})
    .populate("warehouse_for_qty")
    .populate("submitted_user")
    .populate({
      path: "warehouse_for_qty",
      populate: {
        path: "type",
        model: "warehouse_location_type",
      },
    })
    .exec(function (err, docs) {
      return res.json(docs);
    });
});

router.post("/download", async (req, res) => {
  OEMOrder.find({
    _id: {
      $in: req.body.ids,
    },
  })
    .populate("warehouse_for_qty")
    .populate("submitted_user")
    .populate({
      path: "warehouse_for_qty",
      populate: {
        path: "type",
        model: "warehouse_location_type",
      },
    })
    .exec(async function (err, docs) {
      let parts_list = [];
      let products = await Product.find({});
      let product_list = await Promise.all(
        products.map(async (product, product_index) => {
          let quantity = 0;
          let parts = await Parts.find({
            _id: {
              $in: product.parts,
            },
          })
            .populate("UM")
            .populate("type")
            .populate("supplier_id");
          // console.log(parts);
          let meta = await OEMOrderMeta.find({
            product_id: product._id,
            oem_order: {
              $in: req.body.ids,
            },
          });
          let part_quantity = 0;
          meta.map((item) => {
            parts.map((part, part_index) => {
              part_quantity = product.parts_qty[part_index] * item.order_qty;
              parts_list.push({
                _id: part._id,
                ID: part.ID,
                name: part.name,
                type: part.type.name,
                UM: part.UM.name,
                cost: part.cost_usd,
                supplier_id: part.supplier_id.ID,
                supplier_name: part.supplier_id.name,
                quantity: part_quantity,
              });
            });
            quantity += item.order_qty;
          });

          return { upc: product.upc, fnsku: product.fnsku, name: product.name, design: product.design, quantity };
        })
      );
      let order_details = await Promise.all(
        docs.map((doc) => {
          return {
            ID: doc.ID,
            date_created: doc.created_at,
            user: doc.submitted_user.name,
          };
        })
      );
      let warehouse_details = await Promise.all(
        docs.map((doc) => {
          return {
            ID: doc.ID,
            type: doc.warehouse_for_qty.type.name,
            region: doc.warehouse_for_qty.region,
            country: doc.warehouse_for_qty.country,
            name: doc.warehouse_for_qty.name,
          };
        })
      );
      let grouped_parts = [];
      parts_list.reduce(function (res, value) {
        if (!res[value._id]) {
          res[value._id] = {
            _id: value._id,
            quantity: 0,
            ID: value.ID,
            name: value.name,
            type: value.type,
            UM: value.UM,
            cost: value.cost,
            supplier_id: value.supplier_id,
            supplier_name: value.supplier_name,
          };
          grouped_parts.push(res[value._id]);
        }
        res[value._id].quantity += value.quantity;
        return res;
      }, {});
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Order Details");
      worksheet.columns = [
        { header: "ID", key: "ID", width: 25 },
        { header: "Date Created", key: "date_created", width: 25 },
        { header: "User", key: "user", width: 25 },
      ];
      
      // Add Array Rows
      worksheet.addRows(order_details);
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'cccccc' }
      }
      let worksheet1 = workbook.addWorksheet("Warehouse");
      worksheet1.columns = [
        { header: "ID", key: "ID", width: 25 },
        { header: "Type", key: "type", width: 25 },
        { header: "Region", key: "region", width: 25 },
        { header: "Country", key: "country", width: 25 },
        { header: "Name", key: "name", width: 25 },
      ];
      worksheet1.addRows(warehouse_details);
      worksheet1.getRow(1).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'cccccc' }
      }
      
      let worksheet2 = workbook.addWorksheet("Product List");
      worksheet2.columns = [
        { header: "Quantity", key: "quantity", width: 25 },
        { header: "UPC", key: "upc", width: 25 },
        { header: "FNSKU", key: "fnsku", width: 25 },
        { header: "Design", key: "design", width: 25 },
        { header: "Name", key: "name", width: 25 },
      ];
      worksheet2.addRows(product_list);
      
      worksheet2.getRow(1).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'cccccc' }
      }

      let worksheet3 = workbook.addWorksheet("Parts List");
      worksheet3.columns = [
        { header: "Quantity", key: "quantity", width: 25 },
        { header: "ID", key: "ID", width: 25 },
        { header: "Part Name", key: "name", width: 25 },
        { header: "Type", key: "type", width: 25 },
        { header: "UM", key: "UM", width: 25 },
        { header: "Cost", key: "cost", width: 25 },
        { header: "Supplier ID #", key: "supplier_id", width: 25 },
        { header: "Supplier Name #", key: "supplier_name", width: 25 },
      ];
      worksheet3.addRows(grouped_parts);

      worksheet3.getRow(1).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'cccccc' }
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "tutorials.xlsx"
      );
      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    });
});

module.exports = router;

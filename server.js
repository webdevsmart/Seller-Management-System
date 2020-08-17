const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const products = require("./routes/api/products");
const product_category = require("./routes/api/product_category");
const product_variation = require("./routes/api/product_variation");
const parts = require("./routes/api/parts");
const parts_um = require("./routes/api/parts_um");
const parts_type = require("./routes/api/parts_type");
const suppliers = require("./routes/api/suppliers");
const supplier_type = require("./routes/api/supplier_type");
const freight = require("./routes/api/freight");
const storage = require("./routes/api/storage");
const misc = require("./routes/api/misc");
const fullfillment = require("./routes/api/fullfillment");

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/product-category", product_category);
app.use("/api/product-variation", product_variation);
app.use("/api/parts", parts);
app.use("/api/parts-um", parts_um);
app.use("/api/parts-type", parts_type);
app.use("/api/suppliers", suppliers);
app.use("/api/supplier-type", supplier_type);
app.use("/api/freight", freight);
app.use("/api/storage", storage);
app.use("/api/misc", misc);
app.use("/api/fullfillment", fullfillment);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const index = require("./routers/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // use middleware to parse form data

app.use(cors());

var PORT = process.env.PORT || 5000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set path for static assets
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", index);

// Custom middleware below to handle errors. This middleware takes precedence to next()
app.use((err, req, res, next) => {
  res.status(404).send("<h2>The path is not valid</h2>");
});

app.listen(PORT, () => console.log("Server running on port", PORT));

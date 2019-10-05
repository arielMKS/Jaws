const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

app.use(bodyParser.json());

app.use(cors());

if (process.env.JAWSDB_URL) {
  console.log("======jasws firing");
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  console.log("=====nope ===");
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "My_mysql1",
    database: "db2"
  });
}

connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");

  app.get("/", function(req, res) {
    connection.query("SELECT * FROM Cars", function(error, results, fields) {
      if (error) throw error;
      // console.log("The solution is: ", results[0]);
      console.log("The solution is: ", results);
      res.json(results);
    });
  });
});

// connection.end();

// Custom middleware below to handle errors. This middleware takes precedence to next()
app.use((err, req, res, next) => {
  res.status(404).send("<h2>The path is not valid</h2>");
});

app.listen(5000, () => console.log("Server running..."));

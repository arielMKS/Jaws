const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const path = require("path");

app.use(bodyParser.json());

app.use(cors());

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "My_mysql1",
    database: "db2"
  });
}

var PORT = process.env.PORT || 5000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set path for static assets
app.use(express.static(path.join(__dirname, "public")));

connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server");

  app.get("/", function(req, res) {
    // let post = { Id: 5, Make: "Mitsubishi5" };
    // connection.query("INSERT INTO Cars SET ?", post, function(
    //   error,
    //   results,
    //   fields
    // ) {
    //   if (error) throw error;
    //   // res.json(results.insertId);
    // });

    // connection.query(
    //   "UPDATE Cars SET Make = ? WHERE Id = ?",
    //   ["123", 1],
    //   function(error, results, fields) {
    //     if (error) throw error;
    //   }
    // );

    // connection.query("SELECT * FROM Cars WHERE Id = 1", function(
    //   error,
    //   results,
    //   fields
    // ) {
    //   if (error) throw error;
    //   console.log("The solution is: ", results);
    //   res.json(results);
    // });

    connection.query("SELECT * FROM Cars", function(error, results, fields) {
      if (error) throw error;
      console.log("The solution is: ", results);
      res.json(results);
    });
  }); // end app.get()
}); // end connection

// connection.connect(function(err) {
//   if (err) {
//     return console.error("error: " + err.message);
//   }

//   console.log("Connected to the MySQL server.");
//   app.get("/", function(req, res) {
//     connection.query("SELECT * FROM Cars", function(error, results, fields) {
//       if (error) throw error;
//       console.log("The solution is: ", results);
//       res.json(results);
//     });
//   });
// });

// connection.end();

// Custom middleware below to handle errors. This middleware takes precedence to next()
app.use((err, req, res, next) => {
  res.status(404).send("<h2>The path is not valid</h2>");
});

app.listen(PORT, () => console.log("Server running on port", PORT));

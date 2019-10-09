const express = require("express");
const router = express.Router();
const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  // var env = process.env.NODE_ENV || "development";
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "My_mysql1",
    database: "db1",
    multipleStatements: true
  });
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the MySQL server");
});

// endpoint to inform client if app is on production or development mode
router.get("/mode", function(req, res) {
  if (process.env.JAWSDB_URL) {
    console.log("We are on Production mode...");
    res.json("production");
  }
});

// DELETE HERE
router.delete("/car/:Id", function(req, res) {
  const id = req.params.Id;

  connection.query("DELETE from Cars WHERE Id=" + id, function(error, results) {
    if (error) {
      throw error;
    }

    return results;
  });
  console.log("After delete", req.method, req.url);
  // res.redirect("/"); // not going to home page as desired
});

// CREATE (POST)
router.post("/car", function(req, res) {
  let currentCount;
  let post;
  let make = req.body.Make;

  function insertNewRecord() {
    // query to get highest Id, which is the last record
    const promise = new Promise((resolve, reject) => {
      connection.query("SELECT * FROM Cars ORDER BY Id DESC LIMIT 1;", function(
        error,
        results
      ) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
    return promise;
  }

  insertNewRecord()
    .then(res => {
      currentCount = res[0] ? res[0].Id : 0; // set to 0 if table is empty otherwise error
      post = { Id: currentCount + 1, Make: make }; // create new record

      connection.query("INSERT INTO Cars SET ?", post, function(
        error,
        results
      ) {
        if (error) throw error;
      });
    })
    .catch(err => console.log("Ariel Error!!!!"));

  res.redirect("/"); // go back to home page
});

// READ ALL (GET)
router.get("/", function(req, res) {
  console.log("This is the Home page");
  connection.query("SELECT * FROM Cars", function(error, results, fields) {
    if (error) throw error;
    res.render("index", { data: results });
  });
});

// connection.end();

module.exports = router;

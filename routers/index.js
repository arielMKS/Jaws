const express = require("express");
const router = express.Router();
const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "My_mysql1",
    database: "db2",
    multipleStatements: true
  });
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the MySQL server");
});

router.post("/car", function(req, res) {
  let currentCount;
  let post;
  let make = req.body.Make;

  function insertCar() {
    const promise = new Promise((resolve, reject) => {
      connection.query("SELECT COUNT(*) FROM Cars", function(error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
    return promise;
  }

  insertCar()
    .then(res => {
      currentCount = res[0]["COUNT(*)"]; // get number of records
      post = { Id: currentCount + 1, Make: make };

      connection.query("INSERT INTO Cars SET ?", post, function(
        error,
        results
      ) {
        if (error) throw error;
      });
    })
    .catch(err => console.log("Ariel Error!!!!"));

  //   connection.query("SELECT COUNT(*) FROM Cars", function(error, results) {
  //     if (error) throw error;
  //     currentCount = results[0]["COUNT(*)"]; // get number of records
  //       post = { Id: parseInt(currentCount) + 1, Make: make };
  //   });

  //   post = { Id: 7, Make: "Mitsubishi7" };
  //   connection.query("INSERT INTO Cars SET ?", post, function(
  //     error,
  //     results,
  //     fields
  //   ) {
  //     if (error) throw error;
  //   });

  res.redirect("/");
});

router.get("/", function(req, res) {
  connection.query("SELECT * FROM Cars", function(error, results, fields) {
    if (error) throw error;
    // console.log("The solution is: ", results);
    //   res.json(results);
    res.render("index", { data: results });
  });
});

// connection.end();

module.exports = router;

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");

const app = express();
const port = 7000;

// Enable CORS for all routes
app.use(cors());

const path = require("path");
const dbFile = path.resolve(__dirname, "dua_main.sqlite");

const db = new sqlite3.Database(dbFile);
const categoryQuery = "SELECT * FROM category";
const subCategoryQuery = "SELECT * FROM sub_category";
const duaQuery = "SELECT * FROM dua";

app.get("/dua", (req, res) => {
  db.all(duaQuery, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(rows);
  });
});
app.get("/sub_category", (req, res) => {
  db.all(subCategoryQuery, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(rows);
  });
});
app.get("/categoryData", (req, res) => {
  db.all(categoryQuery, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

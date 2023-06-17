import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("hello from backend");
});
app.get("/bricks", (req, res) => {
  const q = "SELECT * FROM bricks";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/bricks", (req, res) => {
  const q =
    "INSERT INTO bricks (`title`, `material`, `color`, `price`) VALUES (?)";
  const values = ["Harmony", "Glass", "Black, Blue", "2"];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product created Successfully");
  });
});
app.get("/bricks/price", (req, res) => {
  db.query("SELECT * FROM bricks ORDER BY price", function (err, data) {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/bricks/search", (req, res) => {
  db.query(
    `SELECT * FROM bricks WHERE title LIKE '%${req.query.value}%'`,
    function (err, data) {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});
app.listen(8800, () => {
  console.log("connected to the backend");
});

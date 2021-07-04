const { query } = require("express");
const express = require("express");
const { release } = require("os");
const app = express();
const { Pool, Client } = require("pg");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const insertHotel ="INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3);";
const hotelYaexiste = "select * from hotels h where name = $1;";
const UpdateHotel = "update hotels set name=$1 , rooms=$2 , postcode =$3 where id= $4;"
const delHotel = "delete from hotels where id = $1;";
const delbooking = "delete from bookings where hotel_id = $1;";


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_hotels",
  password: "Santiago.11",
  port: 5432,
});

app.get("/hotels", function (req, res) {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query("SELECT * FROM hotels", (err, result) => {
      release();
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      res.json(result.rows);
    });
  });
});

app.post("/hotels", (req, res) => {

  let { name, rooms, postcode } = req.body;
  let value = [name, rooms, postcode];
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query(hotelYaexiste, [name], (err, result) => {
      if (result.rowCount > 0) {
        res.send(name + " ya está registrado");
      }
    });

    client.query(insertHotel, value, (err, result) => {
      release();
      res.send("yeah!!");
    });
  });
});


app.put("/hotels", function (req, res) {
  let { id, name, rooms, postcode } = req.body;
  let value = [name, rooms, postcode, id];
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query(UpdateHotel, value, (err, result) => {
      if (result.rowCount > 0) {
        res.status(201).send("1 linea ha sido actualizada");
      } else {
        res.status(404).send("BAD REQUEST");
      }
    });
  });
});

app.delete("/hotels/:hotelId", function (req, res) {
  let idHotel = parseInt(req.params.hotelId);

  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query(delbooking, [idHotel], (err, result) => {
      client.query(delHotel, [idHotel], (err, result) => {
        if (result.rowCount > 0) {
          res.status(201).send("1 linea ha sido actualizada");
        } else {
          res.status(404).send("BAD REQUEST");
        }
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});


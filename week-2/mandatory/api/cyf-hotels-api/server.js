const { query } = require("express");
const express = require("express");
const app = express();


const server = app.listen(3000, function() {
    console.log(`Server is listening on port 3000 . Ready to accept requests! http:localhost:${server.address().port}`);
});




const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_hotels',
    password: 'Santiago.11',
    port: 5432
});

app.get("/hotels", function(req, res) {
    pool.query('SELECT * FROM hotels', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/customers/:customerId", function(req, res){
    const customerId = parseInt(req.params.customerId);
  
    if (isNaN(customerId) && customerId > 0){
       res.status(500).send({message: 'Parameter must be a number'})
      
    } else
    pool.query(`SELECT * FROM customers where id = ${customerId}`, (error,result) =>{
        res.json(result.rows);
    });
})
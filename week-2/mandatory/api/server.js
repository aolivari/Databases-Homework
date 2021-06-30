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
    database: 'E-commerce',
    password: 'Santiago.11',
    port: 5432
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/products", function(req, res) {
    pool.query(`Select s.supplier_name , p.product_name 
                from products p 
                join suppliers s on p.supplier_id = s.id`, (error, result) => {
        res.json(result.rows);
    });
});

app.get("/products/:productId", function(req, res){
    const productId = parseInt(req.params.productId);
  
    if (productId && productId > 0){
        pool.query(`Select s.supplier_name , p.product_name 
            from products p 
            join suppliers s on p.supplier_id = s.id where p.id= ${productId}`, (error,result) =>{
            res.json(result.rows);
            
        });        
        } else
        res.status(400).send({message: 'Parameter must be a number'})
    
})


const { query } = require("express");
const express = require("express");
const app = express();
const { sqlmaster, sqlFunctions } = require("./forms");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(3000, function () {
  console.log(
    `Server is listening on port 3000 . Ready to accept requests! http:localhost:${server.address().port
    }`
  );
});

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "E-commerce",
  password: "Santiago.11",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

//If you don't have it already, add a new GET endpoint /products to load all the product names along with their supplier names.
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

//Update the previous GET endpoint /products to filter the list of
//products by name using a query parameter, for example /products?name=Cup.
//This endpoint should still work even if you don't use the name query parameter!
app.get("/suppliers/:productName", function (req, res) {
  let prodID = sqlmaster.mayusculas(req.params.productName);
  pool.query(
    `select * from products p 
                where product_name like '${prodID}%'`,
    (error, result) => {
      console.log(result.rowCount);
      if (result.rowCount < 1) {
        res.status(400).send({
          message: "El producto " + prodID + " no se ha podido encontrar",
        });
      } else res.json(result.rows);
    }
  );
});


app.get("/products", function (req, res) {
  pool.query(
    `Select s.supplier_name , p.product_name 
                from products p 
                join suppliers s on p.supplier_id = s.id`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.get("/products/:productId", function (req, res) {
  const productId = parseInt(req.params.productId);

  if (productId > 0) {
    pool.query(
      `Select s.supplier_name , p.product_name 
            from products p 
            join suppliers s on p.supplier_id = s.id where p.id= ${productId}`,
      (error, result) => {
        res.json(result.rows);
      });
  } else res.status(400).send({ message: "Parameter must be a number" });
});

// Add a new GET endpoint /customers/:customerId to load a single customer by ID.

app.get("/customers/:customersId", function (req, res) {
  let custId = parseInt(req.params.customersId);
  if (custId > 0) {
    pool.query(
      `select c."name" from customers c where c.id =${custId};`,
      (error, result) => {
        res.json(result.rows);
      }
    );
  } else res.status(400).send({ message: "Parameter must be a number" });
});

// - Add a new POST endpoint /customers to create a new customer.

app.post("/customers/", (req, res) => {
  let { name, address, city, country } = req.body;
  let value = [name, address, city, country];
  if (!name || !address || !city || !country) {
    return res.send('chequear si se ha completado todos los valores name, adress, city y country')
  }
  pool.connect((error, client, release) => {
    sqlFunctions.poolfunction(error)
    client.query(sqlmaster.createCustomer, value, (err, result) => {
      release();

      if (err) {
        return res.status(404).json('el usuario no se ha creado con exito')
      }
      res.send("El usuario " + name + " se ha registrado con éxito");
    });
  });
});

/*  Add a new POST endpoint /products to create a new product 
    (with a product name, a price and a supplier id). 
    Check that the price is a positive integer 
    and that the supplier ID exists in the database, 
    otherwise return an error.
*/


app.post("/products", (req, res) => {
  let { productName, unitPrice, supplierId } = req.body;
  let values = [productName, unitPrice, supplierId];
  pool.connect((error, client, release) => {
    sqlFunctions.poolfunction(error)
    client.query(sqlmaster.checkSIdValid, [supplierId], (err, result) => {
      let num = result.rowCount
      if (num === 0) {
        console.log(num)
        res.send("no esta registrado")
      }
    });
    client.query(sqlmaster.crearProduct, values, (error, result) => {
      release();
      res.send('producto creado con éxito');
    });

  });
});



/*- Add a new POST endpoint /customers/:customerId/orders 
    to create a new order (including an order date, 
    and an order reference) for a customer. 
    Check that the customerId corresponds to an 
    existing customer or return an error.
*/

app.post("/customers/:customerId/orders", (req, res) => {
  let id = parseInt(req.params.customerId);
  let { order_date, order_reference } = req.body;
  let newOrderValues = [order_date, order_reference, id];
  pool.connect((error, client, released) => {
    client.query(sqlmaster.checkCustomer, [id], (error, result) => {
      if (result.rowCount === 0) {
        released()
        res.status(400).send("id no existe");
      } else {
        client.query(sqlmaster.newOrder, newOrderValues, (error, result) => {
          released()
          res.status(200).send('nueva orden ingresada con exito')
        })
      }
    });

  });
});

/* Add a new PUT endpoint /customers/:customerId 
   to update an existing customer (name, address, city and country).
*/


app.put("/customers/:customerId", (req, res) => {
  id = parseInt(req.params.customerId)
  let { name, address, city, country } = req.body;
  values = [name, address, city, country, id]
  if (isNaN(id) || id < 0) {
    res.status(401).send('el valor debe de ser un numero mayor que cero')
    return
  }
  pool.connect((error, client, released) => {
    sqlFunctions.poolfunction(error)
    client.query(sqlmaster.checkCustomer, [id], (error, result) => {
      if (result.rowCount === 0) {
        released()
        res.json('No existe el usuario numero ' + id)
      }
    })
    client.query(sqlmaster.updtCustomer, values, (error, result) => {
      console.log(result.rowCount)
      if (result.rowCount !== 0) {
        released()
        res.json('el usuario numero ' + id + " ha sido modificado con exito")
      }
    })
  })
})

/*Add a new DELETE endpoint /orders/:orderId to delete an 
  existing order along all the associated order items.
*/


app.delete('/orders/:orderId', (req, res) => {
  id = parseInt(req.params.orderId)
  if (isNaN(id) || id < 0) {
    res.status(401).send('el valor debe de ser un numero mayor que cero')
    return
  }
  pool.query(sqlFunctions.del("order_items", "order_id"), [id], (error, result) => {
    console.log(result.rowCount)
  })
  pool.query(sqlFunctions.del("orders", "id"), [id], (error, result) => {
    console.log(result.rowCount)
    res.status(201).send(`la order id ${id} ha sido eliminada de la tabla Orders`);
  })
})
/*Add a new DELETE endpoint /customers/:customerId
 to delete an existing customer only if this 
 customer doesn't have orders.
*/


app.delete('/customers/:customerId', (req, res) => {
  id = parseInt(req.params.customerId)
  sqlFunctions.checkValID(id)
  pool.connect((error, client, released) => {
    sqlFunctions.poolfunction(error)
    client.query(sqlFunctions.select('orders', 'customer_id'), [id], (error, result) => {
      if (result.rowCount > 0) {
        released()
        return res.status(401).send(`Hay ${result.rowCount} ordenes asociadas al customer con id ${id}`)
      } else client.query(sqlFunctions.select('customers', 'id'), [id], (error, result) => {
        if (result.rowCount === 0) {
          released()
          return res.status(201).send(`El usuario con id ${id} no se encuentra en la tabla customers`)
        } else client.query(sqlFunctions.del('customers', 'id')[id], (error, result) => {
          released()
          return res.status(201).send(`El usuario con id ${id} ha sido eliminado de la tabla Customers`)
        })
      })
    })
  })
})

/*Add a new GET endpoint /customers/:customerId/orders to load all the orders along the items in the orders 
  of a specific customer. Especially, the following information should be returned: 
  order references, order dates, product names, unit prices, suppliers and quantities.
*/
//todas las ordenes con los item orders de un user_id 
app.get('/customers/:customerId/orders', (req, res) => {
  id = parseInt(req.params.customerId)
  sqlFunctions.checkValID(id)
  pool.connect((error, client, released) => {
    sqlFunctions.poolfunction(error)
    client.query(sqlFunctions.select("customers", "id"), [id], (error, result) => {
      if (result.rowCount === 0) {
        released()
        return res.send(`El ID ${id}, no esta asociado a ningun usuario`)
      } else client.query(sqlmaster.orderDetails, [id], (error, result) => {
        if (result.rowCount > 0) {
          return res.send(result.rows)
        }
        if (result.rowCount === 0) {
          released()
          client.query(sqlFunctions.select('customers', 'id'), [id], (error, result) => {
            return res.send(`el usuario ${result.rows[0].name} no tiene ninguna orden aún`)
          })
        }
      })

    })
  })
})







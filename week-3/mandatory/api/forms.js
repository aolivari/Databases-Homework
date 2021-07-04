


module.exports = {

  sqlFunctions:{
    mayusculas : (params) => {
      let params2 = params.toLowerCase();
      //si params invcluye " "crea o utiliza split para separa en cuantos array haya espacios y de ahi modificar cada palabra inicial
      return params[0].toUpperCase() + params2.slice(1);
    },
    del : (from, where) => {
      const deleteSql = `delete from ${from} 
                         where ${where} =$1;`;
      return deleteSql;
    },
    select : (from, where) => {
      const selectSql = `select * from ${from} 
                         where ${where} =$1;`;
      return selectSql;
    },
    joint:(where,joint,repeatvalue1,repeatvalue2)=>{ 
     const joint1 = `select * from ${where} a 
                    join ${join} b on a.${repeatvalue1} = b.${repeatvalue2} `
      return joint1              
    },
    checkValID : (params) => {
        if (isNaN(id) || id < 0) {
            res.status(401).send("el valor debe de ser un numero mayor que cero");
            return;
        }
    },

    poolfunction : (error)=>{
      if (error) {
       return console.error("Error acquiring client", err.stack);
      }
    }
  },
  

  sqlmaster:{
    createCustomer:"insert into customers (name,address,city,country)values($1,$2,$3,$4);",
    checkSIdValid : "select * from products p where p.supplier_id = $1;",
    createCustomer:"insert into customers (name,address,city,country)values($1,$2,$3,$4);",
    crearProduct :  "insert into products (product_name,unit_price,supplier_id) values($1,$2,$3);",
    crearProduct : "insert into products (product_name,unit_price,supplier_id) values($1,$2,$3);",
    newOrder : `insert into orders (order_date,order_reference,customer_id) 
                values($1,$2,$3);`,
    checkCustomer : "select * from customers c where c.id =$1;",
   updtCustomer : `update customers 
                    set name = $1, 
                    address = $2,
                    city =$3, 
                    country =$4
                    where id= $5;`,
    orderDetails : `select o.order_reference , o.order_date , p.product_name , p.unit_price , oi.quantity from orders o 
    join order_items oi on o.id = oi.order_id join products p on oi.product_id = p.id 
    where customer_id = $1;`
  }
}










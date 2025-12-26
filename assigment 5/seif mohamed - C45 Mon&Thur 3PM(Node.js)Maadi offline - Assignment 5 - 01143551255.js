const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "SQL_APIs",
});

const tables = {
  Suppliers: `
    CREATE TABLE IF NOT EXISTS Suppliers (
      SupplierID INT PRIMARY KEY AUTO_INCREMENT,
      SupplierName TEXT,
      ContactNumber TEXT
    )
  `,
  Products: `
    CREATE TABLE IF NOT EXISTS Products (
      ProductID INT PRIMARY KEY AUTO_INCREMENT,
      ProductName TEXT,
      Price FLOAT,
      StockQuantity INT,
      SupplierID INT NOT NULL,
      FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
    )
  `,
  Sales: `
    CREATE TABLE IF NOT EXISTS Sales (
      SaleID INT PRIMARY KEY AUTO_INCREMENT,
      ProductID INT NOT NULL,
      QuantitySold INT NOT NULL,
      SaleDate DATE NOT NULL,
      FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
    )
  `,
};


//1- Create the required tables for the retail store database based on the tables structure and relationships.
app.post("/create-table/:name", (req, res) => {
  const { name } = req.params;

  if (!tables[name]) {
    return res.status(400).json({ message: "TABLE NOT FOUND" });
  }

  db.execute(tables[name], (error) => {
    if (error) {
      return res.status(500).json({ message: "server error", error });
    }
    return res.status(201).json({ message: `${name} CREATED` });
  });
});


//2- Add a column “Category” to the Products table.
app.put("/products/add-category", (req, res) => {
  db.execute("ALTER TABLE Products ADD Category VARCHAR(50)", (error) => {
    if (error) return res.status(500).json({ message: "server error", error });
    res.json({ message: "CATEGORY ADDED" });
  });
});

//3- Remove the “Category” column from Products. (0.5
app.put("/products/drop-category", (req, res) => {
  db.execute("ALTER TABLE Products DROP COLUMN Category", (error) => {
    if (error) return res.status(500).json({ message: "server error", error });
    res.json({ message: "CATEGORY DROPPED" });
  });
});


//4- Change “ContactNumber” column in Suppliers to VARCHAR (15).
app.put("/suppliers/modify-contact", (req, res) => {
  db.execute(
    "ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15)",
    (error) => {
      if (error)
        return res.status(500).json({ message: "server error", error });
      res.json({ message: "CONTACT MODIFIED" });
    }
  );
});


//5- Add a NOT NULL constraint to ProductName.
app.put("/products/modify-name", (req, res) => {
  db.execute(
    "ALTER TABLE Products MODIFY ProductName VARCHAR(100) NOT NULL",
    (error) => {
      if (error)
        return res.status(500).json({ message: "server error", error });
      res.json({ message: "NAME MODIFIED" });
    }
  );
});


//6a- Add supplier 'FreshFoods'
app.post("/supplier/add", (req, res) => {
  const { SupplierName, ContactNumber } = req.body;

  const sql = `
    INSERT INTO Suppliers (SupplierName, ContactNumber)
    VALUES (?, ?)
  `;

  db.execute(sql, [SupplierName, ContactNumber], (error, data) => {
    if (error) return res.status(500).json({ message: "server error", error });
    res.status(201).json({ message: "SUPPLIER ADDED", data });
  });
});

//6b- Insert Milk, Bread, Eggs products
app.post("/products/add", (req, res) => {
  const sql = `
    INSERT INTO Products (ProductName, SupplierID, Price, StockQuantity)
    VALUES 
    ('Milk',1,15,50),
    ('Bread',1,10,30),
    ('Eggs',1,20,40)
  `;

  db.execute(sql, (error, data) => {
    if (error) return res.status(500).json({ message: "server error", error });
    res.status(201).json({ message: "PRODUCTS ADDED", data });
  });
});

//6c- Add sale of 2 units of Milk on 2025-05-20
app.post("/sales/add", (req, res) => {
  const sql = `
    INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
    VALUES (1,2,'2025-05-20')
  `;

  db.execute(sql, (error, data) => {
    if (error) return res.status(500).json({ message: "server error", error });
    res.status(201).json({ message: "SALE ADDED", data });
  });
});

//7- Update the price of 'Bread' to 25.00.
app.put("/products/update-price", (req, res) => {
  db.execute(
    "UPDATE Products SET Price = 25 WHERE ProductName = 'Bread'",
    (error, data) => {
      if (error)
        return res.status(500).json({ message: "server error", error });
      res.json({ message: "PRICE UPDATED", data });
    }
  );
});

//8- Delete the product 'Eggs'.
app.delete("/products/delete-eggs", (req, res) => {
  db.execute(
    "DELETE FROM Products WHERE ProductName = 'Eggs'",
    (error, data) => {
      if (error)
        return res.status(500).json({ message: "server error", error });
      res.json({ message: "EGGS DELETED", data });
    }
  );
});

//9- Retrieve the total quantity sold for each product.
app.get("/sales/QuantitySold", (req, res) => {
  const sql = `
    SELECT ProductName, SUM(QuantitySold) AS total_quantity_sold
    FROM Products
    INNER JOIN Sales ON Products.ProductID = Sales.ProductID
    GROUP BY ProductName
  `;

  db.execute(sql, (error, data) => {
    if (error)
      return res.status(500).json({ message: "server error", error });
    res.json(data);
  });
});

//10- Get the product with the highest stock.
app.get("/products/max-stock", (req, res) => {
  db.execute(
    "SELECT ProductName, MAX(StockQuantity) AS MAX_STOCK FROM Products",
    (error, data) => {
      if (error)
        return res.status(500).json({ message: "server error", error });
      res.json(data);
    }
  );
});


//11- Find suppliers with names starting with 'F'.
app.get("/suppliers/f", (req, res) => {
  db.execute(
    "SELECT SupplierName FROM Suppliers WHERE SupplierName LIKE 'F%'",
    (error, data) => {
      if (error)
        return res.status(500).json({ message: "server error", error });
      res.json(data);
    }
  );
});

//12- Show all products that have never been sold.
app.get("/products/unsold", (req, res) => {
  const sql = `
    SELECT ProductName FROM Products
    WHERE ProductID NOT IN (SELECT ProductID FROM Sales)
  `;

  db.execute(sql, (error, data) => {
    if (error)
      return res.status(500).json({ message: "server error", error });
    res.json(data);
  });
});

//13- Get all sales along with product name and sale date.
app.get("/sales/details", (req, res) => {
  const sql = `
    SELECT ProductName, SaleDate
    FROM Products
    INNER JOIN Sales ON Products.ProductID = Sales.ProductID
  `;

  db.execute(sql, (error, data) => {
    if (error)
      return res.status(500).json({ message: "server error", error });
    res.json(data);
  });
});

//14- Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables.
app.post("/permissions/create-user", (req, res) => {
  const createUserSQL = `
    CREATE USER IF NOT EXISTS 'store_manager'
    IDENTIFIED BY '123'
  `;

  db.execute(createUserSQL, (error) => {
    if (error)
      return res.status(500).json({ message: "server error", error });

    const grantSQL = `
      GRANT SELECT, INSERT, UPDATE
      ON SQL_APIs.*
      TO 'store_manager'
    `;

    db.execute(grantSQL, (error) => {
      if (error)
        return res.status(500).json({ message: "server error", error });

      res.status(201).json({
        message:
          "store_manager CREATED with SELECT, INSERT, UPDATE permissions",
      });
    });
  });
});

//15- Revoke UPDATE permission from “store_manager”.
app.put("/permissions/revoke-update", (req, res) => {
  const sql = `
    REVOKE UPDATE
    ON SQL_APIs.*
    FROM 'store_manager'
  `;

  db.execute(sql, (error) => {
    if (error)
      return res.status(500).json({ message: "server error", error });

    res.json({
      message: "UPDATE permission REVOKED from store_manager",
    });
  });
});

//16- Grant DELETE permission to “store_manager” only on the Sales table.
app.put("/permissions/grant-delete-sales", (req, res) => {
  const sql = `
    GRANT DELETE
    ON SQL_APIs.Sales
    TO 'store_manager'
  `;

  db.execute(sql, (error) => {
    if (error)
      return res.status(500).json({ message: "server error", error });

    res.json({
      message: "DELETE permission GRANTED on Sales table",
    });
  });
});


app.listen(3000, () => {
  console.log("Server running -------------");
});

const db = require('../db/database');

// Function to create the 'todoItems' table
exports.createTodoItemTable = (req, res) => {  
    // SQL query to create the table with necessary columns and foreign key reference
    var sql = `CREATE TABLE IF NOT EXISTS todoItems (
        id INT AUTO_INCREMENT,
        item VARCHAR(255),
        listid INT,
        status BOOLEAN,
        timestamp TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY (listid) REFERENCES todos(id)
    )`;

    // Execute the SQL query to create the table
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Table creation failed");
        }
        return res.status(200).json("Table created");
    });
};

// Function to create a new todo item
exports.createItem = (req, res) => {
    // SQL query to insert a new item into the 'todoItems' table
    var sql = "INSERT INTO todoItems SET ?";

    const listid = req.params.id;
    const timestamp = new Date();
    const { item, status } = req.body;

    // Data to be inserted into the table
    const newItemData = {
        item,
        listid,
        status,
        timestamp
    };

    // Execute the SQL query to insert the new item
    db.query(sql, newItemData, (err, result) => {
        if (err) {
            return res.status(500).json("Item creation failed");
        }
        return res.status(200).json(result);
    });
};

// Function to retrieve all items for a specific list
exports.showItems = (req, res) => {
    // SQL query to select all items associated with a specific list
    var sql = `SELECT * FROM todoItems WHERE listid=${req.params.id}`;

    // Execute the SQL query to retrieve items
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to retrieve items");
        }
        return res.status(200).json(result);
    });
};

// Function to update an existing item's information
exports.updateItem = (req, res) => {
    // SQL query to update an item's information based on its ID
    var sql = `UPDATE todoItems SET item=?, status=?, timestamp=? WHERE id=${req.params.id}`;

    const { item, status } = req.body;

    // Execute the SQL query to update the item
    db.query(sql, [item, status, new Date()], (err, result) => {
        if (err) {
            return res.status(500).json("Failed to update item");
        }
        console.log(result)
        if (result.affectedRows === 0) {
            // No rows were affected, meaning the item with the specified ID was not found
            return res.status(404).json("Item not found");
        }
        return res.status(200).json("Record Updated");
    });
};

// Function to delete an item
exports.deleteItem = (req, res) => {
    // SQL query to delete an item based on its ID
    var sql = `DELETE FROM todoItems WHERE id=${req.params.id}`;

    // Execute the SQL query to delete the item
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to delete item");
        }
        if (result.affectedRows === 0) {
            // No rows were affected, meaning the item with the specified ID was not found
            return res.status(404).json("Item not found");
        }
        return res.status(200).json("Record Deleted");
    });
};

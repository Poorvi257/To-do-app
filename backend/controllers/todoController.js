const db = require('../db/database');

// Function to create the 'todos' table
exports.createTable = (req, res) => {
    // SQL query to create the 'todos' table with necessary columns and foreign key reference
    var sql = `CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT,
        listName VARCHAR(255),
        userId INT,
        timestamp TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY (userId) REFERENCES user(id)
    )`;

    // Execute the SQL query to create the table
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Table creation failed");
        }
        return res.status(201).json("Table created");
    });
};

// Function to create a new list
exports.createList = (req, res) => {
    // SQL query to insert a new list into the 'todos' table
    var sql = "INSERT INTO todos SET ?";

    const userId = req.params.id;
    const timestamp = new Date();
    const { listName } = req.body;

    // Data to be inserted into the table
    const newListData = {
        listName,
        userId,
        timestamp
    };

    // Execute the SQL query to insert the new list
    db.query(sql, newListData, (err, result) => {
        if (err) {
            return res.status(500).json("List creation failed");
        }
        return res.status(200).json(result);
    });
};

// Function to retrieve all lists
exports.showList = (req, res) => {
    // SQL query to select all lists
    var sql = "SELECT * FROM todos";

    // Execute the SQL query to retrieve lists
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to retrieve lists");
        }
        return res.status(200).json(result);
    });
};

// Function to retrieve a single list for a specific user
exports.showSingleList = (req, res) => {
    // SQL query to select a single list associated with a specific user
    var sql = `SELECT * FROM todos WHERE userId=${req.params.id}`;

    // Execute the SQL query to retrieve the single list
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to retrieve list");
        }
        if (result.length === 0) {
            // No list found for the specified user
            return res.status(404).json("List not found");
        }
        return res.status(200).json(result[0]);
    });
};

// Function to update a list's information
exports.updateRecord = (req, res) => {
    // SQL query to update a list's information based on its ID
    var sql = `UPDATE todos SET listName=?, timestamp=? WHERE id=${req.params.id}`;

    const { listName } = req.body;

    // Execute the SQL query to update the list
    db.query(sql, [listName, new Date()], (err, result) => {
        if (err) {
            return res.status(500).json("Failed to update list");
        }
        if (result.affectedRows === 0) {
            // No rows were affected, meaning the list with the specified ID was not found
            return res.status(404).json("List not found");
        }
        return res.status(200).json(result);
    });
};

// Function to delete a list
exports.deleteRecord = (req, res) => {
    // SQL query to delete a list based on its ID
    var sql = `DELETE FROM todos WHERE id=${req.params.id}`;

    // Execute the SQL query to delete the list
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to delete list");
        }
        if (result.affectedRows === 0) {
            // No rows were affected, meaning the list with the specified ID was not found
            return res.status(404).json("List not found");
        }
        return res.status(200).json("Record Deleted");
    });
};

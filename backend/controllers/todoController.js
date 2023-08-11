const db = require('../db/database')

exports.createTable = (req, res) => {  
    var sql = `CREATE TABLE todos (id INT AUTO_INCREMENT, 
                                    listName VARCHAR(255), 
                                    userId INT, 
                                    timestamp TIMESTAMP, 
                                    PRIMARY KEY(id), 
                                    FOREIGN KEY (userId) REFERENCES user(id)
                                )`;  
    db.query(sql, (err, result) => {  
    if (err) throw err;  
    return res.status(201).json("Table created");
    });  
};  

exports.createList = (req, res) => {  
//check if the user exists
    var sql = "INSERT INTO todos SET ?";  
    const userId = req.params.id
    const timestamp = new Date()
    const {listName} = req.body

    db.query(sql, {listName, userId, timestamp}, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
};  

exports.showList = (req, res) => {  
    var sql = "SELECT * FROM todos";  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
};  

exports.showSingleList = (req, res) => {  
    //check if user exists and send msg accordingly
    var sql = `SELECT * FROM todos where userId=${req.params.id}`;  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result[0]);
    });  
};

exports.updateRecord = (req, res) => {  
    //check if the list exists
    var sql = `UPDATE todos SET listName=?, timestamp=? where id=${req.params.id}`;  
    
    const {listName} = req.body

    db.query(sql, [listName, new Date()], (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
}; 

exports.deleteRecord = (req, res) => { 
     //check if the list exists
 
    var sql = `DELETE FROM todos where id=${req.params.id}`;  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json("Record Deleted");
    });  
};
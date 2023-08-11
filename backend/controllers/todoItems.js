const db = require('../db/database')

exports.createTodoItemTable = (req, res) => {  
    var sql = `CREATE TABLE todoItems (id INT AUTO_INCREMENT, 
                                    item VARCHAR(255), 
                                    listid INT,
                                    status BOOLEAN,
                                    timestamp TIMESTAMP, 
                                    PRIMARY KEY(id), 
                                    FOREIGN KEY (listid) REFERENCES todos(id)
                                )`;  
    db.query(sql, (err, result) => {
        if(err) throw Error(err)
        return res.status(200).json("Table created")
    })
};  

exports.createItem = (req, res) => {  
//check if the list exists
    var sql = "INSERT INTO todoItems SET ?";  
    const listid = req.params.id
    const timestamp = new Date()
    const {item, status} = req.body

    db.query(sql, {item, listid, status, timestamp}, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
};  

exports.showItems = (req, res) => {  
    var sql = `SELECT * FROM todoItems WHERE listid=${req.params.id}`;  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
};  

//Can be used for both changing the status alone or the name or both.
exports.updateItem = (req, res) => {  
    //check if the list exists
    var sql = `UPDATE todoItems SET item=?, status=?, timestamp=? where id=${req.params.id}`;  
    
    const {item, status} = req.body

    db.query(sql, [item, status, new Date()], (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
}; 

exports.deleteItem = (req, res) => { 
     //check if the list exists
 
    var sql = `DELETE FROM todoItems where id=${req.params.id}`;  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json("Record Deleted");
    });  
};
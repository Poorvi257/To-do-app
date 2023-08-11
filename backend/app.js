const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// import routes
const user = require('./routes/userRoutes')
const todos = require('./routes/todoRoutes') 
const todoItems = require('./routes/todoItemRoutes')
const migration = require('./routes/migrationRoutes')

//MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json({limit: "5mb"}))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}))
app.use(cors())


//ROUTES MIDDLEWARE
app.use('/api', user)
app.use('/api', todos)
app.use('/api', todoItems)
app.use('/api', migration)

//port
const port = 8000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
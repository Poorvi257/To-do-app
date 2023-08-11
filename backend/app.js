const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./routes/userRoutes')
const todos = require('./routes/todoRoutes') 
const todoItems = require('./routes/todoItemRoutes')

app.use(morgan('dev'))
app.use(bodyParser.json({limit: "5mb"}))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}))
app.use(cors())

app.use('/api', user)
app.use('/api', todos)
app.use('/api', todoItems)

const port = 8000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
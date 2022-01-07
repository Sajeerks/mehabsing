const express = require("express")
const app = express()
const cookieParser = require("cookie-parser") 
// app.use(express.bodyParser());

const errorMiddleware = require("./middleware/error");

app.use(express.json())
app.use(cookieParser())


//Route imports
const product = require('./routes/productRoute')
const user = require("./routes/userRouter")


app.use("/api/v1", product)
app.use("/api/v1", user)




// middleware for error 

app.use(errorMiddleware)

module.exports = app
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser") 
// app.use(express.bodyParser());
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")
// const dotenv = require('dotenv')
const cors = require("cors")
const path  = require('path')

const errorMiddleware = require("./middleware/error");

// dotenv.config({path:"backend/config/config.env"})
//config
if(process.env.NODE_ENV !=="PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"})
}

// app.use(cors)
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileupload())


//Route imports
const product = require('./routes/productRoute')
const user = require("./routes/userRouter")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute") 




app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)

app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",( req, res)=>{
    res.sendfile(path.resolve(__dirname,"../frontend/build/index.html"))
})


// middleware for error 

app.use(errorMiddleware)

module.exports = app
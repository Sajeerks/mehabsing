const app = require("./app")

// const dotenv = require('dotenv')
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")
const path = require("path");

//handling uncaught exception
process.on("uncaughtException", (err)=>{
console.log(`Error :${err}`)
console.log(`shutting down the server due to uncaught expection`)
process.exit(1)
})


//config
if(process.env.NODE_ENV !=="PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"})
}


//connect to database
connectDatabase()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

process.on("unhandledRejection", err=>{
    console.log(`error: ${err.message}`)
    console.log(`shutting down the server`)
 server.close(()=>{
     process.exit(1)
 })
})
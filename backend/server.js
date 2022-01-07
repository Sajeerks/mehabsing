const app = require("./app")

const dotenv = require('dotenv')
const connectDatabase = require("./config/database")


//handling uncaught exception
process.on("uncaughtException", (err)=>{
console.log(`Error :${err}`)
console.log(`shutting down the server due to uncaught expection`)
process.exit(1)
})



dotenv.config({path:"backend/config/config.env"})
//connect to database
connectDatabase()


const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on http://localhost${process.env.PORT}`)
})

process.on("unhandledRejection", err=>{
    console.log(`error: ${err.message}`)
    console.log(`shutting down the server`)
 server.close(()=>{
     process.exit(1)
 })
})
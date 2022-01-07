const mongoose = require("mongoose")
//mongodb+srv://sajeer:0484@cluster0.xiiwt.mongodb.net/Ecommerce?retryWrites=true&w=majority

const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true, })
    .then((data)=>{
    console.log(`MongoDB connected with server :${data.connection.host}`)
})
// .catch((err)=>{
//     console.log(err)
// })

}

module.exports = connectDatabase
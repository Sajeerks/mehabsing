 const Order = require("../models/orderModels")
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


//create new order
exports.newOrder = catchAsyncErrors(async(req,res, next)=>{
    const {shippingInfo, 
        orderItems, paymentInfo,itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body
    console.log("req.body :", req.body)
console.log("shippingInfo :",shippingInfo)
    
    const order = await Order.create({
        shippingInfo,
         orderItems, paymentInfo,itemsPrice, taxPrice, shippingPrice, totalPrice,
        paidAt :Date.now(),
        user : req.user._id
    })
    console.log("order :",order)
    res.status(201).json({
        success:true, 
        order
    })
})


// get single oreder
exports.getSingleOrder = catchAsyncErrors(async(req,res, next)=>{

    const order = await Order.findById(req.params.id).populate("user" , "name email")

    if(!order){
        return next(new ErrorHander("Order not found with this id", 404))
    }
    res.status(200).json({
        success:true, 
        order
    })
})

//get logged in user order
exports.myOrders = catchAsyncErrors(async(req,res, next)=>{

    const orders = await Order.find({user:req.user._id})
  
    res.status(200).json({
        success:true, 
        orders
    })
})

//get all orders ADMIN
exports.myOrders = catchAsyncErrors(async(req,res, next)=>{

    const orders = await Order.find({user:req.user._id})
  
    res.status(200).json({
        success:true, 
        orders
    })
})
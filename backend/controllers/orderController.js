 const Order = require("../models/orderModels")
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


//create new order
exports.newOrder = catchAsyncErrors(async(req,res, next)=>{
    const {shippingInfo, 
        orderItems, 
        paymentInfo,
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
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
   // console.log("ordersin backend myOrders" , orders)
    res.status(200).json({
        success:true, 
        orders
    })
})

//get all orders ADMIN
exports.getAllOrders = catchAsyncErrors(async(req,res, next)=>{

    const orders = await Order.find()
  
    let totalAmount  = 0
    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })
  //  console.log("ordersin backend get all ordders" , orders)
    res.status(200).json({
        success:true, 
        totalAmount,
        orders
    })
})

//UPDATE order status ADMIN
exports.updateOrder = catchAsyncErrors(async(req,res, next)=>{
         console.log("req.boy din update oredr",req.body)

    const order = await Order.findById(req.params.id);
    console.log("order in update order :",order)
    
    if(!order){
        return next(new ErrorHander("Order not found with this id", 404))
    }
  
    if(order.orderStatus === 'Delivered'){
        return next( new ErrorHander("You already delivered this order", 400))
    }
    // console.log("order :",order)


    if(req.body.status === "shipped"){
          order.orderItems.forEach(async (o)=>{
        await updateStock(o.product, o.quantity)
   })

    }
 
 order.orderStatus = req.body.status

 if(req.body.status === "Delivered"){
     order.deliveredAt = Date.now()
 }



await order.save({validateBeforeSave :false})
    res.status(200).json({
        success:true, 
    
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
      //  console.log("product :", product)
       
        if(!product){
            console.log("product with id not found:", id)
            return 
        }
   console.log("  product.Stock before update:",   product.stock)
    product.stock -= quantity;
    console.log("  product.Stock after update:",   product.stock)
    await product.save({ validateBeforeSave: false });
  }




  //delete  all orders ADMIN
exports.deleteOrder = catchAsyncErrors(async(req,res, next)=>{

    const order = await Order.findById(req.params.id)
  
    if(!order){
        return next(new ErrorHander("Order not found with this id", 404))
    }
   await order.remove()


    res.status(200).json({
        success:true, 
        message:`order with id of ${req.params.id} was deleted`
    
    })
})


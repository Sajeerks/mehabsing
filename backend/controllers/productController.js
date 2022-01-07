const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


//cerate product admin
exports.createProduct = catchAsyncErrors(
  async(req, res, next)=>{
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      product,
    });



}
)


//update product -- adminb
exports.updateProduct = catchAsyncErrors(
async(req, res, next)=>{
  let product = await Product.findById(req.params.id)
  if(!product){
    return res.status(500).json({
      success:false,
      message:"Product not found"
    })

  }
  product = await Product.findByIdAndUpdate(req.params.id,req.body, {
    new:true, 
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    sucess:true,
    product
  })
}
)





// Get all product

exports.getAllProducts = catchAsyncErrors(async (req, res)=>{

 const resultsPerPage = 8
 const productCount = await Product.countDocuments()

const apiFeature = new ApiFeatures(Product.find(), req.query).search()
.filter().pagination(resultsPerPage)

 const products = await apiFeature.query
    res.status(200).json({
      success:true, 
      products,
      productCount
    })
}
)

// Delete product
exports.deleteProduct = catchAsyncErrors(async(req,res, next) =>{
  const product = await Product.findById(req.params.id)

  if(!product){
    return res.status(500).json({
      success:false,
      message:"Product not found"
    })
  }

  await product.remove()
  res.status(200).json({
    success:true, 
    message:"Product Deleted succesfully"
  })
})


exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id)

  if(!product){
    return next(new ErrorHander("product not found", 404))

  }
  res.status(200).json({
    success:true, 
    product
  })

})
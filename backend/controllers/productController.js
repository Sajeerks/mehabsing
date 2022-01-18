const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


//cerate product admin
exports.createProduct = catchAsyncErrors( async(req, res, next)=>{

  req.body.user = req.user.id

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


// create new Review or update the review

exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

  const {rating, comment, productId} = req.body
const review = {user:req.user._id, 
               name:req.user.name,
               rating:Number(rating), 
               comment
              }

const product = await Product.findById(productId)
const isReviewed = product.reviews.find(rev=> rev.user.toString()=== req.user._id.toString())

if(isReviewed){
product.reviews.forEach(rev=>{
 if( rev.user.toString()=== req.user._id.toString())
   (rev.rating = rating), (rev.comment = comment)

})


}else{
  product.reviews.push(review)
  product.numOfReviews = product.reviews.length

}
let avg =0
product.reviews.forEach(rev=>{
avg+= Number(rev.rating)
})
// console.log("avg" , avg)
product.ratings = avg/product.reviews.length

await product.save({validateBeforeSave:false})

res.status(200).json({
  success:true
})
})

// get all reviews for a product
exports.getAllProductReviews = catchAsyncErrors(async(req,res,next)=>{
const product = await Product.findById(req.query.id)
if(!product){
  return next(new ErrorHander("Product not found", 404))
}
res.status(200).json({
  sucess:true, 
  reviews:product.reviews,
})

})

// Delete review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId)
  if(!product){
    return next(new ErrorHander("Product not found", 404))
  }

  const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString())
// console.log("reviews :",reviews)
// console.log("req.query.id :",req.query.id)

  let avg =0
  reviews.forEach(rev=>{
  avg+= Number(rev.rating)
  })
  // console.log("avg" , avg)
  const ratings = avg/reviews.length
  const numOfReviews = reviews.length

  await Product.findByIdAndUpdate( req.query.productId, {
    reviews, ratings, numOfReviews
  }, {
    new:true,
    runValidators:true, 
    useFindAndModify:false
  })


  res.status(200).json({
    sucess:true, 
  })

})

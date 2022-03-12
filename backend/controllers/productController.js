const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const Order = require("../models/orderModels")


//cerate product admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log("re=q.bosy in create product" ,req.body)
  // console.log("re=q.bosy in create product" ,req.body.name)
  // console.log("re=q.bosy in create description" ,req.body.description)

  // console.log("re=q.bosy in create price" ,req.body.price)

  // console.log("re=q.bosy in create stock" ,req.body.stock)
  // console.log("re=q.bosy in create iamges" ,req.body.images)

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  console.log("imagesLink  in creating new product:", imagesLink);
  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//update product -- adminb
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  let images = [];
  if (typeof( req.body.images) === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if(images!==undefined){
      // removing photos from cloudnary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    console.log("updated product : ", product.images[i].public_id);
  }

  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

req.body.images= imagesLink
}
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Get all product

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHander(" this is my temp error",500))

  const resultPerPage = 2;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  // .pagination(resultPerPage)
  //console.log("req.query==:", req.query)

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  // let filteredProductsCount = 10;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();
  // products = await apiFeature.query

  // console.log("productsCount :",productsCount)
  // console.log("filteredProductsCount :",filteredProductsCount)

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    sucess: true,
    products,
  });
});

// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  // removing photos from cloudnary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    console.log("deleteProduct : ", product.images[i].public_id);
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted succesfully",
  });
});

async function deleteProductFromOrder(id){
  const orders = await Order.find();
  orders.map(order=>{
    order.orderItems.filter(item=>{
      item.product !==id
    })
  })
}




exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// create new Review or update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  // console.log("avg" , avg)
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all reviews for a product
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  // console.log("req.query :", req.query)

  // console.log("req.query.productId :", req.query.productId)

  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  // console.log("reviews :",reviews)
  // console.log("req.query.id :",req.query.id)

  let avg = 0;
  reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  // console.log("avg" , avg)
  const ratings = avg / reviews.length || 0;
  // console.log("ratings :",ratings)
  // if(ratings ===undefined){
  //   ratings=0
  // }
  // console.log("ratings :",ratings)
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

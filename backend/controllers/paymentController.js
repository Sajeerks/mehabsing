const catchAsyncErrors = require("../middleware/catchAsyncErrors");
//const stripe = require("stripe")("sk_test_51KShtuSGb5BPIhrYDRSOEbqYcTHwSzYdjU9cY228WdzMDhl6uTPLpOVTdDtHdTmxD1OHhFiIhGJKN4W4ADo9OfGz00qM5KMpGB");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { v4: uuidv4 } = require('uuid');
//STRIPE_SECRET_KEY
//STRIPE_API_KEY

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  console.log("amount ib backend start :")
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    // metadata: {
    //   company: "Ecommerece",
    // },
  });
  console.log("amount ib backend processPayment :", amount)
  console.log("myPayment backend processPayment  :", myPayment)

  
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

//////////////////////////
exports.paytry = catchAsyncErrors(async (req, res, next) => {
  
  // console.log("req.body  :",req.body)
  // const {amount , token } = req.body;
  //console.log("4444444444444444444--------stripe :", stripe)
  // console.log("amount",amount);
  // console.log("token",token);
  // console.log("token.email", req.body.email)
  // To avoid duplication for payments
  const idempotencyKey = uuidv4()

  //console.log("idempotencyKey :",idempotencyKey)

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });
  //console.log("paymentIntent :",paymentIntent)
  
  // });
  console.log("paymentIntent.client_secret  :",paymentIntent.client_secret )
  // const customer = await stripe.customers.create({
  //   email:req.body.email,
  //   description: 'My First Test Customer (created for API docs)',
  // });
  // console.log("customer :", customer)

// res.send({
  //   clientSecret: paymentIntent.client_secret,


  res
    .status(200)
    .json({ success: true, client_secret: paymentIntent.client_secret });


   








  // (async () => {
  //   const customer = await stripe.customers.create({
  //     email: 'customer@example.com',
  //   });
  
  //   console.log(customer.id);
  // })();


//   return stripe.customers.create({
//   email:req.body.email,
//   source:token
//   })
//   .then(customer =>{
//   stripe.charger.create({
//   // amount: product.price * 100,
//   amount: amount*100, // amount in cents, again
//   currency: "usd",
//   // customer:customer.id,
//   // receipt_email: token.email,

//   },{idempotencyKey})
//   console.log("suctomer",customer)

// })
//   .then(result => res.status(200).json(result))

//   .catch(err => {console.log("xxxxx",err)})




  })















exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});


exports.sendSecretKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ secretKey: process.env.STRIPE_SECRET_KEY });
});

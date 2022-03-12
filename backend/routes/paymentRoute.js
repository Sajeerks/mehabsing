const express = require("express");
const { processPayment ,sendStripeApiKey,paytry,sendSecretKey} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticated,processPayment)

router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);
router.route("/secretKey").get(isAuthenticated, sendSecretKey);

router.route("/paytry").post(isAuthenticated, paytry);




module.exports = router;

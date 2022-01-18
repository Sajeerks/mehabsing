const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongoose id error 
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
      }


// Mongoose  duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
      }

// Wrong JWT error
if (err.name === "jsonWebTokenError") {
  const message = `Json web token invlaid try again`;
  err = new ErrorHandler(message, 400);
}

//  JWT expire error
if (err.name === "TokenExpireError") {
  const message = `Json web token expired try again`;
  err = new ErrorHandler(message, 400);
}




    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        amm:"Masha Allah"
      });

};
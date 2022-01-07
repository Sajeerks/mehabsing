const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");
const sentToken = require("../utils/jwtToken");



exports.registerUser = catchAsyncErrors(async(req, res, next)=>{

    const {name,email, password} = req.body

    const user = await User.create({
        name,email, password,
        avatar:{
            public_id:"this is our sample id", 
            url:"profilePic url"
        }
    })

    const token = user.getJWTToken()
    
    sentToken(user, 201, res)
 
    
}

)
exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const {email, password} = req.body
   if(!email || !password){
       return next(new ErrorHander("please enter Email and Passworf", 400))
   }
  const user = await User.findOne({email:email}).select("+password")

  if(!user){
       return next(new ErrorHander("invalid Email and Passworf", 401))
   }
  const isPasswordMatched  = await  user.comparePassword(password)

  if(!isPasswordMatched){
    return next(new ErrorHander("invalid Email and Passworf", 401))
}
const token = user.getJWTToken()
    
sentToken(user, 200, res)






}
)
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");
const sentToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto  = require("crypto")



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
})


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

//Logout user
exports.logout = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
res.status(200).json({
    succes:true, 
    message: "Logout Succesfull"
})

})


// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next)=>{
    const user = await (User.findOne({email:req.body.email}))
    
    if(!user){
        return next( new ErrorHander ("User  not found", 404))
    }

    // Get Rest password token
    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `your password reset token is ${resetPasswordUrl} \n\n if you have not requested this email 
    please ignore this `

    try {

       await sendEmail({
          email: user.email, 
           subject:`Ecommerce  passwword Recovery`, 
           message ,
       })
       res.status(200).json({
           sucess:true,
           message:`Email send to ${user.email} successfully`
       })    
        } catch (error) {
        user.resetPasswordToken= undefined
        user.resetPasswordExpire =undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHander(error.message, 500))
    }

})


exports.resetPassword = catchAsyncErrors(async (req, res, next)=>{

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    
const user = await User.findOne({resetPasswordToken, resetPasswordExpire :{$gt:Date.now()}})
if(!user){
    return next( new ErrorHander ("Reset Password Token is invalid or has expired", 400))
}

if(req.body.password !== req.body.confirmPassword){
    return next( new ErrorHander ("password does not match", 400))
}

user.password = req.body.password
user.resetPasswordToken= undefined
user.resetPasswordExpire =undefined

user.save()
sentToken(user, 200, res)
})

exports.getUserDetails = catchAsyncErrors( async(req, res, next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        succes:true, 
        user
    })

})

exports.updatePassword = catchAsyncErrors( async(req, res, next)=>{
    const user = await User.findById(req.user.id).select("password")

  
    const isPasswordMatched  = await  user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
      return next(new ErrorHander("OLD password is incorrect", 401))
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHander("passwords not match", 401))
  }
  user.password = req.body.newPassword

  await user.save()

  sentToken(user, 200, res)

})


//update Profile page 
exports.updateProfile = catchAsyncErrors( async(req, res, next)=>{
    

    const newUserData ={
        name:req.body.name, 
        email:req.body.email,
       
    }
  //we will add clodinary later
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new:true, 
      runValidators:true,
      userFindAndModify:false
  })

res.status(200).json({
    success:true
})
})




// get all the users(admin)

exports.getAllUsers = catchAsyncErrors( async(req, res, next)=>{
  const users = await User.find()

  res.status(200).json({
      success:true, 
      users,
  })

})


// get all single user (admin)

exports.getSingleUser = catchAsyncErrors( async(req, res, next)=>{
    const user = await User.findById(req.params.id)


if(!user){
    return next(new ErrorHander(`user does not exist with id" ${req.params.id}`, 400))
}

  
    res.status(200).json({
        success:true, 
        user,
    })
  
  })
  


  //update user role  -- Admin
  exports.updateRole = catchAsyncErrors( async(req, res, next)=>{
    

    const newUserData ={
        name:req.body.name, 
        email:req.body.email,
       role:req.body.role
    }
  //we will add clodinary later
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new:true, 
      runValidators:true,
      userFindAndModify:false
  })

res.status(200).json({
    success:true
})
})

// delete user 
exports.deleteUser = catchAsyncErrors( async(req, res, next)=>{
    

      //we will remove clodinary later
 const user = await User.findById(req.params.id)
 if(!user){
     return next(new ErrorHander(`user does not exist with ${req.params.id}`, 400))
 }

await user.remove()
    
res.status(200).json({
    success:true,
    message: `user with id ${req.params.id}  is deleted`
})
})



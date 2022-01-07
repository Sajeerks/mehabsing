const sentToken= (user, statusCode, res)=>{
   
    //creatting a cookie and storing token
    const token = user.getJWTToken();
    
    //option in cookie
    const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
    

       res.status(statusCode).cookie("token", token, options).json({
          success:true, 
          user, 
          token
      })


}

module.exports = sentToken
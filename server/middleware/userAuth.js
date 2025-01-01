const JWT = require('jsonwebtoken');
const {User} = require('../models/userModel')
const dotenv = require('dotenv');
dotenv.config();

const userAuthMiddleware = async(req,res,next)=>{
    try {
        
         const token = req.cookies.token;
         if(!token)
         {
            return res.status(400).json({success:false,message:"Login/Signup first"});
         }

         const tokenData = JWT.decode(token,process.env.JWT_SECRET_KEY);
         const user = await User.findOne({email:tokenData.email});
         if(!user)
         {
            return res.status(400).json({success:false,message:"Signup/Login first"});

         }

         req.user = user;
         next();

    } catch (error) {

        console.log({"UserAuthMiddleware":error.message});
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

module.exports = userAuthMiddleware;
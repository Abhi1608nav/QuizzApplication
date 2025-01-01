const JWT = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const{User,userValidation} = require('../models/userModel');
const dotenv = require('dotenv');
const cloudinary = require('../config/cloudinaryConfig');
const JOI = require('joi');
const sharp = require('sharp');
dotenv.config();

const validateData = (data)=>{
    const schema = JOI.object({
        email:JOI.string().email({minDomainSegments:2,tlds:{allow:['com','net','outlook']}}).required(),
        
    })
    return schema.validate(data);

}

const signUp = async(req,res)=>{
    
    try {
        const {username,email,password,confirmpassword} = req.body;
        if(!username || !email || !password || !confirmpassword)
        {
            return res.status(401).json({data:"All the fields are required "});
        }
        
        let {error} = userValidation({username,password,email});
        console.log(error);
        if(error)
        {
            return res.status(400).json({success:false, message:error.details})
        }
        
       let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({success:false,message:"User is already exited"});
        }

        if(password !==confirmpassword)
        {
           return res.status(400).json({success:false,message:"ConfirmPassword should be same as Password"});
        }
        
        const salt = await Bcrypt.genSalt(10);
        let hashedPassword = await Bcrypt.hash(password,salt);

        user = await User.create({
            username,
            email,
            password:hashedPassword,
            isAdmin:false,
        });

        const token  = JWT.sign({email,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:'3d'});
        const maxAge = 3*24*60*60*1000;
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            maxAge:maxAge,
        });
        
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({success:true,data:userResponse,message:"User Successfully signed up"});


    } catch (error) {
        
        console.error("Sign-up Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }

}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

         if(!email || !password)
         {
            return res.status(401).json({success:false,message:"All credential are required"});
         }
         
        let {error} = validateData({email});
        if(error)
        {
            return res.status(400).json({success:false, message:error.details[0].message})
        }

         let user = await User.findOne({email});
         if(!user)
            {
                return res.status(401).json({success:false, message:" You need to signUp first"});
            }  
            
         let userPassword = user.password;
         let isPasswordMatch = await Bcrypt.compare(password,userPassword);
         if(!isPasswordMatch)
         {
             return res.status(400).json({success:false,message:"enter correct email/password"});
         }

          const userData = user.toObject();
          delete userData.password;

          const token = JWT.sign({email,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:'3d'});
          const maxAge = 3*24*60*60*1000;
          res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            maxAge:maxAge
          });

          res.status(200).json({success:true,data:userData,message:"Logined Successfully"});

    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }
}



const logout = async(req,res)=>{
    try {
        
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(400).json({success:false,message:"Already logged out."});
        }
        res.cookie('token',"",{maxAge:0,httpOnly:true});
        res.status(200).json({success:true,message:"Logged out successfully"});
         
    } catch (error) {

        console.log({"Logout error":error.message});
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
}

const updateProfile = async(req,res)=>{
    try {
        
           const user = req.user;
           const {username,password,confirmPassword}=req.body;

           if(username)
           {
              user.username = username;
           }

           if(password || confirmPassword)
           {
             if(password!==confirmPassword)
             {
                return res.status(400).json({success:false,message:"Password do not match"});
             }

             const salt = await Bcrypt.genSalt(10);
             const hashedPassword = await Bcrypt.hash(password,salt);
             user.password = hashedPassword;

           }

           if (req.file) {
            console.log(req.file);
             
            if(user.profileImg && user.profileImageId)
            {
                 await cloudinary.uploader.destroy(user.profileImageId);
                 console.log("Image is removed from cloudinary")
            }

            user.profileImg = req.file.path;
            user.profileImageId = req.file.filename;

           }

        await user.save();

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:userData,
        })

    } catch (error) {
        console.error({'profile update':error.message});
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


module.exports = {
    signUp,
    login,
    logout,
    updateProfile,
}
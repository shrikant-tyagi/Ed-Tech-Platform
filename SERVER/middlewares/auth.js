const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//auth
exports.auth = async (req,res,next) => {
    try{
        //extract token
        const token = req.header("Authorization").replace("Bearer ","");
        // const token = req.cookie.token;

        //if token is missing
        if(!token){
            return res.status(406).json({
                success:false,
                message:"Token is missing"
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.user = decode;  
        } 
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        } 
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while validating the token'
        })
    }
}

//isStudent
exports.isStudent = async(req,res,next) => {
    try{
       const role = req.user.accountType;

       if(role !== "Student"){
        return res.json({
            success:false,
            messsage:"You are not Student"
        })
       }

       next();
    }
    catch(err){
        res.json({
            success:false,
            message:"Unable to verify the role try again after sometime"
        })
    }
}

//idAdmin
exports.isAdmin = async(req,res,next) => {
    try{
       const role = req.user.accountType;

       if(role !== "Admin"){
        return res.json({
            success:false,
            messsage:"You are not Admin"
        })
       }

       next();
    }
    catch(err){
        res.json({
            success:false,
            message:"Unable to verify the role try again after sometime"
        })
    }
}

//isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
       const role = req.user.accountType;

       if(role !== "Instructor"){
        return res.json({
            success:false,
            messsage:"You are not Instructor"
        })
       }

       next();
    }
    catch(err){
        res.json({
            success:false,
            message:"Unable to verify the role try again after sometime"
        })
    }
}
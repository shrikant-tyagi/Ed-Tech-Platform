const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


//reset password token
exports.resetPasswordToken = async (req,res) => {
    try{
        //get email
        const email = req.body.email;
        console.log(email);

        if(!email){
            return res.json({
                success:false,
                message:"Enter the email"
            })
        }

        const userExist = await User.findOne({email: email});

        if(!userExist){
            return res.json({
                success:false,
                message:"User does not exist"
            })
        }

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration
        userExist.token = token;
        userExist.resetPasswordExpires = Date.now() + 5*60*1000;
        const updatedDetails = await userExist.save();
        //create url
        const url = `http://localhost:3000/updated-password/${token}`;

        //send email containing reset link
        const mailResponse = await mailSender(email , "Reset Password" , `Reset Password Link : ${url}`);
        console.log("Mail Response :" , mailResponse);

        //return response
        return res.json({
            success:true,
            message:"Email send successfully , Please check email",
            token
        })
    }
    catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:"Error occured while sending Link"
        })
    }
}

exports.resetPassword = async (req,res) => {
    try{
        //fetch data
        const {password , confirmPassword , token} = req.body;

        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password donot match"
            })
        }

        //get userDetails from db using token
        const userDetails = await User.findOne({token:token});

        //if no entry - no entry
        if(!userDetails){
            return res.json({
                success:false,
                message:"token is invalid"
            })
        }

        //token time 
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:'Token is expired'
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password , 10);
        userDetails.password = hashedPassword;
        await userDetails.save();
        
        //return response
        return res.json({
            success:true,
            message:"Password Updated Successfully"
        })
    }
    
    catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:"Unable to update password"
        })
    }
}
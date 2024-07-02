const User = require('../models/User');
const Profile = require('../models/Profile');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
require('dotenv').config();

//controller for sending otp
exports.sendOtp = async (req,res) => {
    try{
        //fetching email
        const {email} = req.body;

        //check if user already exist
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.json({
                success:false,
                message:"User already exist"
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        //checking if otp is unique or not
        let result = await OTP.findOne({otp : otp});

        while(result){
            otp = otpGenerator(6 , {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });

            result = await OTP.findOne({otp : otp});
        }

        const otpPayload = {email,otp};

        //create entry for otp
        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:'OTP send successfully',
            otpBody
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
 
//signUp controller
exports.signUp = async(req , res) => {
    try{
        //data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        //validate karna hai
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType) {
            return res.status(403).json({
                success:false,
                message:"Enter value in each field"
            });
        }

        //check user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({
                success:false,
                message:"User already exist"
            })
        }

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Enter password again!!!"
            })
        }

        //find most recent otp
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1); 
        //limit --> maximum number of documents the query will return 
        console.log(recentOtp[0]);

        //validate otp
        if(!recentOtp[0]){
            return res.json({
                success:false,
                message:"OTP not found for current email"
            })
        }

        else if(otp !== recentOtp[0].otp){
            return res.json({
                success:false,
                message:"OTP does not match"
            })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password , 10);

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });

        //create entry in db
        const user = await User.create({
            firstName , lastName , email,
            password:hashedPassword, accountType , 
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        })
    }
    catch(err){
        res.json({
            success:false,
            message:"Unable to register user"
        })
    }
};

//login controller
exports.login = async (req,res) => {
    try{
       //get data fon req body
       const {email , password} = req.body;

       //validate data
       if(!email || !password){
        return res.json({
            success:false,
            message:"Enter all entries"
        })
       }

       //user check exist or not
       const user = await User.findOne({email}).populate('additionalDetails');
       if(!user){
        return res.json({
            success:false,
            message:"not"
        })
       }
       //generate JWT , after password matching
       if(await bcrypt.compare(password , user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType
            } 

            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn:'2h'
            })
            user.token = token;
            user.password = undefined;

            //create cookie and send message
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }

            res.cookie('token' , token , options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In successfully"

            })
        }

        else{
            return res.json({
                success:false,
                message:"Password is Incorrect"
            })
        }
       
    }
    catch(error) {
        console.log(error.messsage);
        return res.status(500).json({
            success:false,
            message:'Unable to login'
        })
    }
};

//change Password
exports.changePassword = async (req,res) => {
    try{
       const {email , password , newPassword , confirmNewPassword} = req.body;

       if(!email || !password || !newPassword || !confirmNewPassword){
        return res.json({
            success:false,
            message:"Enter all entries"
        })
       }

       if(newPassword !== confirmNewPassword){
        return res.json({
            success:false,
            message:"Passwords donot matching"
        })
       }

       const user = await User.findOne({email});
       if(!user){
        return res.json({
            success:false,
            message:"Enter valid Email"
        })
       }

       if(await bcrypt.compare(password , user.password)){
          const newHashedPassword = await bcrypt.hash(newPassword , 10);

          user.password = newHashedPassword;
          const newUser = await user.save();
          const name = user.firstName + " " + user.lastName;
          console.log(name);

          await mailSender(email , "Password Update" , passwordUpdated(email , name));

          return res.json({
            success:true,
            message:"Password Changed Successfully",
            newUser
          })
       }

       return res.json({
        success:false,
        message:"Entered old Password is wrong"
       })
    }
    catch(error){
       return res.json({
        success:false,
        message:"Error while changing Password"
       })
    }
}
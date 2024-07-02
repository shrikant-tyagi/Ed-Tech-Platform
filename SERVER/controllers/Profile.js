const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadFileToCloudinary} = require('../utils/fileUploader');
require('dotenv').config();

exports.updateProfile = async (req,res) => {
    try{
        //get data
        const {dateOfBirth="" , about="" , contactNumber="" , gender=""} = req.body;

        //get userId
        const userId = req.user.id;

        //find profile
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;

        //update profile
        const updatedProfile = await Profile.findByIdAndUpdate(profileId ,{
            gender:gender,
            dateOfBirth:dateOfBirth,
            contactNumber:contactNumber,
            about:about
        },
        {new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Unable to update Profile'
        })
    }
}

exports.deleteAccount = async (req,res) => {
    try{
        //get userId
        const UserId = req.user.id;

        //validation
        const userDetails = await User.findByIdAndDelete(UserId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        //delete Profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user

        return res.status(200).json({
            success:true,
            message:"User Account Deleted Successfully"
        })
    }
    //hw - secheuling delete request (what is crone job - explore)
    catch(err){
        return res.status(500).json({
            success:true,
            message:"Unable to delete account"
        })
    }
}

exports.getAllUserDetails = async (req,res) => {
    try{
    const id = req.user.id;

    const userDetails = await User.findById(id).populate("additionalDetails").exec();

    return res.json({
        success:true,
        message:"User Data fetched Successfully",
        data:userDetails
    })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to fetch user Data"
        })
    }
}

exports.updateDisplayPicture = async (req,res) => {
    try{
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadFileToCloudinary(
            displayPicture,
            "Files",
            1000,
            1000
        )

        const updatedProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new:true}
        )

        res.send({
            success: true,
            message: 'Image Updated Successfully',
            data : updatedProfile
        })
    }

    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getEnrolledCourses = async (req,res) => {
    try{
        const userId = req.user.id
        const userDetails = await User.findOne({
            _id: userId
        })
        .populate('courses')
        .exec()

        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message : `Could not find user`
            })
        }

        return res.status(200).json({
            success:true,
            data: userDetails.courses
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
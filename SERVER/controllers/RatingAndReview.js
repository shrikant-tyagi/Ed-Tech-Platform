const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const mongoose = require('mongoose');

exports.createRating = async (req,res) => {
    try{
       //get user id
       const userId = req.user.id;

       //fetch data from req
       const {courseId , rating , review} = req.body;

       //check if user is enrolled or not
       const course = await Course.findOne(
                                        {_id:courseId,
                                          studentsEnrolled: {$elemMatch: {$eq: userId}}
                                        });

        if(!course){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course'
            });
        }

       //check if user already reviewed
       const alreadyReviewed = await RatingAndReview.findOne({
                                                        user:userId,
                                                        course:courseId
                                                    });
        
        if(alreadyReviewed) {
             return res.status(403).json({
                success:false,
                message:"Course is already reviewed"
             })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId
        });


       //update course with this rating/review
       await Course.findByIdAndUpdate(courseId , 
                                        {
                                            $push:{
                                                ratingAndReviews : ratingReview._id
                                            }
                                        },
                                        {new:true}
                                      );

        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and reviews added successfully",
            ratingReview
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create rating"
        })
    }
}

//get average rating
exports.getAverageRating = async (req,res) => {
    try{
       const courseId = req.body.courseId;

       //calculate average rating
       const result = await RatingAndReview.aggregate([
        {
            $match:{
                course: new mongoose.Types.ObjectId(courseId),
            },
        },
        {
            $group:{
                _id:null,
                averageRating: {$avg : "$rating"}
            }
        }
       ])

       //return rating
       if(result.length > 0) {
        return res.status(200).json({
            success:true,
            averageRating : result[0].averageRating
        })
       }

       //if no rating exist
       return res.status(200).json({
         success:true,
         message:"Average Rating is 0 , no ratings are available"
       })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get all ratings
exports.getAllRatings = async (req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating: "desc"})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                })
                                                .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
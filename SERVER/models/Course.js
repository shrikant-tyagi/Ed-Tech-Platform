const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },

    courseDescription:{
        type:String,
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    whatYouWillLearn:{
        type:String,
    },

    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],

    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],

    price:{
        type:Number,
        required:true
    },

    thumbnail:{
        type:String
    },

    tag: {
        type:[String]
    },

    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },

    instructions: {
        type: [String]
    },

    status: {
        type:String,
        enum: ["Draft" , "Published"]
    }
})

module.exports = mongoose.model("Course" , courseSchema);
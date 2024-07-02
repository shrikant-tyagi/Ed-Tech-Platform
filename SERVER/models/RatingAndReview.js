const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    rating:{
        type:Number
    },

    review:{
        type:String
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        index: true,
        required : true
    }
})

module.exports = mongoose.model("RatingAndReview" , reviewSchema);
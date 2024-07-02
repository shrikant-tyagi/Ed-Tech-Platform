const Course = require('../models/Course');
const User = require('../models/User')
const {uploadFileToCloudinary} = require('../utils/fileUploader');

exports.createCourse = async (req , res) => {
    try{
        //fetch data
        const {courseName , courseDescription , whatYouWillLearn , price , category} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //validate instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        // console.log("Instructor Details : ", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found'
            })
        }

        //Upload to Cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail , process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail:thumbnailImage.secure_url,
        })

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Course created Successfully",
            data:newCourse
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create Course",
            error:error.message
        })
    }
}

//Controller for getting all courses
exports.getAllCourses = async (req,res) => {
    try{
        const allCourses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumnail: true,
                instructor : true,
                ratingAndReviews: true,
                studentEnrolled : true
            }
            )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses
        })
    }
    catch(error){
        console.error(error);
        return res.json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Enter Course Name"
            })
        }

        let courseDetails = await Course.findById(courseId)
                                  .populate(
                                    {
                                        path:"instructor",
                                        populate:{
                                            path:"additionalDetails"
                                        }
                                    }
                                  )
                                  .populate(
                                    {
                                        path:"courseContent",
                                        populate:{
                                            path:"subsection"
                                        }
                                    })
                                  .populate("ratingAndReviews")
                                  .populate("category")
                                  .populate("studentEnrolled")
                                  .exec();

        return res.status(200).json({
            success:true,
            courseDetails
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch course Details"
        })
    }
}
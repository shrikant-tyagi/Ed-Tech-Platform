const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');


//capture the payment and initiate the razorpay
exports.capturePayment = async (req,res) => {
    //get courseId and UserId
    const {course_id} = req.body;
    const userId = req.user.id;

    //validation
    if(!course_id){
        return res.json({
            success:false,
            message:'Please provide valid course Id'
        })
    };

    //valid courseId
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                messsage:'Could not find the course'
            });
        }

        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled"
            })
        }
    }
    catch(error){
         return res.status(500).json({
            success:false,
            meaage:error.message
         })
    }
    
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = instance.orders.create(options);
        console.log(paymentResponse);

        return res.json({
            success:true,
            courseName:course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId:paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        })
    }
    catch(err){
        console.error(err);
        res.json({
            success:false,
            message:"could not initiate order"
        })
    }
}

//verfiy signature of razorpay and server
exports.verifySignature = async (req,res) => {
    const webHookSecret = "12345678";
    
    //signature from razorpay
    const signature = req.headers["x-razorpay-signature"];

    const shaSum = crypto.createHmac("sha256" , webHookSecret);
    shaSum.update(JSON.stringify(req.body));
    const digest = shaSum.digest("hex");
    
    if(signature === digest){
        console.log("Payment is authorized");

        const {courseId , userId} = req.body.payload.payment.entity.notes;

        try{
            //fulfil the action

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                           {_id:courseId},
                                           {
                                            $push:{StudentEnrolled:userId}
                                           },
                                           {new:true});

            if(!enrolledCourse){
                return res.json({
                    success:false,
                    message:"Course Not Found"
                })
            }

            console.log(enrolledCourse);

            //find the student and push the course in user
            const enrolledStudent = await User.findOneAndUpdate(
                                               {_id:userId},
                                               {
                                                $push:{
                                                    courses:courseId
                                                }
                                               },
                                               {new:true});

            //send mail
            const emailResponse = await mailSender(
                                   enrolledStudent.email,
                                   "Congratulations",
                                   courseEnrollmentEmail(enrolledCourse.courseName , enrolledStudent.firstName));

            console.log(emailResponse);

            return res.status(200).json({
                success:true,
                message:"Successfully enrolled in course"
            })
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }

}
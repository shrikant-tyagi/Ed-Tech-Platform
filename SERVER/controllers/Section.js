const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req,res) => {
    try{
        //data fetch
        const {sectionName , courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Details"
            });
        }

        //db entry
        const newSection = await Section.create({
            sectionName:sectionName
        })

        //update course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
                                    {
                                        $push:{
                                            courseContent:newSection
                                        }
                                    },
                                    {new:true})
                                    .populate({
                                        path: "courseContent",
                                        populate: {
                                            path: "subSection"
                                        }
                                    })
                                    .exec();
                                    
        //return res
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourse
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create Section"
        })
    }
}

exports.updateSection = async (req,res) => {
    try{
        const {sectionId , sectionName} = req.body;

        //data validation
        if(!sectionId || !sectionName){
            return res.json(400).json({
                success:false,
                message:"Missing Entries"
            })
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true});

        //return res
        return res.json({
            success:true,
            message:"Section Updated Successfully",
            data : section
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Unable to update Section'
        })
    }
};

exports.deleteSection = async (req , res) => {
    try{
        //fetch sectionId
        const {sectionId} = req.params;
        // const {sectionId} = req.body;
        console.log("Section Id : " , sectionId);

        //validate
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Entries"
            })
        }

        await Section.findByIdAndDelete(sectionId);

        //TODO : do we need to delete entry from course Schema

        return res.status(200).json({
            success:true,
            message:"Section deleted Successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:true,
            message:"Unable to Delete"
        })
    }
}
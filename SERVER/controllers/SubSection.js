const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadFileToCloudinary } = require('../utils/fileUploader');

exports.createSubSection = async (req,res) => {
    try{
        const {sectionId , title , description} = req.body;
        const video = req.files.videoFile;

        if(!sectionId || !title || !description || !video){
            return res.status(404).json({
                success:false,
                message:"Missing Entries"
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadFileToCloudinary(video , process.env.FOLDER_NAME);
        console.log(uploadDetails);
        
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url
        })

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                {
                                                    $push:{
                                                        subSection:SubSectionDetails._id
                                                    }
                                                },
                                                {new:true}
                                                ).populate("SubSection").exec();
                            //HW :populate section

        return res.status(200).json({
            success:true,
            message:"SubSecton created Successfully",
            data : updatedSection
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Unable to create SubSection"
        })
    }
}

//update subsection
exports.updateSubSection = async (req,res) => {
    try{
        const {sectionId, title , description} = req.body;

        const subSection = await SubSection.findById(sectionId);

        if(!subSection) {
            return res.status(404).json({
                success:false,
                message: "SubSection not found"
            })
        }

        if(title !== undefined){
            subSection.title = title
        }

        if(description !== undefined){
            subSection.description = description
        }

        if(req.files && req.files.video !== undefined){
            const video = req.files.video
            const uploadDetails = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();

        return res.json({
            success:true,
            message:"Section updated successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Unable to update SubSection"
        })
    }
}

//delete subsection
exports.deleteSubSection = async (req,res) => {
    try{
        const {subSectionId , sectionId} = req.body;
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        const subSection = await SubSection.findByIdAndDelete({_id: subSection});

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found"
            })
        }

        return res.json({
            success:true,
            message:"SubSection deleted successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Unable to delete SubSection"
        })
    }
}
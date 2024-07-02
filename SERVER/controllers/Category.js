const Category = require('../models/Category');

exports.createCategory = async (req,res) => {
    try{
        const {name , description} = req.body;

        if(!name){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description
        })

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get all Categories
exports.showAllCategories = async (req,res) => {
    try{
        const allCategories = await Category.find({} , 
                                {name:true , description:true});
        return res.status(200).json({
            success:true,
            data:allCategories
        })
    }
    catch(err){
        return res.status(500).json({
             success:false,
             message:"Something went wrong while getting all tags"
        })
    }
}

//category page details
exports.categoryPageDetails = async (req,res) => {
    try{
       //get category id
       const {categoryId} = req.body;

       //get courses for specified category
       const selectedCategory = await Category.findById(categoryId)
                                              .populate("courses")
                                              .exec();

       //validation
       if(!selectedCategory){
        return res.status(404).json({
            success:false,
            message:'Category not found'
        })
       }

       //Handle the case when there are no courses
       if(selectedCategory.courses.length === 0) {
         return res.status(404).json({
            success:false,
            message:"No course found for the selected category."
         })
       }

       const selectedCourses = selectedCategory.courses;

       //get courses for different categories
       const differentCategories = await Category.find({
                                        _id: {$ne : categoryId}
                                        })
                                        .populate("courses")
                                        .exec();

        let differentCourses = [];
        for(const category of differentCategories) {
            differentCourses.push(...category.courses);
        }

       //get top selling courses
       //const topSellingCourse = //hw

       //return response
       return res.status(200).json({
        success:true,
        data:{
            selectedCourses,
            differentCourses
        }
       })
    }
    catch(error){
       return res.json({
        success:false,
        message:error.message
       })
    }
}
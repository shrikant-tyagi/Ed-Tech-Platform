const express = require('express');
const router = express.Router();

//Course Controllers
const {createCourse , 
        getAllCourses 
       , getCourseDetails} = require('../controllers/Course');


//category controllers
const {
    showAllCategories,
    createCategory,
    categoryPageDetails
} = require('../controllers/Category');

//Sections Controllers Import
const  {
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/Section');

//Sub-section controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controllers/SubSection');

//Rating controllers Import
const {
    createRating,
    getAverageRating,
    getAllRatings
} = require('../controllers/RatingAndReview');

//Importing middlewares
const {
    auth, 
    isInstructor,
    isStudent,
    isAdmin
} = require('../middlewares/auth');


// *********************Course Routes*********************
router.post('/createCourse',auth,isInstructor,createCourse);
router.post('/addSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
router.post('/deleteSection',auth,isInstructor,deleteSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);


//***************** Category Routes ***************************
router.post('/createCategory', auth , isAdmin , createCategory);
router.get('/showAllCategories', showAllCategories);
router.get('/categoryPageDetails', categoryPageDetails);

//********************Rating And Review Routes*********** */
router.post('/createRating' , auth,isStudent,createRating);
router.get('/getAverageRating' , getAverageRating);
router.get('/getReviews' , getAllRatings);

module.exports = router
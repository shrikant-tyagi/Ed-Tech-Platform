const express = require('express');
const app = express();

const dbConnect = require('./config/database');
require('dotenv').config();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const cookieParser = require('cookie-parser')
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:'http://localhost:3000',
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp'
    })
)
cloudinaryConnect();

//activating the server
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server activating at Port ${PORT}`)
})

// Mapping the route
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default route
app.get('/' , (req,res) => {
    res.send("I am a default route");
})

dbConnect();
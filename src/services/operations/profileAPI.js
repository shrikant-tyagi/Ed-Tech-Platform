import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints, settingsEndpoints, studentEndpoints } from "../apis";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/profileSlice";

// const {GET_ENROLLED_COURSES_API} = profileEndpoints.GET_ENROLLED_COURSES_API;

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...");
    let result;
    try {
        const response = await apiConnector("GET" , profileEndpoints.GET_ENROLLED_COURSES_API , null, 
            {
                Authorization : `Bearer ${token}`
            }
        )
        console.log("Response : " ,response.data);
        result = response.data;
    } catch (error) {
        console.error(error);
        toast.error("Unable to fetch enrolled courses");
    }
    toast.dismiss(toastId);
    return result;
}
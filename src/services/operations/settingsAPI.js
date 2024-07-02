import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints, settingsEndpoints } from "../apis";
import {setUser} from '../../slices/profileSlice'
import { setToken } from "../../slices/authSlice";

export async function uploadProfilePic(token , formData,dispatch){
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT" , settingsEndpoints.UPDATE_DISPLAY_PICTURE_API , formData , 
        {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log(response.data);
        dispatch(setUser(response.data.data));
        toast.success(response.data.message);
    } catch (error) {
        toast.error("Error occured while uploading image");
    }
    toast.dismiss(toastId);
}

export async function updateProfile(token , data,user ,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT" , settingsEndpoints.UPDATE_PROFILE_API , {user, ...data} , {
            Authorization : `Bearer ${token}`
        });

        if(!response.data.success){
            toast.error(response.data.message);
        }

        else{
            dispatch(setUser({...data , ...user}));
            localStorage.setItem('user' , JSON.stringify({...data,...user}));
            toast.success(response.data.message);
            console.log({...user,...data});
        }
    }catch(err){
        console.log(err);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
}

export async function changePassword(data ,token , dispatch){
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST" , endpoints.CHANGEPASSWORD_API , data , {
            Authorization : `Bearer ${token}`
        })

        if(!response.data.success){
            toast.error(response.data.message);
        }

        else{
            dispatch(setUser(response.data.newUser));
            toast.success(response.data.message)
        }
    } catch (error) {
        toast.error("Unable to update Password");
    }
    toast.dismiss(toastId);
}

export async function deleteAccount(user , token , dispatch , navigate){
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE" , settingsEndpoints.DELETE_PROFILE_API , user , {
            Authorization : `Bearer ${token}`
        })

        if(!response.data.success){
            toast.error(response.data.message);
        }

        else{
            dispatch(setToken(null));
            dispatch(setUser(null));
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.log("Reached here");
            navigate('/login');
            toast.success(response.data.message);
        }
    }catch(err){
        console.error(err);
    }
    toast.dismiss(toastId);
}
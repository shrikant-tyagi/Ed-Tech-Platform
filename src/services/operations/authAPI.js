import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setLoading ,setSignupData, setToken } from "../../slices/authSlice";
import {setUser} from '../../slices/profileSlice';
import { endpoints } from "../apis";

export function sendOtp(email ,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST" , endpoints.SENDOTP_API , {email});

            if(response.data.success){
                toast.success(response.data.message);
                navigate('/verify-email');
            }

            else{
                toast.error(response.data.message);
            }
            
        } catch (error) {
            toast.error("Unable to send otp");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(formData,navigate) {

    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST" , endpoints.LOGIN_API , formData);
            console.log(response);

            if(response.data.success === true){
                dispatch(setToken(response.data.token));
                dispatch(setUser(response.data.user));
                localStorage.setItem('token' , JSON.stringify(response.data.token));
                localStorage.setItem('user',JSON.stringify(response.data.user));
                console.log(JSON.parse(localStorage.getItem('token')));
                navigate('/dashboard/my-profile');
                toast.success(response.data.message);
            }
            
            else if(response.data.message === "not"){
                navigate('/signup')
                toast.error("User does not exist! Please Sign Up first.");
            }

            else{
                toast.error(response.data.message);
            }

        } catch(error) {
            toast.error("Unable to Login");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
  ){
    return async(dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST" , endpoints.SIGNUP_API, {accountType,
                                                                                firstName,
                                                                                lastName,
                                                                                email,
                                                                                password,
                                                                                confirmPassword,
                                                                                otp});
            console.log(response);

            if(response.data.success === true){
                navigate('/dashboard/my-profile');
                toast.success(response.data.message);
            }

            else{
                toast.error(response.data.message);
            }
        }catch(err){
            console.log(err);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getPasswordResetToken(email,setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        var response;
        try{
            response = await apiConnector("POST" , endpoints.RESETPASSTOKEN_API , {email});
            console.log(response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            setEmailSent(true);
        }
        catch(error){
            console.log(error);
            toast.error(response.data.message);
        }
        dispatch(setLoading(false));
        
    }
}

export function resetPassword(password,confirmPassword,token) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST" , endpoints.RESETPASSWORD_API , {password,confirmPassword,token});

            console.log("response:" , response);
            if(response.data.success === false){
                toast.error("Link Expired");
            }
            
            else{
                toast.success("Password reset successful");
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate,dispatch){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch(setToken(null));
            dispatch(setUser(null));
            navigate('/login');
            console.log(localStorage);
            toast.success("Successfully Logged out");
        } catch(error) {
            toast.error("Unable to Logout");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

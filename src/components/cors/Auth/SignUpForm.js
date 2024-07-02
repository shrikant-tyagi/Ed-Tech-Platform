import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import {AiOutlineEye , AiOutlineEyeInvisible} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { sendOtp } from '../../../services/operations/authAPI'
import { setSignupData } from '../../../slices/authSlice';

const SignUpForm = () => {
    
    const [formData , setFormData] = useState({
        firstName:"", lastName:"" , email:"",
        password:"" , confirmPassword:""
    })
    const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPassword , setshowPassword] = useState(false);
    const [showConfirmPassword , setshowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeHandler(event){
        setFormData(prevState => (
            { 
                ...prevState,
                [event.target.name]:event.target.value
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        if(!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword){
            toast.error("Fill all entries.");
            return;
        }

        if(formData.password !== formData.confirmPassword)
        {
            toast.error("Password donot match");
            return;
        }

        const signupData = {
            ...formData,
            accountType
        }
        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formData.email, navigate));
    }

  return (
    <div className=''>

        <div className='flex gap-4 justify-center my-5 rounded-full bg-richblack-700 max-w-fit h-[50px] p-1'>
            <button onClick={() => {
                setAccountType('Student');
            }} className={`text-[16px] flex flex-row items-center gap-2
            ${accountType === 'Student' ? 
            "bg-richblack-900 text-richblack-5 font-medium rounded-full p-2" : "text-richblack-200 "}
            "bg-transparent text-richblack-200 transition-all duration-200 m-3" }`}>
                Student
            </button>
            <button onClick={() => {
                setAccountType('Instructor')
            }} className={`text-[16px] flex flex-row items-center gap-2
            ${accountType === 'Instructor' ? 
            "bg-richblack-900 text-richblack-5 font-medium rounded-full p-2" : "text-richblack-200 "}
            "bg-transparent text-richblack-200  transition-all duration-200" }`}>
                Instructor
            </button>
        </div>

        <form className='flex flex-col gap-y-[12px]' onSubmit={submitHandler}>
            <div className='flex gap-x-4'>
                <label className='w-full text-[0.875rem]
                              text-richblack-5 mb-1
                              leading-[1.375rem]'>
                    <p>First Name<sup className='text-pink-200'>*</sup></p>
                    <input name='firstName'
                        type='text'
                        onChange={changeHandler}
                        placeholder='Enter FirstName' 
                        value={formData.firstName} 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-[12px] w-full border-b-2 py-[6px]'
                        />
                </label>

                <label className='w-full text-[0.875rem]
                              text-richblack-5 mb-1
                              leading-[1.375rem]'>
                    <p>Last Name <sup className='text-pink-200'>*</sup></p>
                    <input name='lastName'
                        type='text'
                        onChange={changeHandler}
                        placeholder='Enter LastName' 
                        value={formData.lastName} 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-[12px] w-full border-b-2 py-[6px]'
                        />
                </label>
            </div>
            

            <label className='w-full text-[0.875rem]
                              text-richblack-5 mb-1
                              leading-[1.375rem]'>
                Email Address <sup className='text-pink-200'>*</sup><br/>
                <input type='text' name='email'
                    value={formData.email}
                    placeholder='Enter Email Address'
                    onChange={changeHandler}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-[12px] w-full border-b-2 py-[6px]'
                />
            </label>

            <div className='flex gap-x-4'>
                <label className='w-full text-[0.875rem]
                              text-richblack-5 mb-1
                              leading-[1.375rem] relative'>
                    <p>Create Password <sup className='text-pink-200'>*</sup></p>
                    <input type={showPassword ? 'text' : 'password'}
                           name='password' 
                            onChange={changeHandler}
                            placeholder='Enter Password'
                            value={formData.password}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-[12px] w-full border-b-2 py-[6px]'
                           />

                <span className='absolute right-3 top-[33px]'
                  onClick={() => setshowPassword((prev) => !prev)}>
                  {showPassword ? <AiOutlineEyeInvisible/> :
                   <AiOutlineEye/>}
                </span>

                </label>

                <label className='w-full text-[0.875rem]
                              text-richblack-5 mb-1
                              leading-[1.375rem] relative'>
                    <p>Confirm Password <sup className='text-pink-200'>*</sup></p>
                    <input type={showConfirmPassword ? 'text' : 'password'}
                            name='confirmPassword' 
                            onChange={changeHandler}
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-[12px] w-full border-b-2 py-[6px]'
                           />

                <span className='absolute right-3 top-[33px]'
                  onClick={() => setshowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <AiOutlineEyeInvisible/> :
                   <AiOutlineEye/>}
                </span>
                </label>
            </div>

            <button className='bg-yellow-400 py-2 rounded-md w-full' type='submit'>
                Create Account
            </button>

        </form>
    </div>
  )
}

export default SignUpForm;
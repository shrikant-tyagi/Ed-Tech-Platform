import React, { useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const {signupData,loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(signupData);


    function OtpHandler(e) {
        setOtp(e.target.value);
    }

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          } = signupData;
      
          dispatch(
            signUp(
              accountType,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              otp,
              navigate
            )
          );
    }

  return (
    <div className='text-richblack-5 flex justify-center items-center h-[550px] font-inter'>
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className='flex flex-col max-w-[500px] p-4 lg:p-8 gap-y-[10px]'>
                    <h1 className='font-semibold text-3xl'>Verify Email</h1>
                    <p className='font-normal text-xl'>
                    A verification code has been sent to you. Enter the code below
                    </p>
                    
                    <form onSubmit={handleVerifyAndSignup}>
                        <OTPInput 
                           value={otp}
                           onChange={setOtp}
                           numInputs={6}
                           renderInput={(props) => (
                            <input
                                {...props}
                                placeholder='-'
                                style={{
                                    boxShadow: "insert 0px -1px 0px rgba(255, 255, 255, 0,18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    />
                    )}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
    
                    />

                        <button type='submit' className='mt-[10px] w-full text-[#000814]'>
                            <div className='h-full min-w-[135px] rounded-lg gap-2 py-3 px-6 flex bg-[#FFD60A] justify-center items-center cursor-pointer font-normal text-xl'>
                                Verify Email
                            </div>
                        </button>
                    </form>


                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail
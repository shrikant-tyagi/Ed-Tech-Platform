import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }

  return (
    <div className='flex h-[450px] justify-center items-center text-richblack-5'>
        {
            loading ? (
                <div>
                    Loading....
                </div>
            ) : (
                <div>
                    <h1 className='text-3xl font-semibold'>
                        {
                            !emailSent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>

                    <p className='font-normal text-xl'>
                        {
                            !emailSent
                            ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p className='font-normal text-[14px] leading-[22px]'>Email Address</p>
                                    <input 
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Your Email Address'
                                    />
                                </label>
                            )
                        }

                        <button type='submit' className=''>
                            {
                                !emailSent ? "Reset Password" :"Resend Email"
                            }
                        </button>
                    </form>

                    <div>
                        <Link to='/login'>
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
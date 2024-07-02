import React, { useState } from 'react'
import {AiOutlineEye , AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../services/operations/authAPI'

const LoginForm = ({setIsLoggedIn}) => {
 
    const [formData , setFormData] = useState({
         password:"" , email:"" 
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.auth);
    const [showPassword , setshowPassword] = useState(false);

    const changeHandler = (event) => {
        setFormData(prevState => (
            {
                ...prevState,
                [event.target.name]:event.target.value
            }
        ))
    }

    function  submitHandler(event){
        event.preventDefault();
        dispatch(login(formData , navigate));
    }

  return (
      <div>
        {
          loading ? (
              <div>Loading...</div>
          ) : (
                    <div>
                <form onSubmit={submitHandler}
                      className='flex flex-col mt-6 gap-y-6'>
                    <label className='w-full text-[0.875rem]
                                      text-richblack-5 mb-1
                                      leading-[1.375rem]'>
                          Email Address <sup className='text-pink-200'>*</sup><br/>

                        <input name='email' id='email' 
                              type='email' placeholder='Enter Email Address' 
                              value={formData.email} onChange={changeHandler}
                              required className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-[12px] w-full border-b-2 py-[8px]'/>
                    </label>
                    

                    <label className='relative w-full text-[0.875rem]
                                      text-richblack-5 mb-1
                                      leading-[1.375rem]'>Password <sup className='text-pink-200'>*</sup><br/>
                        <input type={showPassword ? 'text' : 'password'} 
                              id='password' 
                              name='password'
                              value={formData.password}
                              placeholder='Enter Password'
                              onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-[12px] w-full border-b-2 py-[8px]'
                              />

                        <span className='absolute right-3 top-[38px] text-white'
                          onClick={() => setshowPassword((prev) => !prev)}>
                          {showPassword ? <AiOutlineEyeInvisible/> :
                          <AiOutlineEye/>}
                        </span>

                        <Link to='/forgot-password' className='relative left-[250px] text-blue-100'>
                            <p>Forgot Password</p>
                        </Link>

                        </label>

                        <button className='bg-yellow-400 py-2 rounded-md' 
                                type='submit'> Sign In </button>

                </form>
            </div>
          )
        }
      </div>
  )
}

export default LoginForm 
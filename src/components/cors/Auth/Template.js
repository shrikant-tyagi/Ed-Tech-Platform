import React from 'react'
import frameImage from '../../../assets/Images/frame.png'
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import {FcGoogle} from 'react-icons/fc'
import { useSelector } from 'react-redux'

const Template = ({title , desc1 , desc2 , formType , image}) => {

  const {loading} = useSelector((state) => state.auth)

  return (
    <div className='flex w-11/12 max-w-[1160px] mt-[40px] mx-auto
                    gap-x-[10rem] justify-center'>
      {
        loading ? (
          <div className='spinner'></div>
        ) : (
          <div className='flex gap-x-[150px] items-center'>
            <div className='max-w-[400px]'>
                <h1 className='text-richblack-5 font-semibold 
                          text-[1.075rem] leading-[2.375rem]'>
                          {title}
                </h1>

                <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                  <span className='text-richblack-100'>
                      {desc1} 
                  </span><br/>
                  <span className='text-blue-100 italic'>
                      {desc2}
                  </span>
                </p>

                {formType === 'login' ? (<LoginForm/>) : (<SignUpForm/>)}

                <div className='flex w-full items-center my-4 gap-x-2'>
                    <div className='h-[1px] w-full bg-richblack-700'></div>
                    <div className='text-richblack-700 font-medium leading-[1.375rem]'>OR</div>
                    <div className='w-full h-[1px] bg-richblack-700'></div>
                </div>

                <button className='w-full flex justify-center items-center
                rounded-[8px] font-medium text-richblack-100
                border border-richblack-700 px-[12px]
                py-[8px] gap-x-2 mt-6'> <FcGoogle/>
                Sign Up with Google</button>

            </div>

            <div className='relative w-11/12 max-w-[350px]'>
              <img src={frameImage} alt='pattern'
                  width={558} height={504} 
                  loading='lazy'/>

              <img src={image} alt='students'
                  width={558} height={490} 
                  loading='lazy'
                  className='absolute -top-4 right-4'/>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Template
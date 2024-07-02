import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../services/operations/settingsAPI';

const UpdateUserDetails = () => {

  const {register , handleSubmit , watch , formState:{errors}} = useForm();
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (data,event) => {
    event.preventDefault();
    dispatch(updateProfile(token , data , user , dispatch));
  }

  return (
    <div className='w-full p-4 bg-richblack-700 rounded-md flex flex-col gap-5 border-[0.5px]'>
        <h2 className='text-2xl font-semibold'>Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-[20px]'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='firstName' className='text-[14px]'>FirstName</label>
              <input value={user?.firstName} id='firstName' className='bg-richblack-400 p-1 rounded-sm'
              {...register("firstName" , )} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='lastName' className='text-[14px]'>LastName</label>
              <input value={user?.lastName} className='bg-richblack-400 p-1 rounded-sm' id='lastName'
              {...register("lastName")} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='dob' className='text-[14px]'>Date of Birth</label>
              <input type="date" placeholder='dd/mm/yyyy' id='dob' className='bg-richblack-400 p-1 rounded-sm'
              {...register("dateOfBirth")} />
            </div>
            
            <div className='flex flex-col gap-1'>
              <label className='text-[14px]'>Gender</label>
              <div className='bg-richblack-400 p-1 rounded-sm flex gap-5'>
                <div className='flex gap-1'>
                  <input type='radio' name='gender' value='male' id='male'
                  {...register("gender" , {required: true})}/>
                  <label htmlFor='male'>Male</label>
                </div>

                <div className='flex gap-2'>
                  <input type='radio' name='gender' value='female' id='female'
                  {...register("gender" , {required: true})}/>
                  <label htmlFor='female'>Female</label>
                </div>

                <div className='flex gap-2'>
                  <input type='radio' name='gender' value='other' id='other'
                  {...register("gender" , {required: true})}/>
                  <label htmlFor='other'>Other</label>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='phone' className='text-[14px]'>Phone Number</label>
              <input id='phone' type='number' placeholder='+91' className='bg-richblack-400 p-1 rounded-sm'
              {...register('contactNumber', {minLength:10 , maxLength:10})}/>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='about' className='text-[14px]'>About</label>
              <input type='text' className='bg-richblack-400 p-1 rounded-sm' id='about'
              {...register("about")}/>
            </div>

            <div></div>
            <input type='submit' className='bg-yellow-200 p-2 rounded-md w-fit justify-self-end text-black cursor-pointer'/>
        </form>
    </div>
  )
}

export default UpdateUserDetails
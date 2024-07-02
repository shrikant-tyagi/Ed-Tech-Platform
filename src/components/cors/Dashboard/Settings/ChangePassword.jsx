import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../services/operations/settingsAPI';

const ChangePassword = () => {

  const [password , setPassword] = useState("");
  const [newPassword , setNewPassword] = useState("");
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email:user.email,
      password,
      newPassword,
      confirmNewPassword:newPassword
    }
    dispatch(changePassword(data , token , dispatch));
  }

  return (
    <div className='w-full p-3 bg-richblack-700 rounded-md flex flex-col gap-5 border-[0.5px]'>
      <h2 className='font-semibold text-2xl'>Password</h2>
      <form onSubmit={submitHandler} className='w-full flex flex-col gap-4'>
        <div className='flex justify-between gap-4'>
          <div className='flex flex-col gap-1 w-1/2'>
            <label htmlFor='currPassword' className='text-[14px] text-richblack-100'>Current Password</label>
            <input type='password' id='currPassword' className='text-black p-1 outline-none bg-richblack-300' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='flex flex-col gap-1 w-1/2'>
            <label htmlFor='newPassword' className='text-[14px] text-richblack-100'>Change Password</label>
            <input type='password' id='newPassword' className='text-black p-1 outline-none bg-richblack-300' onChange={(e) => setNewPassword(e.target.value)}/>
          </div>
        </div>
        <button type='submit' className='bg-yellow-200 p-2 rounded-md w-fit self-end text-black'>Change</button>
      </form>
    </div>
  )
}

export default ChangePassword
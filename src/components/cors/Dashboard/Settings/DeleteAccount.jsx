import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../../../services/operations/settingsAPI';

const DeleteAccount = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  const clickHandler = () => {
    // dispatch(deleteAccount(user , token ,dispatch , navigate));
  }

  return (
    <div className='w-full p-5 bg-pink-800 rounded-md flex gap-5 border-[0.5px]'>
      <div className='bg-pink-600 rounded-full w-[50px] h-[50px] flex justify-center items-center'>
          <RiDeleteBin6Line size='1.5rem' color='pink'/>
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='text-[20px] font-semibold'>Delete Account</h2>

        <div className='text-[14px] text-pink-25'>
          <p>Would you like to delete your account?</p>
          <p>This account contains Paid Courses. Deleting this account will remove all the <br/> content associated with it.</p>
        </div>

        <span className='italic text-pink-400 cursor-pointer' onClick={clickHandler}>I want to delete my account.</span>
      </div>
      
    </div>
  )
}

export default DeleteAccount
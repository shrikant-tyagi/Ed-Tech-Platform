import React from 'react';
import { FiEdit } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ButtonY = () => {
  const navigate = useNavigate();
  return(
    <button className='bg-yellow-200 flex text-black font-bold p-2 rounded-lg h-fit gap-2 items-center cursor-pointer'
    onClick={() => navigate('../dashboard/settings')}>
            <span>Edit</span>
            <FiEdit />
    </button>
  )
}
 
const MyProfile = () => {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className='text-white p-10 flex flex-col gap-10 w-8/12 mx-auto'>
      <h2 className='text-2xl'>
        My Profile
      </h2>

      <div className='flex flex-col gap-10'>

        <div className='bg-richblack-700 p-5 flex justify-between rounded-md border-[1px] border-richblack-200 items-center'>
          <div className='flex gap-3 items-center text-richblack-50'>
            <img src={user.image} alt='' className='w-[45px] h-[45px] rounded-full'/>
            <div className='flex flex-col'>
              <div>{user.firstName} {user.lastName}</div>
              <div>{user.email}</div>
            </div>
          </div>
          <ButtonY/>
        </div>

        <div className='bg-richblack-700 p-5 flex justify-between rounded-md border-[1px] border-richblack-200'>
          <div className='flex flex-col gap-5'>
            <span>About</span>
            <span>{user?.about}</span>
          </div>
          <ButtonY onClick={() => navigate('/dashboard/settings')}/>
        </div>

        <div className='bg-richblack-700 p-5 flex justify-between rounded-md border-[1px] border-richblack-200'>

            <div className='flex flex-col gap-10'>
              <span>Personal details</span>

              <div className='flex flex-col gap-3'>
                <div className='flex justify-between gap-5'>
                  <div className='flex gap-1 flex-col'>
                    <h3 className='text-[14px] text-richblack-400'>First Name</h3>
                    <span>{user.firstName}</span>
                  </div>
                  <div className='flex gap-1 flex-col'>
                    <h3 className='text-[14px] text-richblack-400'>Last Name</h3>
                    <span>{user.lastName}</span>
                  </div>
                </div>

                <div className='flex justify-between gap-10'>
                  <div className='flex gap-1 flex-col'>
                    <h3 className='text-[14px] text-richblack-400'>Email</h3>
                    <span>{user.email}</span>
                  </div>
                  <div className='flex gap-1 flex-col'>
                    <h3 className='text-[14px] text-richblack-400'>Phone Number</h3>
                    <span>{user?.contactNumber}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='flex gap-1 flex-col'>
                    <h3 className='text-[14px] text-richblack-400'>Gender</h3>
                    <span className='capitalize'>{user?.gender}</span>
                  </div>
                  <div className='flex gap-1 flex-col'>
                    <h3 className='text-[14px] text-richblack-400'>Date of Birth</h3>
                    <span>{user?.dateOfBirth}</span>
                  </div>
                </div>
              </div>
            </div>

            <ButtonY onClick={() => {
              navigate('dashboard/settings');
            }}/>
        </div>

      </div>
    </div>
  )
}

export default MyProfile
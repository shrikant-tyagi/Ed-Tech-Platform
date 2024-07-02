import React from 'react';
import UpdateProfilePicture from './UpdateProfilePicture';
import UpdateUserDetails from './UpdateUserDetails';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const settings = () => {
  return (
    <div className='text-white p-10 flex flex-col gap-10 w-8/12 mx-auto'>
        <div className='text-white text-3xl font-semibold'>Edit Profile</div>

       <div className='flex flex-col gap-5'>
          <UpdateProfilePicture />
          <UpdateUserDetails />
          <ChangePassword />
          <DeleteAccount />
       </div>

    </div>
  )
}

export default settings
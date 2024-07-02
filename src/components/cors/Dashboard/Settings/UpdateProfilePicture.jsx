import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { uploadProfilePic } from '../../../../services/operations/settingsAPI';

const UpdateProfilePicture = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [image , setImage] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("displayPicture", image);
        console.log("hi");
        dispatch(uploadProfilePic(token , formData,dispatch));
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
        }
    }

  return (
    <div className='w-full p-3 bg-richblack-700 rounded-md flex gap-5 items-center border-[0.5px]'>
        <img src={user.image} className='w-[50px] h-[50px] rounded-full'/>
        <div className='flex flex-col gap-2'>
            <span>Change Profile Picture</span>
            <div className='flex gap-3'>
                <form className='flex items-center gap-3' onSubmit={submitHandler}>
                    <label className='p-2 bg-yellow-200 text-richblack-800 rounded-sm cursor-pointer' htmlFor='profilePic'>Change</label>
                    <input  type='file' id='profilePic' className='hidden' onChange={handleChange}/>
                    <button className='p-2 bg-richblack-800 rounded-sm' type='submit'>Upload</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfilePicture
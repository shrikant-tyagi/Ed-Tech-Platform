import React from 'react';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ConfirmationModal from '../../common/ConfirmationModal';
import { setLogoutModal } from '../../../slices/profileSlice';
import { logout } from '../../../services/operations/authAPI';
import { VscSignOut } from 'react-icons/vsc';

export const ProfileDropDown = ({totalItems , user}) => {

    const [open,setOpen] = useState(false);
    const {logoutModal} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate()

  return (
    <div className='flex items-center'>
        {
           user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR  && (
                <Link to="/dashboard/cart" className="relative text-richblack-200 w-[50px]">
                    <AiOutlineShoppingCart size='1.5rem'/>
                    {
                        (
                            <span className='absolute -top-2 right-4 bg-caribbeangreen-300 
                            text-black rounded-full w-5 h-5 flex items-center justify-center animate-bounce'>
                                5
                            </span>
                        )
                    }
                </Link>
            )
        }
        
        
        <div className="flex text-blue-500 items-center cursor-pointer" onClick={() => setOpen((val) => !val)}>
            <img src={user.image} className='rounded-full w-[30px] h-[30px]'/>
            <IoMdArrowDropdown size='1.6rem' className='cursor-pointer'/>
            {
            open && <div className='bg-white p-2 rounded-lg absolute top-14 right-20 flex flex-col gap-4'>
                        <span className='bg-richblack-100 p-2 rounded-sm' onClick={() => navigate('/dashboard/my-profile')}>My Profile</span>
                        <button onClick={() => dispatch(setLogoutModal({
                                                text1:"Are you Sure?",
                                                text2:"You will be logged out of your account.",
                                                bt1Text:"Logout",
                                                bt2Text:"Cancel"
                                            }))}
                                className='bg-yellow-100 p-2 rounded-sm flex gap-2 items-center'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </button>
                    </div>
            }
        </div>

        {logoutModal && <ConfirmationModal modalData={logoutModal}/>}
    </div>
  )
}

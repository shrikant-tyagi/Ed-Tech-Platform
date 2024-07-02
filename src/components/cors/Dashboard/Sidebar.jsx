import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { useDispatch , useSelector} from 'react-redux';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';
import { logout } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { setLogoutModal } from '../../../slices/profileSlice';

const Sidebar = () => {

    const {user,logoutModal} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className='w-2/12 border-r-[1px] border-richblack-700
      h-[100%] bg-richblack-800 py-10'>

         <div className='text-richblack-100'>

            <div className='flex flex-col'>
               {
                  sidebarLinks.map((link) => {
                     if(link.type && user?.accountType !== link.type) return null;
                     return (
                        <SidebarLink key={link.id} link={link}/>
                     )
                  })
               }
            </div>

            <div className='mx-auto w-10/12 h-[1px] bg-richblack-700 my-6'></div>

            <div className='flex flex-col'>
               <SidebarLink link={{name:"Settings" , path:"/dashboard/settings" , icon:"VscSettingsGear"}} />

               <button onClick={() => dispatch(setLogoutModal({
                  text1:"Are you Sure?",
                  text2:"You will be logged out of your account.",
                  bt1Text:"Logout",
                  bt2Text:"Cancel"
               }))} className='px-4 py-2'>

                  <div className='flex gap-x-2 items-center'>
                     <VscSignOut className='text-lg'/>
                     <p>Logout</p>
                  </div>

               </button>
            </div>

         </div>

         {logoutModal && <ConfirmationModal modalData={logoutModal}/>}

    </div>
  )
}

export default Sidebar
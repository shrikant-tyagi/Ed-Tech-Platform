import React from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/cors/Dashboard/Sidebar';

const Dashboard = () => {

  const {loading : authLoading} = useSelector((state) => state.auth);
  const {loading : profileLoading} = useSelector((state) => state.profile);

  if(authLoading || profileLoading){
    const toastId = toast.loading("Loading...");
    return(
      <div className='flex text-2xl text-white justify-center items-center'>
        Loading ....
      </div>
    )

    toast.dismiss(toastId);
  }


  return (
    <div className='flex h-[calc(100vh-3.5rem)] w-[100%] overflow-hidden'>
       <Sidebar />

       <div className='w-10/12 overflow-y-scroll'>
              <Outlet />
       </div>
    </div>
  )
}

export default Dashboard
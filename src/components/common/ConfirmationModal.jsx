import React from 'react';
import { logout } from '../../services/operations/authAPI';
import { setLogoutModal } from '../../slices/profileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ConfirmationModal = ({modalData}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='bg-richblack-600 h-[100vh] w-[100vw] absolute top-0 right-0 flex justify-center items-center bg-opacity-80'
    onClick={() => dispatch(setLogoutModal(null))}>
       <div className='bg-richblack-800 p-5 opacity-100 flex flex-col gap-4 rounded-lg text-white'>
        <div>
              {modalData.text1}
          </div>
          <div>
              {modalData.text2}
          </div>
          <div className='flex gap-4 text-richblack-900'>
              <button onClick={() => dispatch(logout(navigate,dispatch))} className='bg-yellow-200 p-2 rounded-md'>{modalData.bt1Text}</button>
              <button onClick={() => dispatch(setLogoutModal(null))} className='bg-yellow-200 p-2 rounded-md'>{modalData.bt2Text}</button>
          </div>
       </div>
    </div>
  )
}

export default ConfirmationModal;
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation , Link} from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector( (state) => state.auth);
    const [formData , setFormData] = useState({
        password:"",
        confirmPassword:""
    });


    const handleOnChange = (e) =>{
        setFormData( (prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value
            }
        ))
    }
    const {password , confirmPassword} = formData;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }

  return (
    <div className='text-richblack-25'>
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div>
                    <h1>Choose new password</h1>
                    <p>Almost Done. Enter the new password</p>

                    <form onSubmit={handleOnSubmit}>
                        <label>
                             <p>New Password</p>
                             <input 
                                required
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={handleOnChange}
                             />
                        </label>

                        <label>
                            <p>Confirm New Password</p>
                            <input
                                required
                                type='password'
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={handleOnChange}
                            />
                        </label>

                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>
                    <div>
                        <Link to='/login'>
                            <p> Back to Login </p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword
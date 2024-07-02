import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses , setEnrolledCourses] = useState(null);
    
    useEffect(() => {
        setEnrolledCourses(getUserEnrolledCourses(token));
    },[]);

  return (
    <div>

    </div>
  )
}

export default EnrolledCourses
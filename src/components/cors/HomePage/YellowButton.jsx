import React from 'react'
import { Link } from 'react-router-dom'

const YellowButton = ({text,linkto}) => {
  return (
    <Link to={linkto}>
        <div className='h-full min-w-[135px] rounded-lg gap-2 py-3 px-6 flex bg-[#FFD60A] justify-center items-center cursor-pointer'>
          {text}
        </div>
    </Link>
  )
}

export default YellowButton
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const YellowButton = ({text,linkto}) => {
  return (
    <div>
      <Link to={linkto}>
        <div className='h-full min-w-[135px] rounded-lg gap-2 py-3 px-6 flex bg-[#FFD60A] justify-center items-center cursor-pointer'>
            {text}
            <BiRightArrowAlt className='font-black'/>
        </div>
      </Link>
    </div>
  )
}

export default YellowButton
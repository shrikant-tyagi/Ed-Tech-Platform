import React from 'react'

const BlackButton = ({text}) => {
  return (
    <div className='h-full min-w-[135px] rounded-lg gap-2 py-3 px-6 flex bg-[#161D29] justify-center items-center
                    text-white squareShadow'>
            {text}
    </div>
  )
}

export default BlackButton
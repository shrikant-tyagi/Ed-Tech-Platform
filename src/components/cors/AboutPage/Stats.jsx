import React from 'react'

const stats = [
    {count:"5K" , label:"Active Students"},
    {count:"10+" , label:"Mentors"},
    {count:"200+" , label:"Courses"},
    {count:"50+" , label:"Awards"}
]

const StatsComponent = () => {
  return (
    <div className='text-white bg-richblack-800'>
        <div className='flex justify-evenly p-10'>
        {    
            stats.map((data,index) => (
                <div key={index}>
                    <div>{data.count}</div>
                    <div>{data.label}</div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default StatsComponent
import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineImage from '../../../assets/Images/TimelineImage.png'

const timeLine = [
    {
        Logo:logo1,
        Heading:'Leadership',
        Text:'Fully committed to the success company'
    },
    {
        Logo:logo2,
        Heading:'Responsibility',
        Text:'Students will always be our top priority'
    },
    {
        Logo:logo3,
        Heading:'Flexibility',
        Text:'The ability to switch is an important skills'
    },
    {
        Logo:logo4,
        Heading:'Solve the problem',
        Text:'Code your way to a solution'
    }
]

const TimeLine = () => {
  return (
    <div className='w-10/12 flex mx-auto justify-evenly h-[545px] my-[100px]'>

        <div className='flex flex-col justify-between m-[80px]'>
           {    
                timeLine.map( (element , index) => {
                    return (
                        <div className='flex gap-3' key={index}>
                            
                            <div>
                                <img src={element.Logo} />
                            </div>

                            <div>
                                <div className='font-semibold text-[18px] leading-[26px]'>{element.Heading}</div>
                                <div className='font-[400] text-[14px] leading-[22px]'>{element.Text}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <div className='h-full whiteShadowDown'>
            <img src={TimeLineImage}/>
            <div className='bg-caribbeangreen-700 h-[128px] max-w-[511px] flex justify-center
                             items-center mx-auto px-[52px] gap-[34px] relative -top-[12%]'>
                <div className='flex h-[44px] gap-[24px]'>
                    <div className='text-4xl font-bold text-white'>10</div>
                    <div className='font-[500] text-[14px] leading-[22px]  text-caribbeangreen-300'>YEARS EXPERIENCES</div>
                </div>

                <div className='h-[44px] bg-caribbeangreen-300 w-[1px] z-20'></div>

                <div className='h-[44px] flex gap-[24px]'>
                    <div className='text-4xl font-bold text-white'>250</div>
                    <div className='font-medium text-[14px] leading-[22px] text-caribbeangreen-300'>TYPES OF COURSES</div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default TimeLine
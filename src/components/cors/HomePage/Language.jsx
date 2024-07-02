import React from 'react'
import HighLightText from './HighLightText'
import image1 from '../../../assets/Images/Compare_with_others.svg'
import image2 from '../../../assets/Images/Know_your_progress.svg'
import image3 from '../../../assets/Images/Plan_your_lessons.svg'
import YellowButton from './YellowButton'

const Language = () => {
  return (
    <div className='w-11/12 mx-auto flex flex-col'>
        <div className='w-full h-[104px] flex flex-col justify-between items-center'>
            <div className='font-semibold text-4xl'>
                Your swiss knife for 
                <HighLightText text={'learning any language'} />
            </div>

            <div className='text-[16px] leading-[24px] text-center'>
                Using spin making learning multiple languages easy. 
                with 20+ languages realistic voice-over, <br/>
                progress tracking, custom schedule and more.
            </div>
        </div>

        <div className='flex mx-auto'>
            <img src={image2} className='object-contain -mr-32'/>
            <img src={image1} className='object-contain'/>
            <img src={image3} className='object-contain -ml-36'/>
        </div>

        <div className='w-[137px] mx-auto mt-[50px]'>
            <YellowButton text={'Learn More'} linkto={'./singup'}/>
        </div>
    </div>
  )
}

export default Language
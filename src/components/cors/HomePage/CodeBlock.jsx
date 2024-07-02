import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import HighLightText from './HighLightText'
import YellowButtonWithArrow from './YellowButtonWithArrow'
import BlackButton from './BlackButton'

const CodeBlock = ({text,direction}) => {
  return (
    <div className={`w-full min-h-[522px] flex ${direction} py-[90px] px-[120px] gap-[98px] justify-around mx-auto`}>

        <div className='w-[486px] min-h-[284px] flex gap-[12px] flex-col'>
            <div className='font-semibold text-4xl tracking-[-2%] text-[#F1F2FF]'>
                Unlock your 
                <HighLightText text={"coding potential"}/> 
                with our online courses.
            </div>

            <div className='font-medium text-[16px] leading-[24px] text-[#838894]'>
                Our courses are designed and taught by industry experts who have years
                of experience in coding and are passionate about sharing their knowledge with you.
            </div>

            <div className='max-w-[338px] h-[100px] pt-[52px] gap-[24px] flex'>
                <YellowButtonWithArrow text={"Try it Yourself"} linkto={'/signup'}/>
                <BlackButton text={"Learn More"}/>
            </div>
        </div>

        <div className='w-[534px] min-h-[342px] p-[32px] flex relative z-20 bg-transparent'>
           <div className='absolute z-10'></div>
           <div className='w-[10%] text-white'>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
           </div>

           <div className='w-[90%] text-yellow-25'>
               <TypeAnimation
                sequence={[text , 1000]}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
                omitDeletionAnimation={true}
               />
           </div>
        </div>

    </div>
  )
}

export default CodeBlock
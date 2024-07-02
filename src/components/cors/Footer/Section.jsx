import React from 'react'
import { FooterLink2 } from '../../../data/footer-links';
import { Link } from 'react-router-dom';

const Section = ({tag}) => {
    
    let t = JSON.stringify(tag);
    let array = FooterLink2.filter(function(val){
        return `"${val.title}"`==t})


  return (
    <div className='flex flex-col gap-[12px]'>
       <div className='font-semibold text-[16px] leading-[24px] text-richblack-100'>{tag}</div>
       
       <div className='flex flex-col gap-[8px]'>
        {
            array[0].links.map((element , index) => {
                return(
                    <Link to={element.link} key={index}>
                        <div className='font-normal text-[14px] leading-[22px] text-richblack-400'>
                            {element.title}
                        </div>
                    </Link>
                )
            })
        }
       </div>
    </div>
  )
}

export default Section
import React from 'react'

const Company = ["About", "Careers", "Affiliates"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Support = ["Help Center"]


const Section = ({tag}) => {
    
   let array;
   if(tag === 'Company') array = Company;
   if(tag === 'Resources') array = Resources;
   if(tag === 'Plans') array = Plans;
   if(tag === 'Community') array = Community;
   if(tag === 'Support') array = Support;


  return (
    <div className='flex flex-col gap-[12px]'>
       <div className='font-semibold text-[16px] leading-[24px] text-richblack-100'>{tag}</div>
       
       <div className='flex flex-col gap-[8px]'>
        {
            array.map((element , index) => {
                return(
                      <div key={index} className='font-normal text-[14px] leading-[22px] text-richblack-400'>
                          {element}
                      </div>
                )
            })
        }
       </div>
    </div>
  )
}

export default Section
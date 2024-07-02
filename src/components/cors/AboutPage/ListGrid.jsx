import React from 'react'
import HighLightText from '../HomePage/HighLightText';
import YellowButton from '../HomePage/YellowButton'

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const ListGrid = () => {
  return (
    <div className='grid mx-auto w-11/12 xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 p-20'>
        {
          LearningGridArray.map((box , i) => (
              <div key={i}
                   className={`${i===0 && 'xl:col-span-2 , xl:h-[294px] p-10'}
                   ${box.order%2===0 ? 'bg-richblack-800 h-[294px]' : 
                   box.order%2===1 ? 'bg-richblack-700 h-[294px]' :
                   'bg-transparent'}
                   ${box.order === 3 && 'xl:col-start-2 h-[294px]'}`}
              >
                {
                  (box.order < 0) ? (<div className='flex flex-col justify-evenly'>
                    <h2 className='text-richblack-5 font-semibold text-4xl'>{box.heading}</h2>
                    <span className='font-semibold text-4xl'>
                      <HighLightText text={box.highlightText} />
                    </span>

                    <p className='font-medium text-xl text-richblack-100'>{box.description}</p>
                    <div className='w-[137px]'>
                      <YellowButton text={"Learn More"} linkto={'/'}/>
                    </div>
                  </div>) :
                  (<div className='p-10 flex flex-col gap-[32px]'>
                    <div className='text-richblack-5 font-semibold text-xl'>
                      {box.heading}
                    </div>
                    <div className='text-richblack-100 font-semibold text-[14px] leading-[22px]'>
                      {box.description}
                    </div>
                  </div>)
                }
              </div>
          ))
        }
    </div>
  )
}

export default ListGrid
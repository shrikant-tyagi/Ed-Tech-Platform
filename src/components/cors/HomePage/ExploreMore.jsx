import React, { useState } from 'react'
import HighLightText from './HighLightText'
import {HomePageExplore} from '../../../data/homepage-explore'

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills Path",
    "Career Path"
]

const ExploreMore = () => {
    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0]);

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0]);
    }

  return (
    <div className='w-11/12 mx-auto'>
        <div className='flex flex-col items-center'>
            <div className='heading1 text-richblack-5'>
                Unlock the
                <HighLightText text={"Power of Code"} />
            </div>
            <div className='text1 text-richblack-300'>
                Learn to Build Anything You Can Imagine
            </div>
        </div>

        <div className='flex gap-4 justify-center my-5 rounded-full bg-richblack-700 max-w-fit mx-auto p-1'>
            {
                tabsName.map((element , index) => {
                    return(
                        <div className={`text-[16px] flex flex-row items-center gap-2
                        ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" 
                        : "text-richblack-200 "} rounded-full transition-all duration-200 cursor-pointer p-2`}
                        key={index} onClick={() => setMyCard(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore
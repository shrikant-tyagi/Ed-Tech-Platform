import React from 'react'
import {Link} from 'react-router-dom'
import {BiRightArrowAlt} from  'react-icons/bi'
import HighLightText from '../components/cors/HomePage/HighLightText'
import YellowButton from '../components/cors/HomePage/YellowButton'
import BlackButton from '../components/cors/HomePage/BlackButton'
import YellowButtonWithArrow from '../components/cors/HomePage/YellowButtonWithArrow'
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/cors/HomePage/CodeBlock'
import image from '../assets/Images/boxoffice.png'
import TimeLine from '../components/cors/HomePage/TimeLine'
import Language from '../components/cors/HomePage/Language'
import instructorImage from '../assets/Images/Instructor.png'
import ReviewSection from '../components/cors/HomePage/ReviewSection'
import ExploreMore from '../components/cors/HomePage/ExploreMore'
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    <div>
        {/* {section 1} */}
        <div className='max-w-11/12 min-h-[881px]'>

            <div className='max-w-11/12 min-h-[276px] mx-auto gap-[38px] mt-[80px] flex flex-col'>
                
                <div className='bg-[#161D29] w-[235px] h-[44px] rounded-full gap-[5px] mx-auto
                                    flex text-[#F1F2FF] roundShadow items-center justify-center'>
                        <Link to={'/signup'}>
                            <div className='flex items-center gap-2 w-full h-full'>
                                <p>Become an Instructor</p>
                                <BiRightArrowAlt className='font-white'/>
                            </div>
                        </Link>
                </div>      

                <div className='w-[913px] min-h-[108px] gap-[16px] flex flex-col mx-auto'>
                   <h2 className='mx-auto leading-[44px] font-semibold text-4xl text-[#F1F2FF] tracking-[-2%]'>Empower your Future with  
                      <HighLightText text={"Coding Skills"}/>
                   </h2>

                   <p className='max-w-[913px] min-h-[48px] font-medium text-base mx-auto text-[#838894] text-center'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, 
                        and get access to a wealth of resources, including hands-on projects, quizzes, and personalized
                            feedback from instructors. 
                    </p>
                </div>

                <div className='min-w-[308px] min-h-[48px] gap-[24px] flex mx-auto'>
                    <YellowButton text={"Learn More"} linkto={'/signup'}/>
                    <BlackButton text={"Book a Demo"}/>
                </div>

            </div>

            <div className='w-[1035px] h-[515px] mx-auto my-10 border-blue-400'>
                {/* <video className='w-full h-full'
                    muted loop autoPlay 
                    src={Banner}
                    typeof='video/mp4'
                /> */}
                <img src={image}/>
            </div>

            <CodeBlock text={'<!DOCTYPE html> <html> head><title>Example</title><linkrel="stylesheet"href="styles.css"> /head> body> h1><ahref="/">Header</a> /h1> nav><ahref="one/">One</a><ahref="two/">Two</<ahref="three/">Three</a> /nav>'}
                    direction={'flex-row'} />
            
            
            <CodeBlock text={'<!DOCTYPE html> <html> head><title>Example</title><linkrel="stylesheet"href="styles.css"> /head> body> h1><ahref="/">Header</a> /h1> nav><ahref="one/">One</a><ahref="two/">Two</<ahref="three/">Three</a> /nav>'}
                    direction={'flex-row-reverse'} />
                        
            <ExploreMore/>

        </div>


        {/* section 2 */}
        <div className='bg-puregreys-5 text-richblack-700 pb-[100px]'>

            <div className='homepage_bg bg-richblack-800 h-[333px] flex items-center'>
                
                <div className='w-11/12 max-w-maxContent flex justify-center items-center mx-auto gap-6'>
                   <YellowButtonWithArrow text={"Explore Full Catalog"} linkto={'/signup'}/>
                   <BlackButton text={'Learn More'} />
                </div>

            </div>

            <div className='w-10/12 mx-auto h-[144px] flex justify-between mt-[80px]'>
                <div className='w-[45%] font-semibold text-4xl'>
                   Get the skills you need for a 
                   <HighLightText text={'job that is in demand.'}/>
                </div>

                <div className='w-[45%] flex flex-col justify-between'>
                    <div className='text-[16px] leading-[24px]'>
                       The modern StudyNotion is the dictates its own terms.
                      Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <div className='max-w-[137px]'>
                        <YellowButton text={'Learn More'} linkto={'/signup'}/>
                    </div>
                </div>
            </div>

            <TimeLine />

            <Language />

        </div>


        {/* section 3 */}
        <div>
            <div className='w-10/12 mx-auto my-[100px] flex gap-[98px]'>
                <img src={instructorImage} className='w-[40%] whiteShadowUp'/>
                <div className='mx-[80px] flex flex-col justify-center gap-[20px]'>
                    <div className='heading1 text-richblack-5'>
                        Become an<br/>
                        <div className='-mx-3'><HighLightText text={'instructor'} /></div>
                    </div>
                    <div className='text1 text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. 
                        We provide the tools and skills to teach what you love.
                    </div>

                    <div className='pt-[52px] max-w-fit'>
                        <YellowButtonWithArrow text={'Start Learning Today'} linkto={'/signup'}/>
                    </div>
                </div>
            </div>

            <ReviewSection />
        </div>

        {/* Footer Section */}
        <Footer/>
        
    </div>
  )
}

export default Home
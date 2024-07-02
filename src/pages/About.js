import React from 'react'
import HighLightText from '../components/cors/HomePage/HighLightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import FoundingStoryImage from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/cors/AboutPage/Stats'
import ListGrid from '../components/cors/AboutPage/ListGrid'
import ContactUsSection from '../components/cors/AboutPage/ContactUsSection'
import ReviewSection from '../components/cors/HomePage/ReviewSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div>
       {/* section 1 */}
        <section className='text-white bg-richblack-800'>
            <div className='flex flex-col text-center mx-auto justify-center w-10/12'>
               <div className='m-10'>About Us</div>
               <div className='px-[52px] w-[913px] mx-auto'> 
                  <div className='font-semibold text-4xl'>
                      Driving Innovation in Online Education for a  <br/>
                      <span>
                          <HighLightText text="Brighter Future"/>
                      </span>
                  </div>
                  <div className='font-normal text-[16px] leading-[24px]'>
                    Studynotion is at the forefront of driving innovation in online education. 
                    We're passionate about creating a brighter future by offering cutting-edge courses, 
                    leveraging emerging technologies, and nurturing a vibrant learning community.
                  </div>
               </div>
            </div>

            <div className='flex  gap-x-4 justify-center relative top-20'>
                    <img src={BannerImage1} />
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
               </div>
        </section>

        {/* section 2 */}
        <div className='text-white mt-[100px]'>
            {/* <Quote/> */}

            <div className='flex w-10/12 p-20 gap-20 justify-center mx-auto'>
                <div className='w-[50%]'>
                   <div>Our Founding Story </div>

                   <div>
                     Our e-learning platform was born out of a shared vision and passion for transforming education.
                     It all began with a group of educators, technologists, and lifelong learners who recognized the need
                     for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world. <br/>

                     As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                     We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries.
                     We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                   </div>
                </div>

                <div className='w-[50%]'>
                    <img src={FoundingStoryImage}/>
                </div>
            </div>

            <div className='flex w-10/12 p-20 mx-auto gap-20'>
                <div className=''>
                    <div>Our Vision</div>
                    <div>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.
                        Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology 
                        with engaging content, fostering a dynamic and interactive learning experience.
                    </div>
                </div>

                <div>
                    <div>Our Mission</div>
                    <div>
                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners,
                    where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment
                    of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </div>
                </div>
            </div>
        </div>

        {/* section 3 */}
        <StatsComponent/> 

        {/* section 4 */}
        <ListGrid/> 

        {/* section 5 */}
        <div className='mb-20'>
          <ContactUsSection/>
        </div>

        {/* section 6 */}
        <div className='m-10'>
          <ReviewSection />
        </div>

        {/* Footer */}
        <Footer />
        
    </div>
  )
}

export default About
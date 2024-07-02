import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import Section from '../cors/Footer/Section'
import Section2 from '../cors/Footer/Section2'
// import {PiGoogleLogoDuotone} from 'react-icons/pi'
// import {BiLogoFacebook} from 'react-icons/bi'
// import {AiOutlineYoutube} from 'react-icons/ai'

const Footer = () => {
    
  return (
    <div className='bg-richblack-800 text-richblack-600 flex flex-col items-center gap-[32px] py-[52px] px-[120px]'>

            <div className='w-full h-[538px] flex justify-evenly'>
                <div className='flex gap-[25px]'>
                    <div className='section1'>
                        <img src={logo} alt='Study Notion Logo' className='w-[160px] h-[32px]'/>

                        <Section2 tag={'Company'}/>

                        {/* <div>
                            <CiFacebook/>
                            <PiGoogleLogoDuotone/>
                            <CiTwitter/>
                            <CiYoutube/>
                        </div> */}
                    </div>

                    <div className='section1'>
                        <Section2 tag={'Resources'} />
                        <Section2 tag={'Support'} />
                    </div>

                    <div className='section1'>
                        <Section2 tag={'Plans'} />
                        <Section2 tag={'Community'} />
                    </div>

                    
                </div>

                <div className='w-[1px] bg-richblack-400 h-full'></div>

                <div className='flex gap-[40px]'>
                    <Section tag={'Subjects'} />
                    <Section tag={'Languages'} />
                    <Section tag={'Career building'} />
                </div>
            </div>

            <div className='w-11/12 h-[1px] bg-richblack-600 '></div>

            <div className='w-11/12 h-[22px] flex items-center gap-[12px] justify-between'>
                <div className='flex gap-[8px] items-center'>
                    <div>Privacy Policy</div>
                    <div className='w-[1px] h-[12px] bg-richblack-600'></div>
                    <div>Cookie Policy</div>
                    <div className='w-[1px] h-[12px] bg-richblack-600'></div>
                    <div>Terms</div>
                </div>
                <div>Made with <span className='text-pink-200'>♥</span> CodeHelp © 2023 Studynotion</div>
            </div>

        </div>
  )
}

export default Footer
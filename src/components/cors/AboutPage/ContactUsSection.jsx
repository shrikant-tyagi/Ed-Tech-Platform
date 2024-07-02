import React from 'react'
import ContactForm from '../ContactUsPage/ContactForm'

const ContactUsSection = () => {
  return (
    <div className='text-richblack-5 mx-auto w-[650px]'>
       <div className='text-center flex flex-col gap-2'>
            <h2>Get in Touch</h2>
            <p>We'd love to here for you, Please fill out thid form.</p>
       </div>

        <ContactForm />
    </div>
  )
}

export default ContactUsSection
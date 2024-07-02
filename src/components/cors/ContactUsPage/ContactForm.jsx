import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import YellowButton from '../HomePage/YellowButton';
import toast from 'react-hot-toast';
import CountryCode from '../../../data/countrycode.json'

const ContactForm = () => {

    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    } = useForm();

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                firstname:"",
                lastname:"",
                email:'',
                message:'',
                phoneNo:""
            })
        }
    },[reset,isSubmitSuccessful])

    const submitContactForm = async(data) => {
        console.log("Logging Data : " ,data);
        setLoading(true);

        try{
            // const response = await apiConnector("POST" , contactUsEndpoint.CONTACT_US_API , data);
            const response = {staus : "OK"};
            console.log(response);

            toast.success("Your Form is successfully submitted.")
        } catch(err){
            console.log(err);
        }
    }

  return (
    <div className='mt-5 mx-auto flex'>
        <form onSubmit={handleSubmit(submitContactForm)} className='mx-auto flex flex-col gap-4'>
           <div className='flex gap-3'>
               <div>
                    <label className=''>First Name:<br/>
                            <input
                                className='text-richblack-700 w-fit'
                                id='firstname'
                                placeholder='Enter First Name'
                                type='text'
                                {...register("firstname",{required:true})}
                            />
                            {
                                errors.firstname &&(
                                    <span>
                                        Please Enter Your Name
                                    </span>
                                )
                            }
                        </label>
               </div>

                <div>
                    <label> Last Name: <br/>
                        <input placeholder='Enter last name' className='text-richblack-700'
                            type='text'
                            id='lastname'
                            {...register("lastname")}
                        />
                    </label>
                </div>
           </div>

            <div>
                <label> Enter Email Address : 
                    <input placeholder='Enter email address' className='text-richblack-700 w-full'
                            type='email'
                            id='email'
                            {...register("email",{required:true})}
                    />
                    {
                        errors.email && (
                        <span>
                            Please Enter Your Email
                        </span>
                        )
                    }
                </label>
            </div>

            <div className='flex w-full'>
                <label> Phone Number:
                    <div className='flex '>
                        <div className='w-[80px] text-richblack-700'>
                            <select id='dropdown' 
                                    className='w-[50px]'
                                    {...register("countryCode",{required:true})}>
                                {
                                    CountryCode.map((element , index) => (
                                        <option value={element.code} key={index}>
                                            {element.code} - {element.country}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='text-richblack-700'>
                            <input id='phoneNo'
                                    type='number'
                                    placeholder='12345 67890'
                                    className='w-[321px]'
                                    {...register("phoneNo",
                                                {
                                                    required:{value:true , message:"Please Enter PhoneNo"},
                                                    maxLength:{value:10 , message:"Invalid PhoneNo"},
                                                    minLength:{value:8,message:"Invalid PhoneNo"}
                                                }
                                            )
                                    }

                            />

                        </div>
                    </div>
                </label>
            </div>

            <div>
                <label> Enter message: <br/>
                    <textarea 
                        className='text-richblack-700 w-full'
                        id='message'
                        rows='5'
                        placeholder='Enter Your Message'
                        {...register("message",{required:true})}
                    />
                    {
                        errors.message && (
                            <span>
                                Enter Your Message
                            </span>
                        )
                    }
                </label>
            </div>

            <div className='w-full text-richblack-800 bg-yellow-50 p-3 rounded-lg text-center'>
                <button>Send Message</button>
            </div>
       </form>
    </div>
  )
}

export default ContactForm
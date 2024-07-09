import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ValidateOtp = ({name, email, password, profileImg, otp}) => {
  const [userInputOTP, setUserInputOTP] = useState(null);
  const navigate = useNavigate();

  // signup new user after validating otp
  const saveNewUnser = async()=>{
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImg', profileImg);
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/signup`,formData);
      if(data.success){
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }

  // handle submit otp
  const handleSubmitOtp = (e)=>{
    e.preventDefault();
    if(otp==userInputOTP){
      saveNewUnser();
      navigate('/login');
    }
    else{
      toast.error('Wrong OTP');
    }
  }


  return (
    <section>
        <div className='container mx-auto p-4 pt-[80px]'>
           <p className='w-full max-w-sm mx-auto text-md text-green-700 mb-4'>OTP has been sent to <b>{email}</b>. Kindly check your inbox or spam folder!</p> 
           
        <div className='bg-white w-full max-w-sm mx-auto small-dev-p p-5 shadow-md'>

          <form className='mt-3' onSubmit={handleSubmitOtp}>
            <div>
                <label>OTP:</label>
                <div className='bg-slate-100 p-2'>
                <input type='text' placeholder='enter otp' maxLength='6' required className='w-full outline-none bg-transparent text-slate-500' onChange={(e)=>setUserInputOTP(e.target.value)}/>
                </div>

                <div>
                    <input type='submit' value='Submit' className='w-fit bg-red-600 text-white px-[28px] py-[6px] sm:px-8 sm:py-2 mt-3 hover:bg-red-700 cursor-pointer mx-auto block rounded-full'/>
                </div>
            </div>
          </form>
        </div>
           
        </div>
    </section>
  )
}

export default ValidateOtp
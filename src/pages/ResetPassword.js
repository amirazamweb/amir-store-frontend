import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useResetEmail } from '../context/resetPasswordEmail';

const ResetPassword = () => {
  const [data, setData] = useState({password:'', confirmpassword:'', otp:''})
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState({msg:'', check:false});
  const [resetEmail, setResetEmail] = useResetEmail();
  const navigate = useNavigate();

//   onchange handler
  const handleOnChange = (e)=>{
    setData({
      ...data, [e.target.name]:e.target.value
     })
  }

  // check password match
  const handleChaeckPasswordMatch = (e)=>{
    if(e.target.value===data.password ){
      setIsPasswordMatch({
        msg:'password match!',
        check:true
      })
  }
  else{
    setIsPasswordMatch({
      msg:'password not match!',
      check:false
    })
  }
}

// reset Password Handler
  const resetPasswordHandler = async(e)=>{
    e.preventDefault();

    if(data.password!==data.confirmpassword){
        return toast.error('Confirm password not matched')
    }

      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/reset-password`, {
            otp:data.otp, email:resetEmail, password:data.password
        }); 

        if(res?.data?.success){
            toast.success(res?.data?.message);
            navigate('/login');
        }
        else{
            toast.error(res?.data?.message);
        }

      } catch (error) {
        toast.error('Something went wrong!');
      }

  }

//   use Effect
useEffect(()=>{
    if(!resetEmail){
      navigate('/forgot-password')
    }
}, [])


  return (
    <section>
        <div className='container mx-auto px-4 pt-[50px] md:pt-[70px]'>
        <div className='w-full max-w-sm mx-auto text-sm text-red-500 mb-2 text-center'>For otp, check your inbox or spam folder in your email</div>
        <div className='bg-white w-full max-w-sm mx-auto small-dev-p p-5 shadow-md'>
        <div className='text-xl font-semibold text-center'>Change password</div>
          <form className='mt-3' onSubmit={resetPasswordHandler}>
            <div>
                <label>OTP:</label>
                <div className='bg-slate-100 p-2 mb-2'>
                <input type='text' placeholder='enter otp' name='otp' maxLength='6' required className='w-full outline-none bg-transparent text-slate-500' onChange={handleOnChange}/>
                </div>

                <label>Password:</label>
                <div className='bg-slate-100 p-2 flex items-center mb-2'>
                <input type={showPassword? 'text':'password'} placeholder='enter password' name='password' maxLength='10'  required className='w-full outline-none bg-transparent text-slate-500' onChange={handleOnChange}/>
  
                <div className='cursor-pointer text-slate-600 p-1' onClick={()=>setShowPassword((prev)=>!prev)}>
                    <span>
                        {
                            showPassword?(
                                <FaEyeSlash/>
                            ):(
                                <FaEye/> 
                            )
                        }
                    
                    </span>
                 </div>
                </div>
  
              <label>Confirm Password:</label>
                <div className='bg-slate-100 p-2 flex items-center mb-2'>
                <input type={showConfirmPassword? 'text':'password'} placeholder='enter confirm password' name='confirmpassword' maxLength='10' required className='w-full outline-none bg-transparent text-slate-500' onChange={(e)=>{
                  handleOnChange(e);
                  handleChaeckPasswordMatch(e)
                }}/>
  
                <div className='cursor-pointer text-slate-600 p-1' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                    <span>
                        {
                            showConfirmPassword?(
                                <FaEyeSlash/>
                            ):(
                                <FaEye/> 
                            )
                        }
                    </span>
                 </div>
                </div>
  
                {
                isPasswordMatch.check?(
                  <p className='text-[13px] text-green-400'>{isPasswordMatch.msg}</p>
                ):
                (
                  <p className='text-[13px] text-red-400'>{isPasswordMatch.msg}</p>
                )
              }
  
                <div>
                    <input type='submit' value='Reset' className='w-fit bg-[#FE4938] text-white px-[32px] py-[7px] mt-3 hover:bg-red-700 cursor-pointer mx-auto block rounded-full'/>
                </div>
            </div>
          </form>
        </div>
           
        </div>
    </section>
  )
}

export default ResetPassword
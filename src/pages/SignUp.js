import React, { useState } from 'react';
import loginIcon from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ValidateOtp from '../components/ValidateOtp';
import { useAuth } from '../context/auth';
import Loader from '../components/Loader';

const SignUp = () => {
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:'',
    profileImg:''
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState({msg:'', check:false});
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [auth] = useAuth();

  // handle Upload Profile Image
  const handleUploadProfileImg = (e)=>{
     setUserData({...userData, profileImg:e.target.files[0]});
  }

  const handleOnChange = (e)=>{
    setUserData({
      ...userData, [e.target.name]:e.target.value
     })
  }

  // check password match
  const handleChaeckPasswordMatch = (e)=>{
    if(e.target.value===userData.password ){
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

// handle signup
  const handleSignup = async(e)=>{
    e.preventDefault();
    const generateOTP = Math.floor((Math.random()*900000)+100000);
    setOtp(generateOTP);
    if(!userData.profileImg){
      return toast.error('Profile image is required!');
    }

    if(userData.password!==userData.confirmpassword){
      return toast.error('Confirm password not matched!');
    }

      try {
        const {name, email} = userData;
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/signup-otp`, {name, email, generateOTP}); 

        if(data?.success){
          setShowOtp(true);
          toast.success(data?.message);
        }

        else{
          toast.error(data?.message);
        }

      } catch (error) {
        toast.error('Something went wrong!');
      }

  }


  return (
    auth?.token?
    (<Loader redirect='/'/>):
    (showOtp?
      <ValidateOtp name={userData.name} email={userData.email} password={userData.password} profileImg={userData.profileImg} otp={otp}/>:
      <section>
        <div className='container mx-auto p-4'>
           
        <div className='bg-white w-full max-w-sm mx-auto p-5 shadow-md small-dev-p'>
          <div className='w-20 h-20 mx-auto rounded-full overflow-hidden drop-shadow-md shadow-md relative'>
            <img src={userData.profileImg ? URL.createObjectURL(userData.profileImg) : loginIcon} alt='login-icon'/>
             <label htmlFor='profilepic'>
              <div className='absolute bottom-0 w-full h-1/3 bg-slate-500 text-center text-sm cursor-pointer text-white bg-opacity-90'>Upload</div>
              <input type='file' id='profilepic' accept='image/*' hidden onChange={handleUploadProfileImg}/>
             </label>
          </div>
  
          <form className='mt-3' onSubmit={handleSignup}>
            <div>
            <label>Name:</label>
                <div className='bg-slate-100 p-2 mb-2'>
                <input type='text' placeholder='enter name' name='name' required className='w-full outline-none bg-transparent text-slate-500' onChange={handleOnChange}/>
                </div>
  
                <label>Email:</label>
                <div className='bg-slate-100 p-2 mb-2'>
                <input type='email' placeholder='enter email' name='email' required className='w-full outline-none bg-transparent text-slate-500' onChange={handleOnChange}/>
                </div>
  
                <div className='mt-1'></div>
  
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
                    <input type='submit' value='Sign Up' className='w-fit bg-[#FE4938] text-white px-[32px] py-[7px] mt-3 hover:bg-red-700 cursor-pointer mx-auto block rounded-full'/>
                </div>
            </div>
          </form>
  
          <p className='mt-2 text-sm'>Already have account? <Link to={'/login'} className='hover:text-red-700 hover:underline'>Login</Link></p>
        </div>
           
        </div>
    </section>)
  )
}

export default SignUp
import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../context/auth';
import Loader from '../components/Loader';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [loginData, setloginData] = useState({
      email: '',
      password:''
    })

    // handle on change
    const handleOnChange = (e)=>{
      setloginData({
        ...loginData, [e.target.name]:e.target.value
       })
    }


    // handle login
    const handleLogin = async(e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/login`, loginData); 
        if(data.success){
          toast.success(data.message);
          localStorage.setItem('amir_store_auth', JSON.stringify({user:data.user, token:data.token}));
          setAuth({...auth, user:data.user, token:data.token});
          navigate(data?.user.role?'/admin/all-orders':'/user/user-order');
        }
        else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Something went wrong!');
        console.log(error);
      }
    }
    
  return (
    auth?.token?
    (<Loader redirect='/'/>):
    (<section>
      <div className='container mx-auto p-4'>
         
      <div className='bg-white w-full max-w-sm mx-auto small-dev-p p-5 shadow-md'>
        <div className='w-20 h-20 mx-auto g-red-700 rounded-full overflow-hidden'>
          <img src={loginIcon} alt='login-icon'/>
        </div>

        <form className='mt-3' onSubmit={handleLogin}>
          <div>
              <label>Email:</label>
              <div className='bg-slate-100 p-2 mb-2'>
              <input type='email' placeholder='enter email' name='email' required className='w-full outline-none bg-transparent text-slate-500' onChange={handleOnChange}/>
              </div>

              <div className='mt-1'></div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex items-center'>
              <input type={showPassword? 'text':'password'} placeholder='enter password' name='password' maxLength='10' required className='w-full outline-none bg-transparent text-slate-500' onChange={handleOnChange}/>

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

              <Link to={'/forgot-password'} className='block w-fit ml-auto text-sm hover:text-red-700 hover:underline'>
                  Forgot password?
                  </Link>

              <div>
                  <input type='submit' value='Login' className='w-fit bg-[#FE4938] text-white px-[32px] py-[7px] mt-3 hover:bg-red-700 cursor-pointer mx-auto block rounded-full'/>
              </div>
          </div>
        </form>

        <p className='mt-2 text-sm'>Don't have account? <Link to={'/signup'} className='hover:text-red-700 hover:underline'>Sign up</Link></p>
      </div>
         
      </div>
  </section>)
  )
}

export default Login
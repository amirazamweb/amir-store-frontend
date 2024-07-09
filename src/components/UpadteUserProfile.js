import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useBg } from '../context/bg';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../context/auth';

const UpdateUserProfile = () => {
    const [bg, setBg] = useBg();
    const[auth, setAuth] = useAuth();
    const {_id, name, email} = auth?.user;
    const [newUserData, setNewUserData] = useState({name, email, profileImg:''})
    const profileImageURL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/profile-img/${_id}`


    // handleOnChange
    const handleOnChange = (e)=>{
      e.preventDefault();
      setNewUserData({...newUserData, [e.target.name]:e.target.value});
    }

    // handle Upload Profile Image
  const handleUploadProfileImg = (e)=>{
    setNewUserData({...newUserData, profileImg:e.target.files[0]});
 }


    // updateProfileHandler
    const updateProfileHandler = async(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', newUserData.name);
        formData.append('email', newUserData.email);
        if(newUserData.profileImg){
        formData.append('profileImg', newUserData.profileImg);
        }
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/update-profile`,formData);
            if(data?.success){
                toast.success(data?.message);
                localStorage.setItem('amir_store_auth', JSON.stringify({...auth, user:data?.updatedUser}))
                setAuth({...auth, user:data?.updatedUser});
                setBg({...bg, darkBg: false, updateProfile:false});
            }
        } catch (error) {
            console.log(error);
        }
    }

    
  return (
    <div className= 'w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-30'>
        <div className='bg-white max-w-sm w-full px-6 py-4 relative shadow-md'>
             
            <div className='w-20 h-20 mx-auto rounded-full overflow-hidden drop-shadow-md shadow-md relative'>
                <img src={newUserData.profileImg ? URL.createObjectURL(newUserData.profileImg) : profileImageURL} alt='login-icon'/>
                 <label htmlFor='profilepic'>
                  <div className='absolute bottom-0 w-full h-1/3 bg-slate-500 text-center text-sm cursor-pointer text-white bg-opacity-90'>Upload</div>
                  <input type='file' id='profilepic' accept='image/*' hidden onChange={handleUploadProfileImg} />
                  </label>
             </div>

             <form className='mt-1' onSubmit={updateProfileHandler}>
            <div>
            <label>Name:</label>
                <div className='bg-slate-100 p-2 mb-2'>
                <input type='text' placeholder='enter name' name='name' defaultValue={name} required className='w-full outline-none bg-transparent text-slate-500' onChange={handleOnChange}/>
                </div>
  
                <label>Email:</label>
                <div className='bg-slate-100 p-2 mb-2'>
                <input type='email' placeholder='enter email' name='email' value={email} className='w-full outline-none bg-transparent text-slate-500'/>
                </div>
  
                <div>
                    <input type='submit' value='Update' className='w-fit bg-[#FE4938] text-white px-3 py-1 mt-3 cursor-pointer mx-auto block rounded-md'/>
                </div>
            </div>
          </form>

            <div className='absolute top-2 right-4 text-[#FE4938] text-xl p-1 cursor-pointer' 
            onClick={()=>setBg({...bg, darkBg: false, updateProfile:false})}>
              <IoClose />
            </div>
        </div>
    </div>
  )
}

export default UpdateUserProfile
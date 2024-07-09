import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useBg } from '../context/bg';
import axios from 'axios';
import toast from 'react-hot-toast'

const ChangeUserRole = ({id, name, email, role, getAllUersByPaginationHandler,paginationPageNumber}) => {
    const [bg, setBg] = useBg();
    const [newRole, setNewRole] = useState(role);

    // change role handler
    const changeRoleHandler = async()=>{
      try {
        if(newRole==role){
          return toast.error("You haven't selected new role");
        }
        const res = window.confirm('Are you sure want to update the role?');
        if(!res){
          return
        }
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/update-user/${id}`, {role:newRole});
        if(data.success){
          getAllUersByPaginationHandler(paginationPageNumber);
          toast.success(data.message);
          setBg({...bg, darkBg:false, userRole:false});
        }
      } catch (error) {
        toast.error('Something went wrong')
      }
    }
  return (
    <div className= 'w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-30'>
        <div className='bg-white max-w-sm w-full px-6 py-4 relative shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Change User Role</h3>
            <p className='mb-1'><span className='font-semibold'>Name:</span> {name}</p>
            <p className='mb-2'><span className='font-semibold'>Email:</span> {email}</p>
            <div className='mb-3'>
                <span className='me-6 font-semibold'>Role:</span>

                 <select className='border border-slate-300 px-4 text-md outline-none' onChange={(e)=>setNewRole(e.target.value)}>
                    <option selected={role==0 && true} value='0'>User</option>
                    <option selected={role==1 && true} value='1'>Admin</option>
                 </select>
            </div>
            <div className='text-center'>
            <button className='bg-[#FE4938] text-white text-center px-4 py-1 rounded-md' onClick={changeRoleHandler}>
              Change Role
            </button>
            </div>

            <div className='absolute top-2 right-4 text-[#FE4938] text-xl p-1 cursor-pointer' 
            onClick={()=>setBg({...bg, darkBg:false, userRole:false})}>
              <IoClose />
            </div>
        </div>
    </div>
  )
}

export default ChangeUserRole
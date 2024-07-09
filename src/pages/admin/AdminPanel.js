import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/auth';
import { FaUsers } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa6";
import toast from 'react-hot-toast'
import { FiEdit2 } from "react-icons/fi";
import UpdateUserProfile from '../../components/UpadteUserProfile';
import { useBg } from '../../context/bg';


const AdminPanel = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false); 
    const navigate = useNavigate();
    const [bg, setBg] = useBg();

    // logout handler
    const logoutHandler = ()=>{
      localStorage.removeItem('amir_store_auth')
      setAuth({ user: null, token: '' });
      toast.success('User logout successfully!');
      navigate('/login');
    }

    // calling protected api
    useEffect(()=>{
        const authCheck = async()=>{
          const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/admin`, 
            {token: `Bearer ${auth?.token}`}
          );
          
          if(data?.ok){
            setOk(true);
          }
          else{
            localStorage.removeItem('amir_store_auth')
            setAuth({ user: null, token: '' });
            navigate('/login');
          }
        }

        auth.token && authCheck();
    }, [auth.token])

    // update Profile Handler
    const updateProfileHandler = ()=>{
      setBg({...bg, darkBg: true, updateProfile:true})
    }

  return (
    ok?(
      <div className='min-h-[calc(100vh-104px)] hidden md:flex'>
      <aside className='min-h-full w-full max-w-60 bg-white customShadow relative'>
          <div className='h-40 flex justify-center items-center flex-col gap-[2px] bg-slate-200 adminCustoms relative group'>
              <div>
                  <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/profile-img/${auth?.user._id}`} alt='profile-img' className='w-16 h-16 rounded-full border border-slate-500'/>
              </div>
              <p className='text-[16px] text-[#FE4938] font-semibold text-md'>{auth?.user.name}</p>
              <p className='text-[14px] text-[#130f40] font-semibold'>{auth?.user.role?'Admin':'User'}</p>

              <div className='absolute hidden top-2 right-3 p-2 bg-slate-300 rounded-full text-md text-slate-600 cursor-pointer group-hover:block' onClick={updateProfileHandler}>
              <FiEdit2 />
              </div>
          </div>
          <div className='pt-4'>
            <nav className='flex flex-col gap-1 px-4'>
              <NavLink to='/admin/all-users' className='flex items-center gap-2 bg-slate-100 px-3 py-1'><FaUsers /> <span>All Users</span></NavLink>

              <NavLink to='/admin/all-products' className='flex items-center gap-2 bg-slate-100 px-3 py-1'><AiFillProduct /><span>All Products</span></NavLink>

              <NavLink to='/admin/all-orders' className='flex items-center gap-2 bg-slate-100 px-3 py-1'><FaCartArrowDown />
              <span>All Orders</span></NavLink>

              <NavLink to='/admin/admin-order' className='flex items-center gap-2 bg-slate-100 px-3 py-1'><FaCartFlatbedSuitcase />
              <span>My Order</span></NavLink>
            </nav>
          </div>

          <div className='absolute bottom-4 px-7'>
            <button className='bg-[#FE4938] text-white text-sm px-4 py-1 rounded-sm flex items-center gap-1' onClick={logoutHandler}>
              <span>Logout</span> <RiLogoutCircleRLine />
            </button>
          </div>
      </aside>
      <main className='w-full relative'>
         <Outlet/>
      </main>

      {bg?.updateProfile && <UpdateUserProfile/>}

  </div>
  ):
  (<Loader redirect={auth.token?'/':'/login'}/>)
  )
}

export default AdminPanel;
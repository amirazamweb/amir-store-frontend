import React, {useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assest/logo.png'
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';


const Header = () => {
const [auth, setAuth] = useAuth();
const navigate = useNavigate();
const[cart] = useCart();
const [searchData, setSearchData] = useState('');
const [showMobileLogoutBtn, setShowMobileLogoutBtn] = useState(false);

// serch handler
const searchHandler = ()=>{
  navigate(`/search?query=${searchData}`);
  setSearchData('');
}


// mobileLogoutHandler
const mobileLogoutHandler = ()=>{
  localStorage.removeItem('amir_store_auth')
  setAuth({ user: null, token: '' });
  toast.success('User logout successfully!');
  navigate('/login');
}


  return (
    <header className='h-16 bg-[#f7f1e3] customHeaderStyle sticky top-0 left-0 z-10'>
      <div className='h-full container mx-auto flex items-center px-2 md:px-4 justify-between'>
        <div>
          <Link to={'/'}><img src={logo} alt='logo' className='h-[70px] sm:h-[80px]'/></Link>
        </div>

        <div className='hidden lg:flex items-center w-full h-8 justify-between max-w-sm border-red-200 border rounded-2xl focus-within:shadow'>
          <input type='text' placeholder='search product here......' className='w-full h-full outline-none pl-4 rounded-l-2xl' onChange={(e)=>setSearchData(e.target.value)} value={searchData}/>
          <div className='bg-[#FE4938] text-lg text-white h-full min-w-[50px] flex items-center justify-center rounded-r-2xl border-2 border-[#FE4938] cursor-pointer' onClick={searchHandler}>
          <CiSearch/>
          </div>
        </div>

        <div className='flex items-center gap-6 sm:gap-10'>

          <Link to='/cart' className='text-2xl cursor-pointer relative'>
          <span><FaShoppingCart /></span>
          <div className='bg-[#FE4938] text-white w-5 h-5 p-1 flex justify-center items-center rounded-full absolute -top-3 -right-3'>
            <p className='text-xs'>{cart.length}</p>
          </div>
          </Link>

          <div>
            {auth?.token?
            (<div className='relatiev' onClick={()=>setShowMobileLogoutBtn((val)=>!val)}>
             <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/profile-img/${auth?.user._id}`} alt='profile-img' className='h-8 w-8 rounded-full cursor-pointer' onClick={()=>navigate(auth?.user.role?'/admin/all-orders':'/user/user-order')}/>

             {showMobileLogoutBtn && <button className='absolute bg-red-500 text-sm text-white px-1 py-0 top-14 right-2 md:hidden' onClick={mobileLogoutHandler}>Logout</button>}
              
            </div>):
            (<Link to={'/login'} className='px-3 py-1 rounded-full bg-[#FE4938] text-white hover:bg-red-700'>Login</Link>) 
          }       
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header
import React from 'react'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast'

const CartSummary = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    
    // calculatr total mrp
    const calculateTotalMRP = ()=>{
        let mrp = 0;
        for(let i of cart){
            mrp += (i.price*i.qty);
        }
        return mrp;
    }

    // calculate total discount
    const totalDiscount = ()=>{
        let mrp = 0;
        for(let i of cart){
            mrp += (i.price*i.qty);
        }

        let sp = 0;
        for(let i of cart){
            sp += (i.sellingPrice*i.qty);
        }

        return mrp-sp;
    }

    // calcualte total payable amount
    const totalPayableAmount = ()=>{
        let sp = 0;
        for(let i of cart){
            sp += (i.sellingPrice*i.qty);
        }

        return sp;
    }

    // orderPlaceHandler
    const orderPlaceHandler = async()=>{
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/order`, {
                products:[...cart],
                buyer : auth?.user._id
            });
            
            if(data?.success){
               localStorage.removeItem('amir_store_cart');
               setCart([]);
               toast.success(data?.message);
               navigate(auth?.user.role?'/admin/admin-order':'/user/user-order');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-full md:w-80 px-3 md:px-0'>
        <h1 className='text-center py-1 text-lg font-semibold'>Summary</h1>
        <hr className='my-2'/>
       <div className='text-sm text-slate-700 flex flex-col gap-2'>
       <p>Price Details ({cart.length} items)</p>
        <div>
            <span>Total MRP</span>
            <span className='float-right'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format(calculateTotalMRP())}</span>
        </div>
        <div>
            <span>Discount on MRP</span>
            <span className='float-right text-[#16A085]'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format(totalDiscount())}</span>
        </div>
       </div>
        <hr className='my-2'/>
        <div className='text-[15px] font-semibold'>
            <span>Total Amount</span>
            <span className='float-right'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format(totalPayableAmount())}</span>
        </div>
        {
            auth?.token?
            (
                <button className='w-full bg-[#FE4938] text-white py-1 mt-4' onClick={orderPlaceHandler}>Place Order</button>
            ):
            (
                <button className='w-full bg-[#FE4938] text-white py-1 mt-4' onClick={()=>navigate('/login')}>Login to Continue</button>
            )
        }
    </div>
  )
}

export default CartSummary
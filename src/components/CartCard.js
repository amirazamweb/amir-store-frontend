import React, { useState } from 'react';
import { MdArrowDropDown } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useBg } from '../context/bg';
import { useCartQuantityData } from '../context/cartQuantityContext';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast'

const CartCard = ({product}) => {
  const [bg, setBg] = useBg();
  const [cartQuantityData, setCartQuantityData] = useCartQuantityData();
  const [cart, setCart] = useCart();

  // quantityPopupHandler
  const quantityPopupHandler = ()=>{
    setCartQuantityData(product);
    setBg({...bg, darkBg:true, showCartQuantity:true});
  }


  // removeCartProductHandler
  const removeCartProductHandler = ()=>{
    const filteredData = cart.filter((data)=>{
      if(data._id==product._id){
        return false;
      }
      return true;
    })

    setCart(filteredData);
    localStorage.setItem('amir_store_cart', JSON.stringify(filteredData));
    toast.success('Product removed!')
  }

  return (
    <div className='w-full max-w-[580px] bg-white border mb-2 flex p-2 relative'>
        <div className='w-[20%] h-24 md:h-28 p-2 bg-slate-100'>
            <img src={product?.productImage[0]} alt='product-image' className='w-full h-full object-scale-down mix-blend-multiply'/>
        </div>
        <div className='w-[80%] ps-2 pe-6 md:ps-4 md:pe-12 flex flex-col gap-0.5 md:gap-1'>
           <h1 className='font-semibold text-ellipsis line-clamp-1'>{product?.productName}</h1>
           <p className='text-slate-400 capitalize text-[14.2px]'>{product?.category}</p>
           <div className='text-sm flex font-semibold items-center gap-6'>
                <p>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format((product?.sellingPrice)*product?.qty)}</p>
        
               <p className='text-slate-400 line-through font-light'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format((product?.price)*product?.qty)}</p>

               <p className='text-red-500 font-light'>{Math.floor((((product?.price)-(product?.sellingPrice))/(product?.price))*100)}% OFF</p>
            </div>
            <div className='flex items-center text-[14px] font-semibold bg-slate-100 w-fit px-2 cursor-pointer' onClick={quantityPopupHandler}>
                <span>Qty: {product?.qty}</span> 
                <MdArrowDropDown className='text-xl'/>
            </div>
        </div>

    <div className='absolute top-1 right-2 p-1 cursor-pointer text-xl hover:text-red-600' onClick={removeCartProductHandler}>
      <IoCloseOutline />
    </div>

    </div>
  )
}

export default CartCard
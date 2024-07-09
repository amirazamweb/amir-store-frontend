import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useBg } from '../context/bg';
import { useCartQuantityData } from '../context/cartQuantityContext';
import { useCart } from '../context/cart';

const CartQuantity = () => {
    const [bg, setBg] = useBg();
    const qauntityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [cartQuantityData] = useCartQuantityData();
    const [cart, setCart] = useCart();
    const [qty, setQty] = useState(cartQuantityData.qty);

    // changeQuantityHandler
    const changeQuantityHandler = (e)=>{
      setQty(e.target.innerText);
    }

    // update product qty handler
    const updateQuantityHanbdler = ()=>{
        const updatedData = cart.map((d)=>{
         if(d._id==cartQuantityData._id){
          return {...d, qty: qty}
         }

         return d;
      })

      setCart(updatedData);
      localStorage.setItem('amir_store_cart', JSON.stringify(updatedData));
      setBg({...bg, darkBg:false, showCartQuantity:false});
    }

  return (
    <div className= 'w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-30 p-2'>
        <div className='bg-white max-w-sm px-3 py-3 md:px-6 md:py-4 relative'>
            <h3 className='text-lg font-semibold mb-2'>Select Quantity</h3>
            <div className='flex gap-3 flex-wrap mb-2'>
                {qauntityArr.map((q, i)=>{
                    return <div 
                    className='p-4 border rounded-full w-10 h-10 flex justify-center items-center cursor-pointer' 
                    style={{borderColor: `${qty==q?'#FE4938':'#bdc3c7'}`}}
                    onClick={changeQuantityHandler} 
                    key={q*i}>{q}</div>
                })}
            </div>
            <button className='bg-[#FE4938] text-white text-center px-2 py-1 w-full' onClick={updateQuantityHanbdler}>
              Done
            </button>

            <div className='absolute top-2 right-4 text-[#FE4938] text-xl p-1 cursor-pointer'
            onClick={()=>setBg({...bg, darkBg:false, showCartQuantity:false})}>
              <IoClose />
            </div>
        </div>
    </div>
  )
}

export default CartQuantity
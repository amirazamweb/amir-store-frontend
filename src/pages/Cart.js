import React from 'react'
import { useCart } from '../context/cart'
import CartCard from '../components/CartCard';
import { useBg } from '../context/bg';
import CartQuantity from '../components/CartQuantity';
import CartSummary from '../components/CartSummary';
import emptyCart from '../assest/empty-cart.png'

const Cart = () => {
    const [cart] = useCart();
    const [bg] = useBg();
  return (
    <div className='container mx-auto'>
       {
        cart.length>0 ?
        (
          <div className='flex flex-col md:flex-row justify-center gap-3 md:gap-20'>
        <div className='pt-2 md:pt-4 px-3 md:px-0'>
         <div>
          <h1 className='text-lg md:text-xl font-semibold mb-3'>My Cart</h1>
          <div className='max-h-[calc(100vh-180px)] overflow-x-auto'>
          {
            cart.map((c, i)=>{
              return <CartCard product={c} key={c?.productName+i}/>
            })
           }
          </div>
         </div>
        </div>
       
        <div className='pt-0 md:pt-16'>
        <CartSummary/>
        </div>
       </div>
        ):
        (
          <div className='w-full max-w-[170px] h-[calc(100vh-170px)] mx-auto flex justify-center items-center'>
            <img src={emptyCart} alt='empty-cart' className='w-full'/>
          </div>
        )
       }

       {bg?.showCartQuantity && <CartQuantity/>}
    </div>
  )
}

export default Cart
import React from 'react'
import { MdClose } from "react-icons/md";
import { useBg } from '../context/bg';

const ZoomProduct = ({url}) => {
    const [bg, setBg] = useBg();
    // closeZoomProductHandler
    const closeZoomProductHandler = ()=>{
       setBg({...bg, showZoomProduct:false});
    }


  return (
    <div className='w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-40'>
        <div className='h-[90vh] w-[40%] bg-slate-200 relative'>
        <img src={url}
        alt='zoom-pic' className='h-full mx-auto object-scale-down mix-blend-multiply'/> 

         <div className='absolute top-[-22px] right-[-22px] text-xl text-red-600 cursor-pointer p-1' onClick={closeZoomProductHandler}>
         <MdClose />
         </div>
        </div>
    </div>
  )
}

export default ZoomProduct
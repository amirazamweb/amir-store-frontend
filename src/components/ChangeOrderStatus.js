import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useBg } from '../context/bg';
import axios from 'axios';
import toast from 'react-hot-toast'

const ChangeOrderStatus = ({id, status, getAllOrdersByPaginationHandler, paginationPageNumber}) => {
    const [bg, setBg] = useBg();
    const [newOrderStatus, setNewOrderStatus] = useState(status);

    const statusArr = ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    // change status handler
    const changeStatusHandler = async()=>{
      try {
        if(newOrderStatus==status){
          return toast.error("You haven't changed status");
        }
        const res = window.confirm('Are you sure want to update the status?');
        if(!res){
          return
        }
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/update-order-status/${id}`, {orderStatus:newOrderStatus});
        if(data.success){
            getAllOrdersByPaginationHandler(paginationPageNumber);
          toast.success(data.message);
          setBg({...bg, darkBg:false, orderStatus:false});
        }
      } catch (error) {
        toast.error('Something went wrong')
      }
    }
  return (
    <div className= 'w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-30'>
        <div className='bg-white max-w-sm w-full px-6 py-4 relative shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Change Order Status</h3>
            <p className='mb-2'><span className='font-semibold'>Order ID:</span> {id.slice(-10)}</p>
            <div className='mb-3'>
                <span className='me-6 font-semibold'>Order Status:</span>

                 <select className='border border-slate-300 px-4 text-md outline-none' onChange={(e)=>setNewOrderStatus(e.target.value)}>
                    {
                        statusArr?.map((statusVal)=>{
                            return <option selected={statusVal==status && true} value={statusVal} key={statusVal}>
                                {statusVal}
                                </option>
                        })
                    }
                 </select>
            </div>
            <div className='text-center'>
            <button className='bg-[#FE4938] text-white text-center px-4 py-1 rounded-md' onClick={changeStatusHandler}>
              Update Status
            </button>
            </div>

            <div className='absolute top-2 right-4 text-[#FE4938] text-xl p-1 cursor-pointer' 
            onClick={()=>setBg({...bg, darkBg:false, orderStatus:false})}>
              <IoClose />
            </div>
        </div>
    </div>
  )
}

export default ChangeOrderStatus
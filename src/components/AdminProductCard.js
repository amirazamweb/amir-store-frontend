import React from 'react';
import { MdEdit } from "react-icons/md";
import { useBg } from '../context/bg';
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminProductCard = ({data, callBack, currentPage}) => {
    const [bg, setBg] = useBg();

    const showUdateProductHandler = ()=>{
      callBack(data)
      setBg({...bg, darkBg:true, showUpdateProduct:true});
    }

    // deleteProductHandler
    const deleteProductHandler = async()=>{
      const confirm = window.confirm('Are you sure want to delete the product?');
      if(!confirm){
        return
      }
          try {
            const res = await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/delete/${data?._id}`);
            if(res?.data?.success){
              currentPage[3](currentPage[1]);
              currentPage[0](currentPage[1], currentPage[2]);
               toast.success(res?.data?.message);
            }
          } catch (error) {
            console.log(error);
          }
        }


  return (
    <div className='border border-slate-300 w-[15.5%] rounded-sm group shadow-sm hover:border-slate-400 pt-1'>
        <div className='h-[100px]'>
        <img src={data?.productImage[0]} alt='admin-product-card' className='h-full mx-auto object-scale-down mix-blend-multiply'/>
        </div>
        <div className='p-2'>
        <hr/>
        <p className='text-[14.5px] font-semibold text-[#FE4938] text-ellipsis line-clamp-1'>{data?.productName}</p>
        <p className='text-sm text-[#2c2c54]'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(data?.sellingPrice)}</p>

        <div className='flex items-center justify-between'>
        <span className='w-fit bg-green-100 rounded-full p-1 hover:bg-green-500 hover:text-white cursor-pointer' onClick={showUdateProductHandler}>
            <MdEdit/>
        </span>
        <span className='w-fit bg-red-100 rounded-full p-1 hover:bg-red-500 hover:text-white cursor-pointer' onClick={deleteProductHandler}>
        <MdDeleteOutline />
        </span>
        </div>
        </div>

    </div>
  )
}

export default AdminProductCard
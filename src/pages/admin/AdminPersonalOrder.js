import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment';
import Spinner from '../../components/Spinner';

const AdminPersonalOrder = () => {
    const [auth] = useAuth();
    const [orderList, setOrderList] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    // get user order
    const getUserOrders = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/user-order/${auth?.user._id}`); 
            if(data?.success){
                setOrderList(data?.orders);
                setShowLoader(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // use Effect
    useEffect(()=>{
        getUserOrders();
    })


  return (
    showLoader?(
      <Spinner/>
    ):
    (
        <div className='px-8 py-6 max-h-[calc(100vh-104px)] h-full overflow-auto relative'>
    <h1 className='text-xl font-semibold text-[#2c2c54]'>My Orders</h1>
        {
            orderList.length>0?
            (
                orderList?.map((order, i)=>{
                    return <React.Fragment key={i}>
                    <table className='orderTable w-full'>
                               <thead>
                                  <tr>
                                     <th>Order ID</th>
                                     <th>Status</th>
                                     <th>Ordered At</th>
                                     <th>Quantity</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr className='bg-white'>
                                       <td>{order?._id.slice(-10)}</td>
                                       <td>{order?.status}</td>
                                       <td>{moment(order?.createdAt).fromNow()}</td>
                                       <td>{order?.products?.length}</td>
                                   </tr>
                               </tbody>
                           </table>
       
                                 {
                                       order?.products?.map((product)=>{
                                        return <div className='w-full border my-1 h-32 flex'>
                                           <div className='p-2 h-full w-36 border border-t-0 border-l-0 border-r-1 border-b-0'>
                                           <img src={product?.productImage[0]} className='bg-white w-full h-full object-scale-down mix-blend-multiply' alt='cart-image'/>
                                           </div>
                                           <div className='px-4 py-2 max-w-md flex flex-col justify-center'>
                                              <p className='font-semibold text-ellipsis line-clamp-1'>{product?.productName}</p>
                                              <p className='text-slate-500 text-[14.3px] text-ellipsis line-clamp-1'>{product?.brandName}</p>
                                              <p className='text-red-600'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format(product?.sellingPrice)}</p>
                                           </div>
                                        </div>
                                       })
                                   }
       
                           </React.Fragment>
                   })
            ):
            (<div className='text-slate-600 mt-2'>You have not ordered yet</div>)
        }
    </div>
    )
  )
}

export default AdminPersonalOrder
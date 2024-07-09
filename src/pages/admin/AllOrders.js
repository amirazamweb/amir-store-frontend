import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import moment from 'moment'
import Spinner from '../../components/Spinner';
import { BiSolidEdit } from "react-icons/bi";
import { useBg } from '../../context/bg';
import ChangeOrderStatus from '../../components/ChangeOrderStatus';

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [auth] = useAuth();
    const [showLoader, setShowLoader] = useState(true);
    const [bg, setBg] = useBg();
    const [orderStatusPopupData, setOrderStatusPopupData] = useState({id:'', status:'Not Process'});
    const [pageCount, setPageCount] = useState(1);
    const [paginationPageNumber, setPaginationPageNumber] = useState(1);

    // getting all orders count
    const getAllOrdersCountHandler = async()=>{
        try {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/all-orders`);
        if(data?.success){
            const count = Math.ceil((data?.allOrders.length)/19);
            setPageCount(count);
        }
        } catch (error) {
            console.log('Something went wrong');
        }
     }

     //  all orders count effect
        useEffect(()=>{
            getAllOrdersCountHandler();
        },[]);

    
    //getAllOrdersByPagination
    const getAllOrdersByPaginationHandler = async(page)=>{
       try {
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/all-orders/${page}`);
        if(data?.success){
        setAllOrders(data?.orders);
        setShowLoader(false);
        }
       } catch (error) {
        console.log('Something went wrong');
       }
    }
    
    // get all users by pagination use effect
    useEffect(()=>{
        getAllOrdersByPaginationHandler(paginationPageNumber);
    }, [])


    // prev page handler
 const previousPageHandler = ()=>{
    if(paginationPageNumber==1){
     return
    }
    getAllOrdersByPaginationHandler(paginationPageNumber-1);
    setPaginationPageNumber(paginationPageNumber-1)
 }
 
 // next page handler
 const nextPageHandler = ()=>{
   if(paginationPageNumber==pageCount){
    return
   }
   getAllOrdersByPaginationHandler(paginationPageNumber+1);
    setPaginationPageNumber(paginationPageNumber+1);
   
 }


    //  changeOrderStatusHandler
    const changeOrderStatusHandler = (id, status)=>{
        setOrderStatusPopupData({id, status});
        setBg({...bg, darkBg:true, orderStatus:true});
    }


  return (
    showLoader?
    (<Spinner/>):
    (<div className='px-8 py-6 max-h-[calc(100vh-104px)] h-full overflow-auto relative'>
    <h1 className='text-xl font-semibold text-[#2c2c54]'>All Orders</h1>
    <table className='userCustomTable'>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ordered At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                allOrders.map((order, i)=>{
                    return (
                        <tr key={i}>
                            <td>{order?._id.slice(-10)}</td>
                            <td>{order?.buyer?.name}</td>
                            <td>{order?.buyer?.email}</td>
                            <td>{order?.status}</td>
                            <td>{moment(order?.createdAt).fromNow()}</td>
                            <td>
                           <BiSolidEdit
                            className='mx-auto text-md hover:text-[#FE4938] cursor-pointer'
                            onClick={()=>changeOrderStatusHandler(order?._id, order?.status)}/>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>

    {bg?.orderStatus && <ChangeOrderStatus
      id={orderStatusPopupData.id}
      status={orderStatusPopupData.status}
      getAllOrdersByPaginationHandler={getAllOrdersByPaginationHandler}
      paginationPageNumber={paginationPageNumber}
      />}

    {/* all users pagination */}

      {pageCount>1==true &&(
        <div className='pagination-wrapper'>
        <div className='pagination'>
        <button onClick={previousPageHandler}>Prev</button>
        <div>{paginationPageNumber} of {pageCount}</div>
        <button onClick={nextPageHandler}>Next</button>
        </div>
      </div>
      )}
    
</div>)
  )
}

export default AllOrders
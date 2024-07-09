import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import moment from 'moment'
import Spinner from '../../components/Spinner';
import { BiSolidEdit } from "react-icons/bi";
import ChangeUserRole from '../../components/ChangeUserRole';
import { useBg } from '../../context/bg';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [auth] = useAuth();
    const [showLoader, setShowLoader] = useState(true);
    const [bg, setBg] = useBg();
    const [rolePopupData, setRolePopupData] = useState({id:'', name:'', email:'', role:''});
    const [pageCount, setPageCount] = useState(1);
    const [paginationPageNumber, setPaginationPageNumber] = useState(1);

    // getting all user count
    const getAllUsersCountHandler = async()=>{
        try {
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/all-user-count/${auth?.user._id}`);
        if(data?.success){
            const count = Math.ceil((data?.userCount)/19);
            setPageCount(count);
        }
        } catch (error) {
            console.log('Something went wrong');
        }
     }

     //  all user count effect
        useEffect(()=>{
            getAllUsersCountHandler();
        },[]);

    
    //getAllUersByPagination
    const getAllUersByPaginationHandler = async(page)=>{
       try {
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/all-users/${auth?.user._id}/${page}`);
        if(data?.success){
            setAllUsers(data?.users);
            setShowLoader(false);
        }
       } catch (error) {
        console.log('Something went wrong');
       }
    }
    
    // get all users by pagination use effect
    useEffect(()=>{
        getAllUersByPaginationHandler(paginationPageNumber);
    }, [])


    // prev page handler
 const previousPageHandler = ()=>{
    if(paginationPageNumber==1){
     return
    }
    getAllUersByPaginationHandler(paginationPageNumber-1);
    setPaginationPageNumber(paginationPageNumber-1)
 }
 
 // next page handler
 const nextPageHandler = ()=>{
   if(paginationPageNumber==pageCount){
    return
   }
   getAllUersByPaginationHandler(paginationPageNumber+1);
    setPaginationPageNumber(paginationPageNumber+1);
   
 }


    //  changeRoleHandler
    const changeRoleHandler = (id, name, email, role)=>{
        setRolePopupData({id, name, email, role});
          setBg({...bg, darkBg:true, userRole:true});
    }


  return (
    showLoader?
    (<Spinner/>):
    (<div className='px-8 py-6 max-h-[calc(100vh-104px)] h-full overflow-auto relative'>
    <h1 className='text-xl font-semibold text-[#2c2c54]'>All Users</h1>
    <table className='userCustomTable'>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                allUsers.map((user, i)=>{
                    return (
                        <tr key={i}>
                            <td>{user?._id.slice(-10)}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.role?'Admin':'User'}</td>
                            <td>{moment(user?.createdAt).fromNow()}</td>
                            <td>
                           <BiSolidEdit onClick={()=>changeRoleHandler(user._id, user.name, user.email, user.role)} className='mx-auto text-md hover:text-[#FE4938] cursor-pointer'/>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>

    {bg?.userRole && <ChangeUserRole
      id={rolePopupData.id}
      name={rolePopupData.name}
      email={rolePopupData.email}
      role={rolePopupData.role}
      getAllUersByPaginationHandler={getAllUersByPaginationHandler}
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

export default AllUsers
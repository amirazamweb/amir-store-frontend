import React, { useEffect, useState } from 'react'
import { useBg } from '../../context/bg'
import UploadProduct from '../../components/UploadProduct';
import axios from 'axios';
import AdminProductCard from '../../components/AdminProductCard';
import Spinner from '../../components/Spinner';
import UpdateProduct from '../../components/UpdateProduct';
import productsCategory from '../../helpers/productsCategory';

const AllProducts = () => {
const [bg, setbg] = useBg();
const [allProducts, setAllProducts] = useState([]);
const [showLoader, setShowLoader] = useState(true);
const [updatePopData, setUpdatePopData] = useState(null);
const [pageCount, setPageCount] = useState(1);
const [paginationCategory, setPaginationCategory] = useState('all');
const [paginationPageNumber, setPaginationPageNumber] = useState(1);

// product count
const getProductCountHandler = async(categ)=>{
  // setShowLoader(true);
  const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/product-count/${categ}`);
  const numberOfPages = Math.ceil((res.data.toatalProduct)/12);
  setPageCount(numberOfPages);
}

useEffect(()=>{
  getProductCountHandler(paginationCategory);
}, []);

// selectCategoryHandler
const selectCategoryHandler = async(e)=>{
  // setShowLoader(true);
  getProductCountHandler(e.target.value);
  setPaginationPageNumber(1);
    setPaginationCategory(e.target.value);

    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/pagination`,{
        paginationCategory:e.target.value, paginationPageNumber:1
      });
      if(data?.success){
        setAllProducts(data?.paginatedProductList || []);
        setShowLoader(false);
        }
    } catch (error) {
      console.log(error);
    }
    
}

// get all product by page numer
const getAllProductsByPageNumberHandler = async(num)=>{
  // setShowLoader(true);
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/pagination`,{
      paginationCategory, paginationPageNumber:num
    });
    if(data?.success){
      setAllProducts(data?.paginatedProductList || []);
      setShowLoader(false);
      }
  } catch (error) {
    console.log(error);
  }
}


// prev page handler
const previousPageHandler = ()=>{
   if(paginationPageNumber==1){
    return
   }

   getAllProductsByPageNumberHandler(paginationPageNumber-1);
   setPaginationPageNumber(paginationPageNumber-1);

}

// next page handler
const nextPageHandler = ()=>{
  if(paginationPageNumber==pageCount){
   return
  }

  getAllProductsByPageNumberHandler(paginationPageNumber+1);
  setPaginationPageNumber(paginationPageNumber+1);

}

// get default products
const getAllProductsHandler = async(category, pageNumber)=>{
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/pagination`,{
      paginationCategory:category, paginationPageNumber:pageNumber
    });
    if(data?.success){
    setAllProducts(data?.paginatedProductList || []);
    setShowLoader(false);
    }
  } catch (error) {
    console.log(error);
  }
}

// useEffect
useEffect(()=>{
    getAllProductsHandler(paginationCategory, paginationPageNumber);
}, [])

// handleUploadProduct
const handleUploadProduct = ()=>{
  setbg({...bg, darkBg:true, showUploadProduct:true});
}


  return (
    showLoader?
    (<Spinner/>):
    (
        <div className='px-8 pt-6 max-h-[calc(100vh-104px)] h-full overflow-auto relative'>
      <div className='flex justify-between items-center'>
      <h1 className='text-xl font-semibold text-[#2c2c54]'>All Products</h1>

      <div className='flex gap-4 items-center'>
      <span>Select by category</span>
      <select 
      className='outline-none text-[#2c2c54] border border-[#2c2c54] px-3 py-1.5 text-sm rounded-3xl'
      onChange={selectCategoryHandler}>
      <option value='all'>All</option>
      {productsCategory?.map((p)=>{
        return <option value={p.value} selected={p.value==paginationCategory&&true}>{p.label}</option>
      })}
      </select>

      <button className='text-[#FE4938] border border-[#FE4938] px-3 py-1.5 text-sm rounded-3xl hover:bg-[#FE4938] hover:text-white transition-all' onClick={handleUploadProduct}>Upload Product</button>
      </div>

      </div>

       {
        allProducts.length?
        (<div className='mt-[20px] flex flex-wrap gap-3'>
          {allProducts.map((p, i)=>{
            return <AdminProductCard
            key={i+p.productName}
            data={p}
            callBack={setUpdatePopData}
            currentPage={[getAllProductsHandler, paginationCategory, paginationPageNumber, getProductCountHandler]}
            />
          })}
        </div>):
        (
          <div className='mt-4 text-slate-700'>No product here. Kindly upload the product!</div>
        )
       }

      {/* upload product */}
       {bg?.showUploadProduct && <UploadProduct />}
       {bg?.showUpdateProduct && <UpdateProduct {...updatePopData} currentPage={[getAllProductsHandler, paginationCategory, paginationPageNumber]}/>}
    
      {/* pagination start */}

      {
        pageCount>1==true &&(
          <div className='pagination-wrapper'>
        <div className='pagination'>
        <button onClick={previousPageHandler}>Prev</button>
        <div>{paginationPageNumber} of {pageCount}</div>
        <button onClick={nextPageHandler}>Next</button>
        </div>
      </div>
        )
      }

    </div>
    )
  )
}

export default AllProducts
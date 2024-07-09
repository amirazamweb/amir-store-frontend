import React, { useState } from 'react'
import productsCategory from '../helpers/productsCategory'
import { IoCloudUploadOutline } from "react-icons/io5";
import uploadImageCloudinary from '../helpers/cloudinary';
import ZoomProduct from './ZoomProduct';
import { useBg } from '../context/bg';
import { MdDelete } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import axios from 'axios';


const UpdateProduct = ({_id, productName, brandName, category, productImage, price, sellingPrice, description, currentPage}) => {
  const [productDetails, setproductDetails] = useState({_id, productName, brandName, category, productImage, price, sellingPrice, description}) 

  const [bg, setBg] = useBg();
  const [zoomProductUrl, setZoomProductUrl] = useState('');

  // handle onchange
  const handleOnChange = (e)=>{
    setproductDetails({...productDetails, [e.target.name]:e.target.value});
  }

  // handle upload image
  const handleUploadImage = async(e)=>{
   const imgData = e.target.files[0];
   const cloudinaryRes = await uploadImageCloudinary(imgData);
   setproductDetails((prev)=>{
    return {
      ...prev,
      productImage:[...prev.productImage, cloudinaryRes.data.url]
    }
   })
  }

  // handle submit product
  const handleSubmitproduct = async()=>{
   if(!productDetails.productName){
     return toast.error('Product name is required');
   }
   if(!productDetails.brandName){
    return toast.error('Brand name is required');
  }

  if(!productDetails.category){
    return toast.error('Category is required');
  }

  if(!productDetails.productImage.length){
    return toast.error('Product image is required');
  }

  if(!productDetails.price){
    return toast.error('Price is required');
  }

  if(!productDetails.sellingPrice){
    return toast.error('Selling price is required');
  }

  if(!productDetails.description){
    return toast.error('Description is required');
  }

  try {
    const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/update/${_id}`, productDetails);
    if(data?.success){
      currentPage[0](currentPage[1], currentPage[2]);
      toast.success(data?.message);
      setBg({...bg, darkBg:false, showUpdateProduct:false});
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong')
  }
  }

// showZoomProductHandler
const showZoomProductHandler = (e)=>{
  let imgUrl = '';
  if(e.target.src){
    imgUrl = e.target.src;
  }
  else{
    imgUrl = e.target.firstElementChild.src;
  }
  setZoomProductUrl(imgUrl);
  setBg({...bg, showZoomProduct:true});
}


// handleRemoveProductImage
const handleRemoveProductImage = (index)=>{
    const images = productDetails.productImage;
    images.splice(index, 1);
    setproductDetails((prev)=>{
      return {
        ...prev,
        productImage:[...images]
      }
    })
}

// handleCloseUploadProduct
const handleCloseUpdateProduct = ()=>[
  setBg({...bg, darkBg:false, showUpdateProduct:false})
]


  return (
    <div className='w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-30'>
        <div className='bg-white max-w-md w-full px-6 py-4 shadow-md max-h-[90vh] overflow-y-scroll relative'>
            <h2 className='text-lg mb-3 text-[#FE4938] font-semibold'>Update Product</h2>
            
            <table className='grid'>
                <label htmlFor='product-name' className='mb-1 text-md font-semibold text-slate-800'>Product Name:</label>
                <input
                id='product-name' 
                type='text' 
                placeholder='enter product name' 
                name='productName'
                defaultValue={productName}
                required
                className='outline-none bg-slate-100 border px-2 py-1 text-md font-light rounded focus:border-slate-300 mb-2'
                onChange={handleOnChange}/>

                <label htmlFor='brand-name' className='mb-1 text-md font-semibold text-slate-800'>Brand Name:</label>
                <input 
                id='brand-name'
                type='text' 
                placeholder='enter brand name' 
                name='brandName'
                defaultValue={brandName}
                required
                className='outline-none bg-slate-100 border px-2 py-1 text-md font-light rounded focus:border-slate-300 mb-2'
                onChange={handleOnChange}/>

                <label htmlFor='category' className='mb-1 text-md font-semibold text-slate-800'>Category:</label>
                <select id='category' name='category' required className='outline-none bg-slate-100 border px-2 py-1 text-md text-md font-light rounded focus:border-slate-300 mb-2'
                onChange={handleOnChange}>
                 {productsCategory.map((product, index)=>{
                   return <option key={index} value={product.value} selected={category===product.value?true:false}>
                    {product.label}
                   </option>
                 })}
                </select>

                <label htmlFor='' className='mb-1 text-md font-semibold text-slate-800'>Product Image:</label>
                <label htmlFor='inputProductImage' className='mb-2'>
                 <div className='bg-slate-100 border flex justify-center items-center flex-col gap-1 p-2 cursor-pointer rounded'>
                 <div className='text-xl'><IoCloudUploadOutline/></div>
                 <p className='text-sm'>Upload Image</p>
                 </div>
                 <input type='file' hidden id='inputProductImage' accept='image/*' required onChange={handleUploadImage}/>
                </label>

                <div className='mb-2'>
                 {
                   productDetails?.productImage.length?
                   (<div className='flex flex-wrap gap-2'>
                     {productDetails?.productImage.map((url, index)=>{
                     return <div className='h-[70px] w-[70px] bg-slate-100 border p-1 cursor-pointer relative group' key={index} onClick={showZoomProductHandler}>
                         <img src={url} alt='pr-img' className='h-full bg-slate-100 mx-auto object-scale-down mix-blend-multiply'/>

                         <div className='absolute bottom-1 right-1 cursor-pointer hover:text-red-600 hidden group-hover:block' onClick={()=>handleRemoveProductImage(index)}>
                           <MdDelete />
                         </div>
                     </div>
                     })}
                    </div>):
                    (<div className='text-sm text-[#FE4938]'>*Please upload image</div>)
                 }
                   
                </div>

                <label htmlFor='price' className='mb-1 text-md font-semibold text-slate-800'>Price:</label>
                <input 
                id='price'
                type='number' 
                placeholder='enter price' 
                name='price'
                defaultValue={price}
                required
                className='outline-none bg-slate-100 border px-2 py-1 text-md font-light rounded focus:border-slate-300 mb-2'
                onChange={handleOnChange}/>

                <label htmlFor='selling-price' className='mb-1 text-md font-semibold text-slate-800'>Selling Price:</label>
                <input 
                id='selling-price'
                type='number' 
                placeholder='enter selling price' 
                name='sellingPrice'
                defaultValue={sellingPrice}
                required
                className='outline-none bg-slate-100 border px-2 py-1 text-md font-light rounded focus:border-slate-300 mb-2'
                onChange={handleOnChange}/>

                <label htmlFor='description' className='mb-1 text-md font-semibold text-slate-800'>Description:</label>
                <textarea id='description' placeholder='enter description' name='description' defaultValue={description} required className='outline-none bg-slate-100 border px-2 py-1 text-md font-light rounded focus:border-slate-300 mb-4' onChange={handleOnChange}>
                </textarea>

                <input type='submit' value='Update Product' className='w-full bg-[#FE4938] rounded p-1 text-slate-100 cursor-pointer' onClick={handleSubmitproduct}/>
            </table>

            <div className='absolute top-1 right-1 text-2xl text-[#FE4938] p-1 cursor-pointer' onClick={handleCloseUpdateProduct}>
            <IoCloseOutline />
            </div>
        </div>

        {bg?.showZoomProduct && <ZoomProduct url={zoomProductUrl}/>}

    </div>
  )
}

export default UpdateProduct;
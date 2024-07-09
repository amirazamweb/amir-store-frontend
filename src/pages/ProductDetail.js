import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import RecommendedProduct from '../components/RecommendedProduct';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast'

const ProductDetail = () => {
    const {id} = useParams();
    const [data, setData] = useState({
    productName:'',
    brandName:'',
    category:'',
    productImage:[],
    price:'',
    sellingPrice:'',
    description:''
    })


    const [loading, setLoading] = useState(true); 
    const [zoomImgURL, setZoomImgURL] = useState('');
    const [lensPosition, setLensPosition] = useState({top:0, left:0});
    const [showMagnifyingImage, setShowMagnifyingImage] = useState(false);
    const [cart, setCart] = useCart();
    const navigate = useNavigate();


    // get product details
    const getProductDetail = async()=>{
        setLoading(true);
        try {
         const res = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/single-product/${id}`);   
         if(res?.data?.success){
          const tempData = res?.data?.productDetails;
            for(let c of cart){
              if(id==c._id){
               tempData.addedToCart = true;
              }
            }
            setData(tempData);
            setZoomImgURL(res?.data?.productDetails.productImage[0]);
            setLoading(false);
         }
        } catch (error) {
            console.log(error);
        }
    }

    // use effect
    useEffect(()=>{
    getProductDetail(); 
    }, [id, cart])

// showZoomHandler
const showZoomHandler = (url)=>{
   setZoomImgURL(url);
}


// mouseMoveHandler
const mouseMoveHandler = (e)=>{
  let x = e.nativeEvent.offsetX;
  let y = e.nativeEvent.offsetY;
  setLensPosition({top:y, left:x});
  setShowMagnifyingImage(true);
}

const lensStyle = {
  top:`${(lensPosition.top-40)<0? 0 :lensPosition.top-40}px`,
  left:`${(lensPosition.left-40)<0? 0 :lensPosition.left-40}px`
}

const magnifyingStyle = {
  backgroundSize: '400% 400%',
  backgroundPosition:`top -${(lensPosition.top-40)<0? 0 :lensPosition.top-40}px left -${(lensPosition.left-40)<0? 0 :lensPosition.left-40}px`
}


// added to card button custom style
function buttonStyle(){
  const customStyle={
      backgroundColor : data?.addedToCart?'#16a085':'#DC2626',
      cursor : data?.addedToCart? 'not-allowed':'pointer',
      borderColor :  data?.addedToCart?'#16a085':'#DC2626',
      width : data?.addedToCart?'140px':'110px',
  }

  return customStyle

}


// addToCartHandler
const addToCartHandler = (e)=>{
  e.preventDefault();
 e.stopPropagation();
 if(data?.addedToCart){
  return
}
 setCart([...cart, {...data, _id:id, qty:1}]);
 const localExistCart = JSON.parse(localStorage.getItem('amir_store_cart')) || [];
  localExistCart.push({...data, _id:id, qty:1});
  localStorage.setItem('amir_store_cart', JSON.stringify(localExistCart));
  toast.success('Product added to cart sucessfully!')
}


// buy product handler
const buyProductHandler = (e)=>{
  e.preventDefault();
 e.stopPropagation();
 if(data?.addedToCart){
  navigate('/cart');
  return
}
 setCart([...cart, {...data, _id:id, qty:1}]);
 const localExistCart = JSON.parse(localStorage.getItem('amir_store_cart')) || [];
  localExistCart.push({...data, _id:id, qty:1});
  localStorage.setItem('amir_store_cart', JSON.stringify(localExistCart));
  toast.success('Product added to cart sucessfully!');
  navigate('/cart');
}


  return (
    <div className='container mx-auto '>
        <div className='py-4 md:py-8 px-2 md:px-6 flex flex-col md:flex-row gap-2 md:gap-8'>
            {
                loading?
                (
                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start'>
                         <div className='max-h-72 h-16 md:h-72 w-20 flex md:flex-col gap-1 p-2 border'>
                            <div className='w-16 h-16 bg-slate-100 animate-pulse'></div>
                            <div className='w-16 h-16 bg-slate-100 animate-pulse'></div>
                            <div className='w-16 h-16 bg-slate-100 animate-pulse'></div>
                            <div className='w-16 h-16 bg-slate-100 animate-pulse'></div>
                         </div>
                         <div className='w-full h-[40vh] md:h-80 md:w-80 bg-slate-100 animate-pulse'></div>
                  </div>
                ):
                (
                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start'>
                       <div className='max-h-72 h-fit w-fit flex md:flex-col gap-1 p-2 border relative'>
                         {
                           data?.productImage.map((url)=>{
                            return <div className='w-16 h-16 bg-slate-100' key={url} onMouseEnter={()=>showZoomHandler(url)}>
                                    <img src={url} alt={data?.category} className='h-full w-full object-scale-down mix-blend-multiply'/>
                                   </div>
                           })
                         }

                       </div>
                    <div className='w-full h-[40vh] md:h-80 md:w-80 bg-slate-100 relative overflow-hidden group' onMouseMove={mouseMoveHandler} onMouseLeave={()=>setShowMagnifyingImage(false)}>
                      <img src={zoomImgURL} alt='zoomImgURL' className='w-full h-full object-scale-down mix-blend-multiply'/>

                      <div className='hidden md:block'>
                      <div className='absolute bg-slate-600 bg-opacity-40 w-20 h-20 pointer-events-none	hidden group-hover:block' style={lensStyle}></div>
                      </div>
                    </div>
                     </div>
                )
            }
        
        {
          loading?(
          <div className='ps-3 md:ps-0 flex flex-col gap-2'>
          <p className='bg-slate-100 rounded-2xl w-20 h-6 animate-pulse'></p>
          <h1 className='w-full h-8 bg-slate-100 animate-pulse'></h1>
          <p className='bg-slate-100 w-24 h-6 animate-pulse'></p>
          <div className='bg-slate-100 w-24 h-6 animate-pulse'></div>
          <div className='w-36 h-8 bg-slate-100 animate-pulse'></div>
          <div className='flex gap-4 items-center py-1 animate-pulse'>
            <button className='w-[110px] md:min-w-[120px] h-8 bg-slate-100 rounded-md cursor-auto animate-pulse'></button>
            <button className='w-[110px] md:min-w-[120px] h-8 bg-slate-100 rounded-md cursor-auto animate-pulse'></button>
          </div>
          <p className='bg-slate-100 h-6 w-36 animate-pulse'></p>
          <p className='bg-slate-100 h-12 w-36 animate-pulse'></p>
        </div>
          ):
          (
            showMagnifyingImage?
            (<div className='hidden md:block w-80 h-80 border' style={{backgroundImage:`url(${zoomImgURL || data?.productImage[0]})`, ...magnifyingStyle}}>
            </div>):
            (<div className='ps-3 md:ps-0 flex flex-col gap-1'>
              <p className='text-red-700 bg-red-100 rounded-2xl px-4 w-fit'>{data?.brandName}</p>
              <h1 className='text-lg md:text-xl font-semibold'>{data?.productName}</h1>
              <p className='text-slate-400 capitalize text-md'>{data?.category}</p>
              <div className='flex gap-1.5 text-red-600'>
                   <FaStar />
                   <FaStar />
                   <FaStar />
                   <FaStar />
                   <FaStarHalf />
              </div>
              <div className='text-base md:text-lg flex gap-4 py-1 font-medium'>
                <span className='text-red-600'>
                  &#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(data?.sellingPrice)}
                  </span>
                <span className='text-slate-400 line-through'>
                  &#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(data?.price)}
                  </span>

                  <span className='text-red-500 font-light'>{Math.floor((((data?.price)-(data?.sellingPrice))/(data?.price))*100)}% OFF</span>
              </div>
              <div className='flex gap-4 items-center py-1'>
                <button className='w-[110px] md:min-w-[120px] border border-red-600 text-red-600 py-[2px] px-4 rounded text-sm md:text-base hover:bg-red-600 hover:text-white' onClick={buyProductHandler}>Buy</button>
                <button className='md:min-w-[120px] border border-red-600 text-white py-[2px] px-4 rounded text-sm md:text-base hover:bg-white' style={buttonStyle()} onClick={(e)=>addToCartHandler(e)}>{data?.addedToCart?'Added to Cart':'Add to Cart'}</button>
              </div>
              <p className='text-base font-semibold'>Description:</p>
              <p className='text-slate-800'>{data?.description}</p>
            </div>)
          )
        }

        </div>

        <div className='mb-4'>
          {
            data?.category && <RecommendedProduct id={id} heading={'Recommended Product'} category={data?.category}/>
          }
        </div>
    </div>
  )
}

export default ProductDetail
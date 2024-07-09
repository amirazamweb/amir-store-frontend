import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const SearchProduct = () => {
 const location = useLocation();
 const urlSearch = new URLSearchParams(location.search);
 const keyword = urlSearch.get('query');

 const [productsList, setProductsList] = useState([]);
 const [loading, setLoading] = useState(true);
 const [cart, setCart] = useCart();
 const loadingProduct = new Array(5).fill(null);

//  get serach product
const getSearchProduct = async()=>{
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/search`, {keyword});  
        if(data?.success){
            const productsByCartIdentified = data?.results.map((p)=>{
                let flag;
                for(let c of cart){
                  if(c._id===p._id){
                    flag = true;
                    const tempObj = {...p, addedToCart:true};
                    return tempObj
                  }
                
                }

                if(!flag){
                    return p;
                }
            })
            setProductsList(productsByCartIdentified);
            setLoading(false);
        }
    } catch (error) {
        console.log(error);
    }
}


// use Effect
useEffect(()=>{
    getSearchProduct();
}, [keyword, cart])

 
   // addToCartHandler
const addToCartHandler = (e, product)=>{
   e.preventDefault();
   e.stopPropagation();
  if(product.addedToCart){
    return
  }
   setCart([...cart, {...product, qty:1}]);
   const localExistCart = JSON.parse(localStorage.getItem('amir_store_cart')) || [];
    localExistCart.push({...product, qty:1});
    localStorage.setItem('amir_store_cart', JSON.stringify(localExistCart));
    toast.success('Product added to cart sucessfully!')
}

// added to card button custom style
const buttonStyle = (p)=>{
    const customStyle={
        backgroundColor : p?.addedToCart?'#16a085':'#FE4938',
        cursor : p?.addedToCart? 'not-allowed':'pointer'
    }

    return customStyle

}


  return (
    <div className='container mx-auto'>
        
        <div className='my-4 md:my-6 px-4 md:px-6'>
            {
                loading?
                (
                    <h1 className='w-36 h-6 mb-4 bg-slate-100 animate-pulse'></h1>
                ):
                (
                    <h1 className='font-semibold mb-4'>Search Results : {productsList?.length}</h1>
                )
            }

            <div className='flex flex-wrap gap-2 md:gap-6'>
            {
                loading?(
                    loadingProduct?.map((elm, ind)=>{
                        return <div  key={elm+ind} className='w-full sm:w-56 border'>
                              <div className='h-36 w-full p-4 bg-slate-100'>
                              </div>
                              <div className='bg-white p-2 flex flex-col gap-2'>
                                 <h1 className='bg-slate-100 w-full h-5 animate-pulse'></h1>
                                 <p className='bg-slate-100 w-full h-4 animate-pulse'></p>
                                  <div className='text-sm flex items-center gap-6'>
                                    <p className='bg-slate-100 w-[46%] h-5 animate-pulse'></p>
        
                                    <p className='bg-slate-100 w-[46%] h-5 animate-pulse'></p>
                                  </div>
                                  <button className='bg-slate-100 w-full h-5 rounded-xl cursor-auto animate-pulse'></button>
                              </div>
                        </div>
                    })
                ):
                (
                    productsList?.map((product)=>{
                        return <Link to={`/product-detail/${product?._id}`} key={product?.productName} className='w-full sm:w-56 border'>
                              <div className='h-40 w-full p-4 bg-slate-100'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full w-full object-scale-down mix-blend-multiply'/>
                              </div>
                              <div className='bg-white p-2'>
                                 <h1 className='font-semibold text-ellipsis line-clamp-1'>{product?.productName}</h1>
                                 <p className='text-slate-400 capitalize text-[14.2px]'>{product?.category}</p>
                                  <div className='text-sm flex font-semibold items-center gap-4'>
                                    <p className='text-red-600'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format(product?.sellingPrice)}</p>
        
                                    <p className='text-slate-500 line-through'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format(product?.price)}</p>

                                    <p className='text-red-500 font-light'>{Math.floor((((product?.price)-(product?.sellingPrice))/(product?.price))*100)}% OFF</p>
                                  </div>
                                  <button className='w-full text-white rounded-xl text-sm my-2 py-[2px]' style={buttonStyle(product)} onClick={(e)=>addToCartHandler(e, product)}>{product?.addedToCart?'Added to Cart':'Add to Cart'}</button>
                              </div>
                        </Link>
                    })
                )
            }
            </div>

        </div>
        
    </div>
  )
}

export default SearchProduct
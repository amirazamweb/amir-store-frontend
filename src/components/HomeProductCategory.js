import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link} from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const HomeProductCategory = ({category, heading}) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollCount, setScrollCount] = useState(0);
    const [productCount, setproductCount] = useState(0);
    const [cart, setCart] = useCart();

    const loadingProduct = new Array(10).fill(null);

    // get all products by category;
    const getAllProducts = async()=>{
        setLoading(true)
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/product-category/${category}`); 
            if(data?.success){
                const productsByCartIdentified = data?.products.map((p)=>{
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
            // setProductList(data?.products);
            setProductList(productsByCartIdentified);
            setproductCount(productsByCartIdentified?.length);
            setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // use effect
    useEffect(()=>{
    getAllProducts();
    }, [cart.length])

    // forward handler
    const forwardHandler = ()=>{
        if(scrollCount<productCount-5){
            return setScrollCount((prev)=>prev+1);
        }

        setScrollCount(0);
       
      }
    
    //   backward handler
      const backwarddHandler = ()=>{
        if(scrollCount<productCount-5 && scrollCount>0){
            return setScrollCount((prev)=>prev-1);
        }

        setScrollCount(productCount-6);
       
      }

    //   useEffect
    useEffect(()=>{
        const interval = setInterval(()=>{
            productCount>5 && forwardHandler();
        }, 8000)

        return ()=> clearInterval(interval);

    }, [scrollCount, productCount])

    
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
    <div className='container mx-auto px-2 mt-3 md:mt-6 mb-2'>
         <h1 className='text-lg md:text-xl font-semibold mb-4'>{heading}</h1>
         <div className='flex gap-[16px] overflow-x-auto scrollbar-none relative'>
           {
            loading?
            (
                loadingProduct.map((p, i)=>{
                    return <div key={p+i} className='h-28 w-64 flex' >
                    <div className='h-full w-28 bg-slate-100 p-2 animate-pulse'></div>
                    <div className='h-full w-36 bg-white p-2'>
                       <h1 className='bg-slate-100 w-full h-5 mb-1 rounded animate-pulse'></h1>
                       <p className='bg-slate-100 w-full h-4 mb-1 rounded animate-pulse'></p>

                       <div className='text-[13.1px] flex justify-between items-center mb-2'>
                           <p className= 'bg-slate-100 rounded w-1/3 h-4 animate-pulse'></p>

                           <p className='bg-slate-100 rounded w-1/3 h-4 animate-pulse'></p>
                       </div>

                       <button className='text-sm bg-slate-100 rounded-xl w-full h-5 animate-pulse cursor-auto'></button>

                    </div>
               </div>
                })
            ):
            (
                productList?.map((product)=>{
                    return (
                        <Link to={`/product-detail/${product?._id}`} key={product?.productName} className='h-28 w-64 flex transition-all border' style={{transform:`translateX(-${scrollCount*272}px)`}} >
                             <div className='h-full w-28 bg-slate-100 p-2'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full w-full object-scale-down mix-blend-multiply'/>
                             </div>
                             <div className='h-full w-36 bg-white p-2'>
                                <h1 className='text-[14.4px] font-semibold text-ellipsis line-clamp-1'>{product?.productName}</h1>
                                <p className='text-sm text-slate-600 capitalize text-ellipsis line-clamp-1'>{product?.category}</p>
        
                                <div className='text-[13.1px] flex items-center'>
                                    <p className='text-red-500 font-semibold me-4'>&#8377;{product?.sellingPrice}</p>
        
                                    <p className='text-slate-600 line-through'>&#8377;{product?.price}</p>
                                </div>
        
                                <button className='text-[13.5px] b-red-500 rounded-2xl px-3 py-[1px] text-white w-full mt-2 hover:bg-red-600' style={buttonStyle(product)} onClick={(e)=>addToCartHandler(e, product)}>{product?.addedToCart?'Added to Cart':'Add to Cart'}</button>
        
                             </div>
                        </Link>
                    )
                   })
            )
           }

           {/* scroll bar start*/}
          {!loading && productCount>4 && <div className='hidden absolute w-full top-1/2 md:flex justify-between text-2xl text-white' 
          style={{transform:'translateY(-50%)'}}>
          <IoIosArrowBack  className='bg-slate-600 p-1 rounded-full cursor-pointer opacity-50 hover:bg-slate-700' onClick={backwarddHandler}/>
          <IoIosArrowForward className='bg-slate-600 p-1 rounded-full cursor-pointer opacity-50 hover:bg-slate-700' onClick={forwardHandler}/>
          </div>}
          {/* scrollbar end */}
           
         </div>
    </div>
  )
}

export default HomeProductCategory
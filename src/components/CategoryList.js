import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(12).fill(null);


    // getCategoryHandler
    const getCategoryHandler = async()=>{
        setLoading(true)
          try {
            const {data} = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/category-list`); 
            if(data?.success){
            setCategories(data?.products);
            setLoading(false)
            }
          } catch (error) {
            console.log(error);
          }  
    }

    useEffect(()=>{
      getCategoryHandler();
    }, [])


  return (
    <div className='container mx-auto px-2 py-4'>
       <div className='flex justify-between items-center gap-5 md:gap-4 overflow-x-auto scrollbar-none'>
        {
            loading?
            (
             categoryLoading.map((cl, i)=>{
             return (
                <div key={i+cl}>
                <div className='w-12 h-12 md:w-16 md:h-16 p-2 rounded-full bg-slate-100 animate-pulse'></div>
                <p className='w-full h-6'></p>
                </div>
             )
             })
            ):
            (
        
                categories.map((p, i)=>{
                        return (
                            <Link to={`/product-category?category=${p?.category}`} className='cursor-pointer' key={i}>
                                <div className='w-12 h-12 md:w-16 md:h-16 p-2 rounded-full overflow-hidden flex items-center justify-center bg-slate-100'>
                                    <img src = {p?.productImage[0]} alt = {p.category} className='h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all'/>
                                </div>
                                <p className='text-sm text-slate-800 capitalize text-center w-full h-6'>{p?.category}</p>
                            </Link>
                        )
                    })
            )
        }
       </div>
    </div>
  )
}

export default CategoryList
import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import RecommendedProduct from '../components/RecommendedProduct';
import productsCategory from '../helpers/productsCategory';


const ProductCategory = () => {
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListArray = urlSearch.getAll('category');

    const [selectedCategoryList, setSelectedCategoryList] = useState([...urlCategoryListArray]);
    const [sortByPrice, setSortByPrice] = useState(undefined);
    
    

    const navigate = useNavigate();


    // select category list handler
    const selectCategoryListHandler = (e)=>{
       if(e.target.checked){
        let tempArr = selectedCategoryList;

        let flag = true;
        for(let arr of tempArr){
          if(arr==e.target.value){
              flag = false;
          }
        }

        if(flag){
          tempArr.push(e.target.value);
          let str = '';
          tempArr.forEach((arr)=>{

            str+=`&&category=${arr}`

          })

          navigate(`${location.pathname}?${str}`)

          setSelectedCategoryList([...tempArr]);
        }
        
       }

       else if(!e.target.checked){
        let tempArr = selectedCategoryList;
        let tempFilteredArr = tempArr.filter((arr)=>{
          if(arr==e.target.value){
            return false;
          }
          return true;
        })

        let str = '';
        tempFilteredArr.forEach((arr)=>{

            str+=`&&category=${arr}`

          })

          navigate(`${location.pathname}?${str}`)

        
        setSelectedCategoryList([...tempFilteredArr]);
       }

    }


    // checkBoxChecked
    const checkBoxChecked = (val)=>{
      let flag = false;
      for(let i of urlCategoryListArray){
        if(i==val){
          flag = true
        }
      }
       return flag;
    }


    // sort by price handler
    const sortByPriceHandler = (e)=>{
      setSortByPrice(e.target.value);
    }


  return (
    <div className='container mx-auto'>
      <div className='flex justify-center gap-1 my-4 md:my-6 px-4 md:px-6'>
         <div className='hidden md:block w-[17%] shadow-md px-6 py-2 h-fit min-h-full sticky top-[88px]'>
           <div>
             <h2 className='text-slate-600 font-semibold'>SORT BY</h2>
             <hr className='my-1.5'/>
             <div className='text-[14.4px] mb-2'>
              <input type='radio' name='price' value='acending' onChange={sortByPriceHandler}/> 
              &nbsp; Price - Low to High
              </div>
             <div className='text-[14.4px]'>
              <input type='radio' name='price' value='decending' onChange={sortByPriceHandler}/> 
              &nbsp; Price - High to Low
              </div>
           </div>

           <div className='mt-3'>
           <h2 className='text-slate-600 font-semibold'>CATEGORY</h2>
           <hr className='my-1.5'/>
            {
              productsCategory.map((c)=>{
                return <div className='text-[14.4px] mb-2' key={c.label}>
                  <input type='checkbox' value={c.value} name={c.value} onChange={selectCategoryListHandler}
                  defaultChecked={checkBoxChecked(c.value)}/> {c.label}
                </div>
              })
            }
           </div>
         </div>
         <div className='w-[100%] md:w-[83%]'>
           <RecommendedProduct heading={'Your Favourite Product'} category={[...urlCategoryListArray]} sort = {sortByPrice}/>
         </div>
      </div>
    </div>
  )
}

export default ProductCategory;
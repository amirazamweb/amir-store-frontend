import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const BannerProduct = () => {
  const desktopBanners = [image1, image2, image3, image4, image5];
  const mobileBanners = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];
  const [scrollCount, setScrollCount] = useState(0);

  const forwardHandler = ()=>{
    if(scrollCount<desktopBanners.length-1){
      return setScrollCount((c)=>c+1);
    }
    setScrollCount(0)
  }

  const backwarddHandler = ()=>{
    if(scrollCount < desktopBanners.length && scrollCount>0){
      return setScrollCount((c)=>c-1);
    }
    setScrollCount(desktopBanners.length-1);
  }

  // auto scroll
 useEffect(()=>{
  const interval = setInterval(forwardHandler, 5000);

  return ()=> clearInterval(interval);
 }, [scrollCount])


  return (
    <div className='container mx-auto px-2'>
        <div className='h-40 md:h-72 w-full relative'>

          {/* desktop and tablet version */}

          <div className='hidden w-full h-full md:flex bg-slate-200 overflow-hidden'>
          {desktopBanners.map((bannerURL)=>{
            return (
              <div className='w-full min-w-full h-full transition-all' key={bannerURL} style={{transform:`translateX(-${100*scrollCount}%)`}}>
                <img src = {bannerURL} alt = {bannerURL} className='w-full h-full'/>
              </div>
            )
          })}
          </div>

          {/* mobile version */}

          <div className='w-full h-full flex bg-slate-200 overflow-hidden md:hidden'>
          {mobileBanners.map((bannerURL)=>{
            return (
              <div className='w-full min-w-full h-full transition-all' key={bannerURL} style={{transform:`translateX(-${100*scrollCount}%)`}}>
                <img src = {bannerURL} alt = {bannerURL} className='w-full h-full object-cover'/>
              </div>
            )
          })}
          </div>

          {/* scroll bar start*/}
          <div className='hidden absolute w-full top-1/2 md:flex justify-between text-2xl text-white px-4' 
          style={{transform:'translateY(-50%)'}}>
          <IoIosArrowBack  className='bg-slate-600 p-1 rounded-full cursor-pointer opacity-50' onClick={backwarddHandler}/>
          <IoIosArrowForward className='bg-slate-600 p-1 rounded-full cursor-pointer opacity-50' onClick={forwardHandler}/>
          </div>
          {/* scrollbar end */}

        </div>
    </div>
  )
}

export default BannerProduct
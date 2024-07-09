import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HomeProductCategory from '../components/HomeProductCategory';

const Home = () => {

  return (
    <div>
      <CategoryList/> 
      <BannerProduct/>
      <HomeProductCategory category={'airpodes'} heading={"Top's Airpodes"}/>
      <HomeProductCategory category={'camera'} heading={'Camera & Photography'}/>
      <HomeProductCategory category={'earphones'} heading={'Latest Earphones'}/>
      <HomeProductCategory category={'mobiles'} heading={'Mobiles'}/>
      {/* <HomeProductCategory category={'mouse'}/> */}
      {/* <HomeProductCategory category={'printers'}/> */}
      {/* <HomeProductCategory category={'processor'}/> */}
      {/* <HomeProductCategory category={'refrigerator'}/> */}
      <HomeProductCategory category={'speakers'} heading={'Bluetooth Speakers'}/>
      {/* <HomeProductCategory category={'trimmers'}/> */}
      {/* <HomeProductCategory category={'televisions'}/> */}
      {/* <HomeProductCategory category={'watches'}/> */}
    </div>
  )
}

export default Home
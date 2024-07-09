import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='container mx-auto'>
       <div className='py-4 md:py-8 px-2 md:px-6 w-full min-h-[calc(100vh-40px-64px)] flex justify-center items-center'>

        <div className='text-center'>
        <h2 className='text-[40px] md:text-[50px] font-bold'>404</h2>
        <p className='mb-2'>Page not found</p>
        <Link to='/' className='bg-[#FE4938] text-white px-3 py-1 text-md md:text-xl rounded'>Home</Link >
        </div>

       </div>
    </div>
  )
}

export default PageNotFound
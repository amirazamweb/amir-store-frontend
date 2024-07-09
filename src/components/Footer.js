import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-slate-200 h-[40px]'>
      <div className='container mx-auto p-2'>
      <p className='text-center font-bold'>Dynamic coding with <Link to={'/'} className='text-[#FE4938]'>Amir</Link></p>
      </div>
    </footer>
  )
}

export default Footer
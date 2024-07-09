import React, { useEffect, useState } from 'react';
import loader from '../assest/loading.gif'
import { useNavigate } from 'react-router-dom';

const Loader = ({redirect}) => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(()=>{
   const id = setInterval(()=>{
    setCount((c)=>c-1)
   }, 2000)

   count===0 && navigate(redirect);

   return ()=>{
    clearInterval(id);
   }
  }
)

  return (
    <div className='h-[calc(100vh-104px)] flex items-center justify-center'>
        <div id="loading"></div>
    </div>
  )
}

export default Loader
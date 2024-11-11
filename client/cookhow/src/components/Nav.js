import React from 'react';
import { Link } from 'react-router-dom';
import log2 from '../assets/log2.png';

function Nav() {
  return (
    <div className='h-20 justify-between bg-slate-600 rounded-md m-3 w-full flex flex-row items-center'>
      <div className='w-40 bg-slate-300 rounded-md justify-center items-center flex'>
        <img src={log2} alt='logo' className='h-10 w-10 ml-4 rounded-lg' />
      </div>
      <div className='text-slate-100 font-sans font-extrabold w-30  flex'>
        <Link to='/'>Home</Link>
         </div>
         <div className='text-slate-100 font-sans font-extrabold w-30  flex'>
            <Link to='/Discover'>Discover</Link>
         </div>
         <div className='text-slate-100 font-sans font-extrabold w-30  flex'>
            <Link to='/Discover'>Sign-up</Link>
         </div>
         <div className='text-slate-100 font-sans font-extrabold w-30  flex'>
            <Link to='/Discover'>Log-in</Link>
         </div>
      
    </div>
  );
}

export default Nav;

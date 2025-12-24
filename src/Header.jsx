import React, { useState } from 'react'

function Header() {
  const[toggle,settoggle]=useState(false);
  const togglesignuplogin=()=>{
      
  }
  return (
    <div>
        <div className='h-[60px] bg-blue-400 grid grid-cols-8 w-[100%]'>
            <div className=' w-20 col-span-2'>
                <h1 className='text-xl font-bold text-white mt-3 ml-4'>Bookify</h1>
            </div>
            <div className=' w-50 col-span-4 flex'>
               <form action="" className='w-full'>
                 <input className=' h-8 w-[80%] rounded-l-lg pl-3 mt-3' placeholder='Enter the book name' type="text" name="product" id="" />
                 <button className='bg-white p-[4px] pt-[4.5px] pb-[3.5px] pr-3 pl-3 rounded-r-lg'><i class='bx bx-search'></i></button>
               </form>
            </div>
            <div className=''>
               <button className='p-1 px-2 bg-white rounded text-md mt-3' >Login / Sign Up</button>
            </div>
            <div className=' text-white text-3xl mt-2'>
                <i class='bx bx-cart'></i>
            </div>
        </div>
    </div>
  )
}

export default Header
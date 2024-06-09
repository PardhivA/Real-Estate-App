import React from 'react'
import { useSelector } from 'react-redux'
export default function Profile() {
    const {currentUser} = useSelector(state => state.user)
    return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7 text-zinc-300'>Profile</h1>
    <img src={currentUser.avatar} alt='ProfilePhoto' className='rounded-full object-cover cursor-pointer mx-auto p-3'></img>
    <form  className='flex flex-col gap-4'>
      <input type='text' placeholder= {currentUser.username}   className='rounded-md p-3' id='username' >
      </input>
      <input type='email' placeholder={currentUser.email} className='rounded-md p-3' id='email' >
      </input>
      <input type='password' placeholder='Password' className='rounded-md p-3' id='password' >
      </input>
      <button  className='bg-zinc-300 uppercase p-3 text-zinc-700 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80'>
            Update
      </button>
      <button  className='bg-zinc-300 uppercase p-3 text-zinc-700 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80'>
            Create a Listing
      </button>
    </form>
    <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'> Delete Account</span>
        <span className='text-red-500 cursor-pointer'> Sign Out</span>
    </div>
    
  </div>  
  )
}

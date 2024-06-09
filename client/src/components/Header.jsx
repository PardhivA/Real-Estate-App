// import { current } from '@reduxjs/toolkit'
import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-zinc-300 shadow-md'>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
     <Link to='/'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <div className='bg-zinc-600 rounded-md p-1'>
        <span className='text-zinc-300'>
          Sojoy
        </span>
        <span className='text-zinc-400'>
        rn
        </span>
        </div>
      </h1>
      </Link>
      <form className=' items-center flex rounded-md bg-zinc-200 p-2'>
        <input type='text' placeholder='Search...' className='  bg-transparent focus:outline-none w-24 sm:w-64'></input>
        <FaSearch></FaSearch>
      </form>
      <ul className='flex gap-4'>
        <Link to='/'>
        <li className='hidden sm:inline hover:underline'>
          Home
        </li>
        </Link>
        <Link to='/About'>
        <li className='hidden sm:inline hover:underline'>
          About
        </li>
        </Link>
        <Link to='/Profile'>
        { currentUser ?
          (<img src={currentUser.avatar} alt='profile' className='rounded-full h-8 w-8 object-cover'></img>)
        : (<li className=' sm:inline hover:underline'>
          Sign In
        </li>)
}
        </Link>
      </ul>
      </div>
    </header>
  )
}

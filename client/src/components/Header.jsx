// import { current } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermfromURL = urlParams.get('searchTerm')
    console.log(searchTermfromURL);
    if(searchTermfromURL){
      setSearchTerm(searchTermfromURL)
    }
  },[location.search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString()
    navigate(`/search/${searchQuery}`)
  }

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
      <form onSubmit={handleSubmit} className=' items-center flex rounded-md bg-zinc-200 p-2'>
        <input onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm} type='text' placeholder='Search...' className='  bg-transparent focus:outline-none w-24 sm:w-64'></input>
        <button >
        <FaSearch></FaSearch>
        </button>
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

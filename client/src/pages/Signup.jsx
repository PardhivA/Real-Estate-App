import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function Signup() {
const [formData, setFormData] = useState({})
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    try{ 
      setLoading(true)
    const res = await fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success === false){
      setError(data.message)
      setLoading(false)
      return;
    }
    
      alert("User is created successfully")
      navigate('/signin')
    setError(null)
    setLoading(false)
} catch(err){
  setError(err.message)
  setLoading(false)
}
  // console.log(data);
  }
  // console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-zinc-300'>Sign Up</h1>
      <form onSubmit = {handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='User name' className='rounded-md p-3' id='username' onChange={handleChange}>
        </input>
        <input type='email' placeholder='Email ID' className='rounded-md p-3' id='email' onChange={handleChange}>
        </input>
        <input type='password' placeholder='Password' className='rounded-md p-3' id='password' onChange={handleChange}>
        </input>
        <button disabled={loading} className='bg-zinc-300 uppercase p-3 text-zinc-700 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80'>
        {loading ? 'Loading...' : 'SignUp'}
        </button>
        <OAuth>
          
        </OAuth>
      </form>
      <div className='flex'>
      <p className='text-zinc-300 text-lg'> Have an account already? - </p>
      <Link to={"/SignIn"}>
        <p className='text-cyan-400 px-1 text-lg font-bold'> Sign In</p>
      </Link>
      </div>
      {error && <p className='text-red-500 mt-5'> {error} </p>}
      
    </div>  
  )
}

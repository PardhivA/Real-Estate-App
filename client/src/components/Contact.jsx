import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
   const [landLordData, setLandlordData] = useState(null)
   const [message,setMessage] = useState('')
   const onChangeHandler = (e) =>{
    setMessage(e.target.value)
   }
    useEffect(()=>{
        const fetchLandlordDetails = async ()=>{
            try{
                const result = await fetch(`/api/user/${listing.userRef}`)
                const data = await result.json()
                setLandlordData(data)
                console.log(data)
            }
            catch(error){
                console.log(error);
            }
    } 
    fetchLandlordDetails()
    },[listing])
  
    return (
        <>
        {landLordData &&
 (  <div className='text-zinc-200 text-2xl flex flex-col gap-2'>
         <p className=''> Contact <span className='font-semibold text-amber-600'>{landLordData.username}</span> for <span>{listing.name}</span></p>
        <textarea name='message' placeholder='Enter your message here' className='text-black w-full border p-3 rounded-lg mt-2' value={message} id="message" rows={3} onChange={onChangeHandler}></textarea>
        <Link className='bg-zinc-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90' to={`mailto:${landLordData.email}?subject=Regarding ${listing.name}&body=${message}`}>
        Send Message
        </Link>
    </div>)}
    </>
)
}

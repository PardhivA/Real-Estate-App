import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import { FaShare } from 'react-icons/fa'
export default function Listing() {
    SwiperCore.use([Navigation])
const params = useParams()
  const  [listing, setListing] = useState(false)
  const  [error, setError] = useState(false)
  const  [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false)
    useEffect(()=>{
        setLoading(true);
        setError(false);
        const getDetails = async () => {
            try{
             const Listing = await  fetch(`/api/listing/get/${params.listingId}`)
            const data = await Listing.json()
            if(data.success === false){
                setError(true)
                setLoading(false)
                return 
            }
            setListing(data)
            console.log(data.imageURLs.length);
            setLoading(false)
        }
        catch(err){

            setError(true)
            setLoading(false)
        }
         }

         getDetails()
},[])
  
    return (
    <main>
        {/* {listing && listing.name} */}
        {loading && <p className='text-center my-7 text-2xl'> loading... </p>}
        {error && <p className='text-red-400 text-center my-7 text-2xl'> Error fetching the listing </p>}
        {listing && !loading && !error && (
            <div>
            <Swiper navigation>
                {listing.imageURLs.map((url) => (
                    
                    <SwiperSlide key={url}>
                        <div className='h-[500px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
                    </SwiperSlide>
                ))}
            </Swiper>
                <div  className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-zinc-800 cursor-pointer'>
                    <FaShare onClick={()=>{
                        navigator.clipboard.writeText(window.location.href)
                        setCopied(true)
                        setTimeout(() => {
                            setCopied(false)
                        }, 2000)
                    }} className='text-zinc-300'></FaShare>

                </div>
                {copied && (<p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-zinc-700 p-2 text-zinc-300' >url copied</p>)}

            </div>
        )}
    </main>
  )
}

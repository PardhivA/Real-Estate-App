import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/swiper-bundle.css'
export default function Listing() {
    SwiperCore.use([Navigation])
const params = useParams()
  const  [listing, setListing] = useState(false)
  const  [error, setError] = useState(false)
  const  [loading, setLoading] = useState(false);
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
            </div>


        )}
    </main>
  )
}

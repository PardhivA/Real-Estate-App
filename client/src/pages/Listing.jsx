import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Contact from '../components/Contact'
export default function Listing() {
    SwiperCore.use([Navigation])
    const params = useParams()
    const  [listing, setListing] = useState(false)
    const  [error, setError] = useState(false)
    const  [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    const [contact, setContact] = useState(false); 
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
                        <div className='h-[600px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
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
                
                <div className='flex flex-col max-w-4xl mx-auto p-3 gap-4'>
                <p className='text-zinc-300 font-semibold text-2xl'>{listing.name} - ₹{' '}{listing.offer ? listing.discountPrice.toLocaleString('en-in') : listing.regularPrice.toLocaleString('en-in')}
                {listing.type==='rent'? ' / month' : ''}
                </p>
                <p className='flex items-center mt-6 my-2 gap-2 text-sm  text-zinc-200'>
                    <FaMapMarkerAlt className='text-zinc-200'></FaMapMarkerAlt>
                    {listing.address}
                </p>
                <div className='flex gap-4'>
                    <p className='bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>{listing.type==='rent' ? 'for Rent': 'for Sale'}</p>
                    {listing.offer ? 
                  (  <p className='bg-green-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>{'₹ '} {+listing.regularPrice - +listing.discountPrice}  {' off'}</p>)
                     : <></>
                }
                </div>
                <p className='text-zinc-300'>
                    <span className='font-semibold text-xl text-white'>Description - </span>
                    {listing.description}
                </p>
                <ul className='text-green-300 font-semibold text-sm flex flex-wrap gap-4 sm:gap-6'>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaBed className='text-lg'></FaBed>
                    {listing.bedrooms > 1  ? `${listing.bedrooms} beds` : `1 bed` }
                    </li>
                    
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaBath className='text-lg'></FaBath>
                    {listing.bathrooms > 1  ? `${listing.bathrooms} baths` : `1 bath` }
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaParking className='text-lg'></FaParking>
                    {listing.Parking ? 'Parking spot' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaChair className='text-lg'></FaChair>
                    {listing.Parking ? 'Furnished' : 'Unfurnished'}
                    </li>
                </ul>
                {currentUser && !contact && listing.userRef !== currentUser._id 
                && <button onClick={()=> setContact(true)} className='bg-blue-600 text-white rounded-lg uppercase hover:opacity-90 p-3'> Contact Owner</button> }
                {contact && <Contact listing={listing}/>}
                
                </div>
            </div>
        )}
    </main>
  )
}

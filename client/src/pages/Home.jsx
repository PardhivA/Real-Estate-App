import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import Listingcard from '../components/Listingcard'
export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  SwiperCore.use([Navigation])

  useEffect(()=>{

    const fetchSaleListings = async () => {
      try{
        const res = await fetch(`api/listing/getListings?type=sale&limit=4`)
        const data = await res.json()
        console.log(data);
        setSaleListings(data)
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try{
        const res = await fetch('/api/listing/getListings?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchOfferListings = async () => {
      try{
        const res = await fetch('/api/listing/getListings?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      }
      catch(error){

      }
    }
    fetchOfferListings()
  },[])

  return (
   <div>
    <div className='flex flex-col gap-6 p-20 px-3 max-w6xl mx-auto'>   
      <h1 className='text-zinc-200 font-bold text-3xl lg:text-6xl'>
      Find your your next <span className='bg-gradient-to-r from-amber-400 via-green-400 to-red-400 text-transparent bg-clip-text'>Sojourn</span>
      <br></br>
       with ease.  
    </h1>
    <div className='text-zinc-300 text-sm sm:text-lg'>
    SoJOYrn is the best place to find your next memorable stay.
    <br></br>  
    We have huge range of properties to choose from. 
    </div>
    <Link to={'/search'}
    className='text-xs sm:text-sm text-pink-400 font-bold hover:underline'
    >
      Why late ? Let's get started
    </Link>
    </div>
 
    <Swiper navigation>
    {
      offerListings && offerListings.length > 0  && offerListings.map((listing)=>(
        <SwiperSlide key={listing._id}>
          <div className='h-[800px]' key={listing._id} style={{background: `url(${listing.imageURLs[0]}) center no-repeat`, backgroundSize: 'cover'}}>

          </div>
        </SwiperSlide>
      ))
    }
    </Swiper>
    
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
    {
      offerListings && offerListings.length  > 0 && (
      <div className=''>
        <div className='my-3'> 
        <h2 className='text-2xl font-semibold text-zinc-200'>Recent Offers</h2>
        <Link className='text-amber-300 text-sm hover:underline' to={'/search?offer=true'}>
          Show more offers
        </Link>
        </div>
        <div className='flex flex-wrap gap-4'>
        {
          offerListings.map((listing) => (
            <Listingcard listing={listing} key={listing._id}></Listingcard>
          ))
        }
          </div>
      </div>
      )
      
    }

{
      rentListings && rentListings.length  > 0 && (
      <div className=''>
        <div className='my-3'> 
        <h2 className='text-2xl font-semibold text-zinc-200'>Recent rentings</h2>
        <Link className='text-amber-300 text-sm hover:underline' to={'/search?c'}>
          Show more rentings
        </Link>
        </div>
        <div className='flex flex-wrap gap-4'>
        {
          rentListings.map((listing) => (
            <Listingcard listing={listing} key={listing._id}></Listingcard>
          ))
        }
          </div>
      </div>
      )
      
    }{
      saleListings && saleListings.length  > 0 && (
      <div className=''>
        <div className='my-3'> 
        <h2 className='text-2xl font-semibold text-zinc-200'>Recent places for sales</h2>
        <Link className='text-amber-300 text-sm hover:underline' to={'/search?type=sale'}>
          Show more places for sales
        </Link>
        </div>
        <div className='flex flex-wrap gap-4'>
        {
          saleListings.map((listing) => (
            <Listingcard listing={listing} key={listing._id}></Listingcard>
          ))
        }
          </div>
      </div>
      )
      
    }
    </div>

   </div>
  )
}
  
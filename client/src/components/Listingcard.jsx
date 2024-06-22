import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import { FaBath, FaBed } from 'react-icons/fa'
export default function Listingcard({listing}) {
  return (
    <div className=' bg-white shawdow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
    <Link to={`listings/${listing._id}`}>
    <img 
    src={listing.imageURLs[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
    alt='listing cover image'
      className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
    ></img>
    <div className=' p-3 flex flex-col gap-2 w-full'><p className='text-lg text-zinc-600 font-semibold truncate'> {listing.name}</p>
    <div className=' flex items-center gap-1'>
    <MdLocationOn className='h-4 w-4 text-green-600'></MdLocationOn>
    <p className='text-sm text-zinc-500 truncate'>{listing.address}</p>
    </div>
    <p className=' text-zinc-600 line-clamp-2 text-sm'>{listing.description}</p>
    <p className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-lg mt-2 font-semibold '>₹{' '}{listing.offer
 ? listing.discountPrice.toLocaleString('en-in') : listing.regularPrice.toLocaleString('en-in')} {listing.type==='rent' ? '/ month' : ''}</p>
    <div className='flex gap-2 '>
      <div className='flex gap-2 items-center'>
      <FaBed className='text-lg'></FaBed>
        {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
      </div>
      <div className='flex gap-2 items-center'>
      <FaBath className='text-lg'></FaBath>
        {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
      </div>
    </div>
    </div>
    </Link>
    </div>
  )
}

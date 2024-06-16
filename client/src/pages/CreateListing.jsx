import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl  font-semibold text-center my-7 text-zinc-300' > Create a Listing </h1>
        <form  className='flex flex-col sm:flex-row gap-6'>

            <div className='flex flex-col gap-4 flex-1'> 
          <input  type='text'  placeholder='Name'  className='border rounded-md p-3' maxLength='62' minLength='10' required id='username' />
   
      <textarea  type='text' placeholder='Description' className='rounded-md p-3' id='description' />
      <input  type='text'  placeholder='Address'  className='border rounded-md p-3' maxLength='62' minLength='10' required id='address'/>
      
      <div className='flex gap-4'>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'sale' className='w-5 scale-150'/>
            <span className = 'text-white text-sm '>Sell  </span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'rent' className='w-5 scale-150'/>
            <span className = 'text-white text-sm'>Rent</span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'parking' className='w-5 scale-150'/>
            <span className = 'text-white text-sm'>Parking Spot</span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'furnsihed' className='w-5 scale-150'/>
            <span className = 'text-white text-sm'>Furnished</span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'offer' className='w-5 scale-150'/>
            <span className = 'text-white text-sm'>Offer</span>
        </div>
      </div>

        <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
                <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
                <p className='text-white'>Bedrooms</p>
            </div>
            <div className='flex items-center gap-2'>
                <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
                <p className='text-white'>Bathrooms</p>
            </div>

            <div className='flex items-center gap-2'>
                <input type='number' id='regularprice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
                <div className='flex flex-col items-center'>
                <p className='text-white'>Regular Price</p>
                <span className='text-xs text-white'>($ / month)</span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <input type='number' id='discountedPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
            <div className='flex flex-col items-center'>
                <p className='text-white'>Discounted Price</p>
                <span className='text-xs text-white'>($ / month)</span>
            </div>
            </div>

        </div>

            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='text-white '> Images: <span className='text-zinc-400'> The first image will be the cover (max 6) </span></p>
                <div className='flex gap-4'>
                    <input className='p-3 border  text-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple></input>
                    <button className='p-3 text-zinc-300 border border-green rounded uppercase hover:opacity-80'>Upload</button>
                </div>
                    <button className='p-3  bg-zinc-300 text-zinc-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            </div>
    </form> 
    </main> 
  )
}

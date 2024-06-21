import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
const [sideBarData, setSideBarData] = useState({
    searchTerm : '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc'
})

const [loading, setLoading] = useState(false)
const [listings, setListings] = useState(null)
const navigate = useNavigate()

console.log(listings);

console.log(sideBarData);
const handleChange = (e) =>{
    if(e.target.id==='searchTerm'){
        setSideBarData(
        {    ...sideBarData,
            searchTerm : e.target.value
        })
    }
    if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
        setSideBarData({
            ...sideBarData,
            type: e.target.id
        })
    }
    else if(e.target.id==='parking' || e.target.id ==='offer' || e.target.id === 'furnished'){
        setSideBarData({
            ...sideBarData,
            [e.target.id] : e.target.checked || e.target.checked === 'true' ? true : false
        })

    }
    else if(e.target.id === 'sort_order'){
        let sort = e.target.value.split('_')[0] || 'created_at'
        let order = e.target.value.split('_')[1] || 'desc'
        setSideBarData({...sideBarData, sort,order})
    }
}
    const handleSubmit = (e)=>{
        e.preventDefault()
        const urlParams=  new URLSearchParams(location.search)
    urlParams.set('searchTerm', sideBarData.searchTerm )
    urlParams.set('type', sideBarData.type)
    urlParams.set('parking', sideBarData.parking)
    urlParams.set('furnished', sideBarData.furnished)
    urlParams.set('offer', sideBarData.offer)
    urlParams.set('sort', sideBarData.sort)
    urlParams.set('order', sideBarData.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermfromURL = urlParams.get('searchTerm')
        const typefromURL = urlParams.get('type')
        const parkingfromURL = urlParams.get('parking')
        const furnishedfromURL = urlParams.get('furnished')
        const offerfromURL = urlParams.get('offer')
        const sortfromURL = urlParams.get('sort')
        const orderfromURL = urlParams.get('order')


        if(searchTermfromURL || typefromURL
            || parkingfromURL
            || furnishedfromURL
            || offerfromURL
            || sortfromURL
            || orderfromURL  ){
                setSideBarData({
                    searchTerm : searchTermfromURL || '',
                    type : typefromURL || 'all',
parking : parkingfromURL === 'true' ? true : false ,
furnished : furnishedfromURL === 'true' ? true : false,
offer : offerfromURL === 'true' ? true : false ,
sort : sortfromURL || 'createdAt',
order : orderfromURL || 'desc',
                })
            }

        const fetchListings = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`api/listing/getListings?${searchQuery}`)
            const data = await res.json()
            setListings(data)
        }
        fetchListings()

    },[location.search])

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <div className='flex items-center gap-2 '>
                    <label className='whitespace-nowrap text-zinc-200 font-semibold text-xl'>
                    Search Term: 
                    </label>
                    <input className='rounded-lg border p-3 w-full' value={sideBarData.searchTerm} onChange={handleChange} type='text' id='searchTerm' placeholder='Search...'></input>
                </div>
                <div className='flex flex-wrap gap-4 items-center text-white '>
                    <label className='text-zinc-200 font-semibold text-xl'>Type: </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' value={sideBarData.type==='all'} onChange={handleChange}></input>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' value={sideBarData.type==='sale'} onChange={handleChange}></input>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' value={sideBarData.type==='rent'} onChange={handleChange}></input>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' value={sideBarData.offer} onChange={handleChange}></input>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-4 items-center text-white'>
                    <label className='text-zinc-200 font-semibold text-xl'>Amenities: </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' value={sideBarData.parking} onChange={handleChange}></input>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' value={sideBarData.furnished} onChange={handleChange}></input>
                        <span>Furnished</span>
                    </div>
                    
                </div>
                <div className='flex gap-4 items-center'>
                    <label className='whitespace-nowrap text-zinc-200 font-semibold text-xl'>
                    Sort: 
                    </label>
                        <select className='rounded-lg p-3 border' defaultValue={'createdAt_desc'} id='sort_order' onChange={handleChange}>
                            <option value='regularPrice_asc'> Price - low to high</option>
                            <option value='regularPrice_desc'> Price - high to low</option>
                            <option value='createdAt_desc'> Latest</option>
                            <option value='createdAt_asc'> Oldest</option>
                        </select>
                    </div>
                    <button type='submit' className='rounded-lg text-zinc-700 font-semibold bg-zinc-300 border w-full h-10 hover:opacity-80'>SEARCH</button>
            </form>
        </div>
        <div className='text-3xl font-semibold border-b p-3 text-zinc-200 '>Listings: </div>
    </div>
  )
}

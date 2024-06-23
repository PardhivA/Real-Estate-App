import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import {useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageURLs: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1, 
        regularPrice: 50000,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    })
    const navigate = useNavigate()
    const [uploading, setUploading] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log(files);
    const params= useParams();
    
    useEffect(()=>{
        const fetchListing = async () => {
            console.log(params.listingId)
           const res = await fetch(`/api/listing/get/${params.listingId}`)
           const data = await res.json()
           if(data.success === false){
               console.log(data.message)
               return 
            } 
            console.log(data);
           setFormData(data)
           console.log(formData.parking);
        }
        
        fetchListing()
    },[])

    
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageURLs.length < 7){
            setUploading(true)  
            setImageUploadError(false)
            const promises = []
            for(var i = 0 ; i< files.length ; i++){
                promises.push(storeImage(files[i])) // pushes links
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData, imageURLs: formData.imageURLs.concat(urls)});
                setImageUploadError(false)
                setUploading(false)
            }).catch((err)=>{
                setImageUploadError('Image upload failed (2mb max per image)')
                setUploading(false)
            })
        }   
        else {
            setImageUploadError('You can upload upto 6 images only')
            setUploading(false)
        }      
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage,fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error)=>{
                    reject(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL)
                    })
                }
            )
        })
    }



    const handleRemoveImage = (index) => {
        setFormData({
            ...formData, imageURLs: formData.imageURLs.filter((_,i) => i !== index)
    })
    }

    const  handleChange = (e) => {
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type : e.target.id
            })
        }
        else if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }
        if(e.target.type ===  'number' || e.target.type === 'text' || e.target.type ===  'textarea'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.value // square bracket is for to get the variable not value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(formData.imageURLs.length < 1) return setError('Atleast one image has to be uploaded')
            if(+formData.regularPrice < +formData.discountPrice) return setError('Discount Price should be less than or equal to Regular Price')
                
            setLoading(true);
            setError(false);
            const result = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                })
            })

            const data = await result.json()
            setLoading(false)
            if(data.success === false){
                setError(data.message)
                return
            }
            setError(false)
            alert('updated listing successfully')
            navigate(`/listings/${data._id}`)
        }
        catch(error){
            setError(error.message)
        }
    }

    return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl  font-semibold text-center my-7 text-zinc-300' > Update this Listing </h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-6'>

            <div className='flex flex-col gap-4 flex-1'> 
          <input  type='text'  placeholder='Name'  className='border rounded-md p-3' maxLength='62' minLength='10' required id='name' onChange={handleChange} value={formData.name}/>
   
      <textarea  type='text' placeholder='Description' className='rounded-md p-3' id='description' onChange={handleChange} value={formData.description}/>
      <input  type='text'  placeholder='Address'  className='border rounded-md p-3' maxLength='62' minLength='10' required id='address' onChange={handleChange} value={formData.address}/>
      
      <div className='flex gap-4'>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'sale' className='w-5 scale-150' onChange={handleChange} checked={formData.type === 'sale'}/>
            <span className = 'text-white text-sm '>Sell  </span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'rent' className='w-5 scale-150' onChange={handleChange} checked={formData.type === 'rent'}/>
            <span className = 'text-white text-sm'>Rent</span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'parking' className='w-5 scale-150' onChange={handleChange} checked={formData.parking}/>
            <span className = 'text-white text-sm'>Parking Spot</span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'furnsihed' className='w-5 scale-150' onChange={handleChange} checked={formData.furnished}/>
            <span className = 'text-white text-sm'>Furnished</span>
        </div>
        <div className = 'flex gap-2 items-center'>
            <input type='checkbox' id = 'offer' className='w-5 scale-150' onChange={handleChange} checked={formData.offer}/>
            <span className = 'text-white text-sm'>Offer</span>
        </div>
      </div>

        <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
                <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  onChange={handleChange} value={formData.bedrooms}/>
                <p className='text-white'>Bedrooms</p>
            </div>
            <div className='flex items-center gap-2'>
                <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  onChange={handleChange} value={formData.bathrooms}/>
                <p className='text-white'>Bathrooms</p>
            </div>

            <div className='flex items-center gap-2'>
                <input type='number' id='regularPrice' min='50' max='100000000' required className='p-3 border border-gray-300 rounded-lg'  onChange={handleChange} value={formData.regularPrice}/>
                <div className='flex flex-col items-center'>
                <p className='text-white'>Regular Price (₹)</p>
{formData.type=== 'rent' && 
                <span className='text-xs text-white'>(₹ / month)</span>
                }
                                </div>
            </div>
            {formData.offer ? (<div className='flex items-center gap-2'>
                <input type='number' id='discountPrice' min='0' max='100000000' required className='p-3 border border-gray-300 rounded-lg'  onChange={handleChange} value={formData.discountPrice}/>
            <div className='flex flex-col items-center'>
                <p className='text-white'>Discounted Price (₹)</p>
{formData.type=== 'rent' && 
                <span className='text-xs text-white'>(₹ / month)</span>
                }
                            </div>
            </div> )
             :
            <span></span>}
            
        </div>

            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='text-white '> Images: <span className='text-zinc-400'> The first image will be the cover (max 6) </span></p>
                <div className='flex gap-4'>
                    <input onChange={(e) => setFiles(Array.from(e.target.files)) } className='p-3 border  text-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple></input>
                    <button type='button' onClick={handleImageSubmit} className='p-3 text-zinc-300 border border-green rounded uppercase hover:opacity-80 disabled={uploading}'>{uploading ? 'Uploading...' : 'Upload'}</button>
                    
                </div>
                <p className='text-red-500'> {imageUploadError ? imageUploadError : ''}</p>
                {
                    formData.imageURLs.length > 0 && formData.imageURLs.map((url, index) => (
                        // <img src={url} alt='listing image' className='w-40 h-40 object-cover rounded-lg'/>
                        <div key={index} className='flex justify-between'> 
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <button type='button'className='text-red-600 p-3 rounded-lg uppercase hover:opacity-95' onClick={()=>{handleRemoveImage(index)} }>Delete</button> 
                        
                        </div>
                    ))
                }
                <button disabled={loading || uploading} className='p-3  bg-zinc-300 text-zinc-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Uploading' : 'Update Listing'}</button>
                {error ? <p className='text-red-500'> {error}</p>: ''}
            </div>
    </form> 
    </main> 
  )
}

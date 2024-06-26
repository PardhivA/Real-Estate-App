import {useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { updateStart, updateSuccess, updateFailure, deleteStart, deleteSuccess, deleteFailure , signOutStart, signOutSuccess, signOutFailure} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser, loading, error} = useSelector(state => state.user)
    const fileRef = useRef(null)
    const [file,setFile] = useState(null)
    const [fileUploadPercentage, setFileUploadPercentage] = useState(0)
    const [fileUploadError, setFileUploadEror] = useState(false);
    const [formData, setFormData] = useState({})
    const [uploadSuccessful, setUploadSuccesful] = useState(false)
    const [showListingsError, setShowListingsError] = useState(false);
    const [listingsData, setListingsData] = useState([]);
    console.log(file);
    


    const handleFileUpload = (file) =>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setFileUploadPercentage(Math.round(progress))
        },
      
      (error) => {
        setFileUploadEror(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormData({...formData, avatar : downloadURL})
          }
        )
      }
    )
    }
    useEffect(()=>{
      if(file){
        handleFileUpload(file)
      }
    },[file])

    const handleChange =  (e) => {
         setFormData({...formData, [e.target.id]: e.target.value})
    };
     
    const handleDeleteUser = async () => {
      try{
        dispatch(deleteStart())
        const res  = await fetch(`api/user/delete/${currentUser._id}`,{
          method: 'DELETE',
        });

        const data = await res.json()
        if(data.success === false){
          dispatch(deleteFailure(data.message))
          return;
        }
        dispatch(deleteSuccess(data))
      }
      catch(error){
        dispatch(deleteFailure(error.message))
      }
    } 


    const handleSignout = async () => {
      try{
        dispatch(signOutStart())
        const res = await fetch('/api/auth/signout')
        const data = await res.json()
        if(data.success === false){
          dispatch(signOutFailure(data.message))
        }
        dispatch(signOutSuccess(data)) 
      }
      catch(error){
      dispatch(signOutFailure(error.message))

      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try{
        dispatch(updateStart())
        const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        // setError(data.message)
        // setLoading(false)
        dispatch(updateFailure(data.message))
        
        return;
      }
      
        alert("updated successfully")
        // navigate('/')
      // setError(null)
      // setLoading(false)
      setUploadSuccesful(true)
      dispatch(updateSuccess(data))
  
      }
      catch(error){
        dispatch(updateFailure(error.message))
      }
 };
  
  const handleShowListings = async()=>{
    setShowListingsError(false);
    try{
      const result= await  fetch(`/api/user/listings/${currentUser._id}`);
      const data = await result.json()
      if(data.success === false){
        setShowListingsError(true)
        return;
      }
      setListingsData(data);
      setShowListingsError(false);
    }
    catch(error){
      setShowListingsError(true)
    }
  }

    const handleDeleteListing = async (listingIndex) => {
      try{const result = await fetch(`api/listing/delete/${listingsData[listingIndex]._id}`,{
        method: 'DELETE'
      })

      const data = await result.json()
      if(data.success === false){
        console.log(data.message);
        return
      }  
      setListingsData((prev) => prev.filter((listing, index) => index !== listingIndex))
    }
      catch(error){
        console.log(error.message)
      }
    }

    return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7 text-zinc-300'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    <input  onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden></input>
    <img onClick={() => {fileRef.current.click()}} src={formData.avatar || currentUser.avatar} alt='ProfilePhoto' className='rounded-full object-cover h-24 w-24 cursor-pointer mx-auto p-3'></img>

      <p className='text-lg self-center'>
        {fileUploadError ? <span className='text-red-400'> Image Upload Error</span> : 
        fileUploadPercentage > 0 && fileUploadPercentage < 100 ? <span className='text-green-400'> {`File Upload Percentage: ${fileUploadPercentage}`}</span> :
        fileUploadPercentage === 100 ? <span className='text-green-400'> File Uploaded Succesfully</span> :
        <span> </span>
        }
      </p>
      <input onChange={handleChange} type='text' defaultValue= {currentUser.username}   className='rounded-md p-3' id='username' >
      </input>
      <input onChange={handleChange} type='email' defaultValue={currentUser.email} className='rounded-md p-3' id='email' >
      </input>
      <input onChange={handleChange} type='password' placeholder='Password' className='rounded-md p-3' id='password' >
      </input>
      <button  disabled={loading} className='bg-zinc-300 uppercase p-3 text-zinc-700 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80'>
            {loading ? 'loading...' : 'Update'}
      </button>
      <Link to={'/CreateListing'} className='bg-zinc-300 uppercase p-3 text-zinc-700 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80 text-center'>
      <button  >
            Create a Listing
      </button>
      </Link>
    </form>
    <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser}  className='text-red-500 cursor-pointer'> Delete Account</span>
        <span  onClick={handleSignout} className='text-red-500 cursor-pointer'> Sign Out</span>
    </div>
    <span className='text-red-200'>{error ? `${error.message}` : ''}</span>
    <span className='text-green-200'>{uploadSuccessful ? "upload Successful" : ''}</span>
    <button type='button' className='text-green-400 w-full hover:underline' onClick={handleShowListings}>My Listings</button>
    <p className='text-red-500 mt-5'>{showListingsError ? 'Error Retrieving Listings' : ''}</p>
    
    {
      listingsData.length > 0 && <div className='flex flex-col gap-4'>
        <h1 className='text-center my-7 font-semibold text-2xl text-zinc-50'>Your Listings</h1>
        {listingsData.map((listing,index) => 
        (
        
        <div key={listing._id} className='flex justify-between items-center border rounded-md p-3 gap-4'>
          <Link to={`/listings/${listing._id}`}>
          <img src={listing.imageURLs[0]} className='w-14 h-16 object-contain hover:w-16'></img>
           </Link>
           <Link to={`/listings/${listing._id}`}>
           <p className='text-zinc-300 font-semibold  truncate hover:text-xl'>{listing.name}</p>
           </Link>
           <div className='flex flex-col items-center'>
            <button type='button' className='text-red-500 hover:underline' onClick={()=>{handleDeleteListing(index)}}> DELETE</button>
            <Link to={`/UpdateListing/${listing._id}`}>
            <button  type='button' className='text-green-400 hover:underline'> EDIT</button>
            </Link>
           </div>
           </div>
           )
       )}
       </div>
    }


  </div>  
  )
}

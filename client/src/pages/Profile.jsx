import {useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
export default function Profile() {
    const {currentUser} = useSelector(state => state.user)
    const fileRef = useRef(null)
    const [file,setFile] = useState(null)
    const [fileUploadPercentage, setFileUploadPercentage] = useState(0)
    const [fileUploadError, setFileUploadEror] = useState(false);
    const [formData, setFormData] = useState({})
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

    return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7 text-zinc-300'>Profile</h1>
    <form  className='flex flex-col gap-4'>
    <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden></input>
    <img onClick={() => {fileRef.current.click()}} src={formData.avatar || currentUser.avatar} alt='ProfilePhoto' className='rounded-full object-cover h-24 w-24 cursor-pointer mx-auto p-3'></img>

      <p className='text-lg self-center'>
        {fileUploadError ? <span className='text-red-400'> Image Upload Error</span> : 
        fileUploadPercentage > 0 && fileUploadPercentage < 100 ? <span className='text-green-400'> {`File Upload Percentage: ${fileUploadPercentage}`}</span> :
        fileUploadPercentage == 100 ? <span className='text-green-400'> File Uploaded Succesfully</span> :
        <span> </span>
        }
      </p>
      <input type='text' placeholder= {currentUser.username}   className='rounded-md p-3' id='username' >
      </input>
      <input type='email' placeholder={currentUser.email} className='rounded-md p-3' id='email' >
      </input>
      <input type='password' placeholder='Password' className='rounded-md p-3' id='password' >
      </input>
      <button  className='bg-zinc-300 uppercase p-3 text-zinc-700 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80'>
            Update
      </button>
      <button  className='bg-zinc-300 uppercase p-3 text-zinc-700 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80'>
            Create a Listing
      </button>
    </form>
    <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'> Delete Account</span>
        <span className='text-red-500 cursor-pointer'> Sign Out</span>
    </div>
    
  </div>  
  )
}

import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react'
import { app } from '../../../api/firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleGoogleAuth = async () => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider)
            console.log(result);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name : result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                })
            })

            const data = await res.json()
            console.log(data);
            navigate('/')
            dispatch(signInSuccess(data))
        }
        catch(error){
            console.log("Error while signing in with google", error);
        }
    }

  return (
<button onClick={handleGoogleAuth} type='button' className='bg-blue-500 uppercase p-3 text-zinc-200 text-lg font-semibold rounded-md hover:opacity-90 disabled:opacity-80'>
        Sign up with Google
        </button>  )
}

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
export default function App() {
  return (<BrowserRouter>
  <Header />
  <Routes>
<Route path='/' element={<Home />}/>
<Route path='/About' element={<About />}/>
<Route path='/SignIn' element={<Signin/>}/> 
<Route element={<PrivateRoute/>}>
<Route path='/Profile' element={<Profile/>}/> </Route>
<Route path='/CreateListing' element={<CreateListing/>}/> 
<Route path='/SignUp' element={<Signup />}/>
  </Routes>
  </BrowserRouter>
)}

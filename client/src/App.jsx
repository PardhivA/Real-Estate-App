import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
export default function App() {
  return (<BrowserRouter>
  <Routes>
<Route path='/' element={<Home />}/>
<Route path='/About' element={<About />}/>
<Route path='/SignIn' element={<Signin/>}/>
<Route path='/SignOut' element={<Signout />}/>
  </Routes>
  </BrowserRouter>
)}

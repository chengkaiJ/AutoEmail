import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import SendEmail from './components/SendEmail'


function App() {
  return (
    <div className='bg-stone-600 text-white'>
      <div>
        <div>
          <Navbar />
        </div>
        <div className='border-t-[1px] border-t-[#dcdae4]' />

        <div className='w-full text-white '>
          <Routes>
            <Route path='/' element={<div />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sendemail" element={<SendEmail />} />
          </Routes>
        </div>

      </div>
    </div>
  )
}

export default App
import React from 'react'
import HeroSection from './HeroSection'
import Feature from './Feature'
import ScanQRCode from './ScanQRCode'

function Home() {
  return (
    <>
        <HeroSection/>
        <ScanQRCode />
        <Feature />
    </>
  )
}

export default Home
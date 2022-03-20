import React from 'react'
import HeroSection from './HeroSection'
import {jumbotron} from './Data'
import Feature from './Feature'
import ScanQRCode from './ScanQRCode'

function Home() {
  return (
    <>
        <HeroSection {...jumbotron}/>
        <ScanQRCode />
        <Feature />
    </>
  )
}

export default Home
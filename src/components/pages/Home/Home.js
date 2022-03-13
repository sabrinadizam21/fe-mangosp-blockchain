import React from 'react'
import HeroSection from '../../HeroSection'
import {jumbotron} from './Data'

function Home() {
  return (
    <>
        <HeroSection {...jumbotron}/>
    </>
  )
}

export default Home
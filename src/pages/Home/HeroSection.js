import React, { useContext,useEffect,useState } from 'react';
import './HeroSection.css';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie';

function HeroSection() {
  const { profile, functionUser } = useContext(UserContext)
  const { getUserLogin } = functionUser
  const [ lightBg ] = useState(false)
  const [ lightTextDesc ] = useState(true)
  const [ lightText ] = useState(true)
  const [ imgStart ] = useState('')
  
  const username = Cookies.get('username')
  const loginStatus = Cookies.get('loginStatus')
  useEffect(()=>{
    getUserLogin(username)
  }, [])

  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  Rantai Pasok Mangga
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  { !loginStatus || username === undefined ? (`Selamat Datang!`) : (`Selamat Datang, ${profile.namaLengkap}!`)}
                  
                </p>
                <Link to='/'>
                  <Button buttonSize='btn--wide' buttonColor='primary'>
                    Scan QR Code
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <div className="home__hero-tooltip">
                  <img src={'mango.png'} alt={'Mangga'} className='home__hero-img'/>
                  <span className='home__hero-tooltiptext'>Background vector created by freepik - www.freepik.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
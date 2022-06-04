import React, { useContext,useEffect } from 'react';
import './HeroSection.css';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie';

function HeroSection({
  lightBg,
  lightText,
  lightTextDesc,
  headline,
  buttonLabel,
  img,
  alt,
  imgStart
}) {
  const { profile, functionUser } = useContext(UserContext)
  const { getUserLogin } = functionUser

  const username = Cookies.get('username')
  useEffect(async()=>{
    getUserLogin(username)
  }, [])
  
  console.log(profile)
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
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  { profile !== '' ? (`Selamat Datang, ${profile.namaLengkap}!`) : (`Selamat Datang!`)}
                  
                </p>
                <Link to='/'>
                  <Button buttonSize='btn--wide' buttonColor='primary'>
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <div className="home__hero-tooltip">
                  <img src={img} alt={alt} className='home__hero-img'/>
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
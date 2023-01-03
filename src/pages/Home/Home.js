import React, { useContext, useEffect, useState, useRef } from 'react'
import './HeroSection.css'
import './ScanQRCode.css'
import './Feature.css'
import Cookies from 'js-cookie'
import { QrReader } from 'react-qr-reader'
import { Button } from '../../components/Button'
import { Link, Route } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { FaFire } from 'react-icons/fa'
import { BsXDiamondFill } from 'react-icons/bs'
import { GiCrystalize } from 'react-icons/gi'
import { IconContext } from 'react-icons/lib'
import { AsetContext } from '../../context/AsetContext'
import { Loading } from '../../components/Loading'

function Home() {
  const { functionUser } = useContext(UserContext)
  const { loading, setLoading } = useContext(AsetContext)
  const { getUserLogin } = functionUser
  const [ lightBg ] = useState(false)
  const [ lightTextDesc ] = useState(true)
  const [ lightText ] = useState(true)
  const [ imgStart ] = useState('')
  
  const username = Cookies.get('username')
  const [dataQR, setDataQR] = useState('')

  useEffect(()=>{
    if(username !== undefined) getUserLogin(username)
  }, [username])

  const handleChange = (event) => {
    setDataQR(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let idTrx = dataQR
    window.location.href = `/detail-transaksi/${idTrx}`
  }

  const handleError = (error) => {
    alert(error)
  }

  const handleResult = (result) => {
    if(result) {
      // var id = result.substr(102,64)
      // setDataQR(id)
      window.location.replace(result)
      window.open()
      setLoading(true)
      return( 
        <Route component={() => { 
          window.location.href = result
          return null
        }}/>
      )
    }
    setLoading(false)
  }
  const scollToRef = useRef()
  return (
    <>
    { loading ? < Loading /> : (<>
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
                <p className={ lightTextDesc ? 'home__hero-subtitle' : 'home__hero-subtitle dark' } style={{marginBottom: '20px'}} >
                  {/* { !loginStatus || username === undefined ? (`Selamat Datang!`) : (`Selamat Datang, ${profile.namaLengkap}!`)} */}
                  Lihat informasi mangga dari benih hingga panen disini
                </p>
                <Button onClick={() => scollToRef.current.scrollIntoView()} buttonSize='btn--wide' buttonColor='primary'>
                  Scan QR Code
                </Button>
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

      <div className='qrcode__section' ref={scollToRef}>
        <div className='qrcode__wrapper'>
          <h1 className='qrcode__heading'>Scan QR Code</h1>
          <p className='qrcode__heading'> Scan QR Code atau masukan ID Transaksi untuk melihat detail transaksi</p>
          <div className='qrcode__container'>
            <div className="qrcode__container-camera">
            <QrReader
              onResult={handleResult}
              onError={handleError}
              style={{ width: '300px' }}
            />
            </div>
            <form onSubmit={handleSubmit}>
              <input className='qrcode__input' type="text" placeholder='ID Transaksi' required value={dataQR} onChange={handleChange} />
              <br />
              <Button type={'submit'} buttonStyle='btn--primary' buttonColor='primary'>LIHAT TRANSAKSI</Button>
            </form>
          </div>
        </div>
      </div>

      <div className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'} >
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
            <div className="home__hero-tooltip">
                <img src={'ketertelusuran.png'} alt={'trace'} className='home__hero-img' /> 
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='home__hero-img-wrapper'>
              <div className='top-line'>Informasi Lengkap</div>
              <h4 className={lightText ? 'heading' : 'heading dark'}>Informasi Mangga</h4>
              <p className={ lightTextDesc ? 'home__hero-subtitle' : 'home__hero-subtitle dark' } >
                Cek detail informasi produk dari proses penyiapan benih hingga kegiatan perdagangan
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className={'home__hero-section'} >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
          <div className='col'>
            <div className='home__hero-img-wrapper'>
              <div className='top-line'>AMAN DAN TERPERCAYA</div>
              <h4 className='heading'>Teknologi Blockchain</h4>
              <p className='home__hero-subtitle'>
                Sistem ini menggunakan teknologi Blockchain dimana data yang tersimpan tidak dapat diubah sehingga terhindar dari modifikasi data         
              </p>
            </div>
          </div>
          <div className='col'>
            <div className='home__hero-text-wrapper'>
              <div className="home__hero-tooltip">
                <img src={'blockhain.png'} alt={'Blockchain'} className='home__hero-img'/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      { Cookies.get('token') ? 
      <IconContext.Provider value={{ color: '#fff', size: 64 }}>
      <div className='feature__section'>
        <div className='feature__wrapper'>
          <h1 className='feature__heading'>Fitur Kami</h1>
          <div className='feature__container'>
            <Link to='/aset' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                <FaFire className='icon'/>
                <h3>Aset</h3>
                <p>Cek aset yang Anda miliki</p>
              </div>
            </Link>
            <Link to='/transaksi' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                  <BsXDiamondFill className='icon'/>
                <h3>Transaksi</h3>
                <p>Lihat list transaksi masuk dan keluar</p>
              </div>
            </Link>
            <Link to='/transaksi/buat' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                  <GiCrystalize className='icon'/>
                <h3>Buat Transaksi</h3>
                <p>Lakukan transaksi dengan pengguna lain</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      </IconContext.Provider> 
      : '' }
    </>)}
    </>
  )
}

export default Home
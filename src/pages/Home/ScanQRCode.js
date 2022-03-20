import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import './ScanQRCode.css'
import '../../components/Button.css'
import { QrReader } from 'react-qr-reader';

function ScanQRCode() {

  const [dataQR, setDataQR] = useState('');

  const handleChange = (event) => {
    setDataQR(event.target.value)
  }

  const handleError = (error) => {
    alert(error);
  }

  const handleResult = (result) => {
    if(result) {
      setDataQR(result)
    }
  }

  return (
    <>
        <div className='qrcode__section'>
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
              <form action="">
                <p style={{marginLeft : '10px', fontSize:'10pt'}}>ID Transaksi muncul, tekan tombol Lihat Transaksi</p> <br/>
                <input className='qrcode__input' type="text" placeholder='ID Transaksi' required value={dataQR} onChange={handleChange} />
                <br />
                <input type="submit" className='btn primary' value={'Lihat Transaksi'}/>
              </form>       
            </div>
          </div>
        </div>
    </>
  )
}

export default ScanQRCode
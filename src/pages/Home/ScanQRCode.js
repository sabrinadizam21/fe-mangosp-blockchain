import React, { useState } from 'react'
import './ScanQRCode.css'
import '../../components/Button.css'
import { QrReader } from 'react-qr-reader'
import { Button } from '../../components/Button'

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
               <input className='qrcode__input' type="text" placeholder='ID Transaksi' required value={dataQR} onChange={handleChange} />
                <br />
                <Button type={'submit'} buttonStyle='btn--primary' buttonColor='primary'>LIHAT TRANSAKSI</Button>
              </form>       
            </div>
          </div>
        </div>
    </>
  )
}

export default ScanQRCode
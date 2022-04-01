import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { FaSeedling } from 'react-icons/fa'
import './Aset.css'

function Aset() {
  return (
    <>
        <div className="aset__wrapper">
            <div className="aset__section">
              <div className="aset__header">
                {/* Header */}
                <div>
                  <div className="aset__title"><h4>Aset</h4></div>
                  <div className="aset__subtitle">Aset yang Anda miliki</div>
                </div>
                <div className="aset__btn-tambahBenih">
                  <Link to='/tambahaset'>
                    <Button buttonColor='primary'>TAMBAH BENIH</Button>
                  </Link>
                </div>
              </div>
              <div className="aset__content">
                <div className="card">
                  <div className="card__header">
                    <div className="card__icon">
                      <FaSeedling className='card__logo' />
                    </div>
                    <div style={{marginLeft: '20px'}}>
                      <b>Benih A</b>
                      <p className="card__timestamp">23 Maret 2022 - 23:59 WIB</p>
                    </div>                
                  </div>
                  <div className="card__body">
                    <div className="quantity-value">
                      <div className="quantity">
                        <span>Kuantitas</span>
                        <p>1000 Kg</p>
                      </div>
                      <div className="value">
                        <span>Harga per Kg</span>
                        <p>Rp100,000</p>
                      </div>
                    </div>
                    <div className="seed-age">
                      <span>Umur Benih</span> 
                      <p>20 hari</p>
                    </div>
                    <div className="harvest-age">
                      <span>Umur Panen</span> <p>20 hari</p>
                    </div>
                  </div>
                  <div className="card__bottom">
                    <Link className='aset-link' to='/tambahkuantitas'>TAMBAH KUANTITAS</Link>
                  </div>
                </div> 
              </div>
            </div>
        </div>
    </>
  )
}

export default Aset
import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { FaSeedling } from 'react-icons/fa'
import './Aset.css'
import Modal from '../../components/Modal'
import { Input } from '../../components/Input'

function Aset() {
  const [modalOpen, setModalOpen] = useState(false);
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
                  <Link to='/aset/daftaraset'>
                    <Button buttonColor='primary'>DAFTAR ASET</Button>
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
                      <Button className="openModalBtn"
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      > 
                      TAMBAH KUANTITAS
                      </Button>
                    {modalOpen && 
                      <Modal setOpenModal={setModalOpen} 
                        modalTitle={'Tambah Kuantitas'}  
                        modalBody={
                          <>
                            <p>Kuantitas Benih A saat ini : 1.000 Kg</p>
                            <br />
                            <Input className='number' label={'Kuantitas Benih Baru'} type='number' name='kuantitasBenih' id='kuantitasBenih' 
                              placeholder='Kuantitas Benih Baru' required />
                          </>
                        } 
                        cancelBtn ={'BATAL'}
                        processBtn={'SIMPAN'}
                        typePrcsBtn={'SUBMIT'}
                      />}
                  </div>
                </div> 
              </div>
            </div>
        </div>
    </>
  )
}

export default Aset
import React, { useState } from 'react'
import './Transaksi.css'
import { FaSeedling } from 'react-icons/fa'
import Modal from '../../components/Modal'

function TransaksiKeluar() {
    const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
        <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>
                        <div className="title">Transaksi Keluar</div>
                        <div className="subtitle">Daftar transaksi yang Anda diterima</div>
                    </div>
                </div>
                <div className="content">
                    <select name="status" id="status" >
                        <option value="">Semua Status</option>
                        <option value="">Terkonfirmasi</option>
                        <option value="">Tertunda</option>
                        <option value="">Tolak</option>
                    </select>
                    <div className="card__wrapper">
                        <div className="card" onClick={() => {setModalOpen(true)}}>
                            <div className="card__header">
                                <div className="card__icon">
                                    <FaSeedling className='card__logo' />
                                </div>
                                <div className='card-name-and-status'>
                                    <b>Nama Benih</b>
                                    <p className="status">Tertunda</p>
                                </div>
                            </div>
                            <div className="card__body">
                                <div className="quantity-value">
                                    <div className="quantity">
                                        <span>Penerima</span>
                                        <p>Pak Penangkar</p>
                                    </div>
                                    <div className="value">
                                        <span>Harga per Kg</span>
                                        <p>Rp1.000</p>
                                    </div>
                                </div>
                                <div className="desc" hidden>
                                    <span>Ket : </span>
                                    <p>sss</p>
                                </div>
                            </div>
                        </div>
                        {modalOpen && 
                            <Modal setOpenModal={setModalOpen} 
                                modalTitle={'Nama Benih'}  
                                modalBody={
                                    <>
                                        AAA
                                    </>
                                } 
                                cancelBtn ={'TUTUP'}
                                hidden={true}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TransaksiKeluar
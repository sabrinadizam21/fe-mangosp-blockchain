import React from 'react'
import './Transaksi.css'
import { FaSeedling } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function TransaksiKeluar() {
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
                        <div className="card" >
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
                                        <span>Pengirim</span>
                                        <p>Pak Penangkar</p>
                                    </div>
                                    <div className="quantity">
                                        <span>Kuantitas</span>
                                        <p>100Kg</p>
                                    </div>
                                    <div className="value">
                                        <span>Harga per Kg</span>
                                        <p>Rp1.000</p>
                                    </div>
                                </div>
                                <div className="detail-btn">
                                    <Link to='/detail-transaksi'>Lihat Detail</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TransaksiKeluar
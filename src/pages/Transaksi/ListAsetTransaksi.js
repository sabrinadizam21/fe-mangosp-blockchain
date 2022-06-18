import React from 'react'
import { FaSeedling } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Transaksi.css'

function ListAsetTransaksi() {
  return (
    <>
        <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>
                    <div className="title">Buat Transaksi</div>
                    <div className="subtitle">Pilih aset yang ingin dijual</div>
                    </div>
                </div>
                <div className="content">
                    <div className="content-wrapper-card">
                        <Link to='/transaksi/buat' style={{textDecoration: 'none', color: '#1A1305'}}>
                            <div className="card">
                                <div className="card__header">
                                    <div className="card__icon">
                                        <FaSeedling className='card__logo' />
                                    </div>
                                    <div className='card-name-and-status'>
                                        <b>Nama Benih</b>
                                        <p className="status">120 Kg</p>
                                    </div>
                                </div>
                                <div className="card__body">
                                    <div className="quantity-value">
                                        <div className="quantity">
                                            <span>umur Benih</span>
                                            <p>10 hari</p>
                                        </div>
                                        <div className="quantity">
                                            <span>Umur Panen</span>
                                            <p>20 hari</p>
                                        </div>
                                        <div className="value">
                                            <span>Harga per Kg</span>
                                            <p>Rp1.000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/transaksi/buat' style={{textDecoration: 'none', color: '#1A1305'}}>
                            <div className="card" >
                                <div className="card__header">
                                    <div className="card__icon">
                                        <FaSeedling className='card__logo' />
                                    </div>
                                    <div className='card-name-and-status'>
                                        <b>Nama Benih</b>
                                        <p className="status">120 Kg</p>
                                    </div>
                                </div>
                                <div className="card__body">
                                    <div className="quantity-value">
                                        <div className="quantity">
                                            <span>umur Benih</span>
                                            <p>10 hari</p>
                                        </div>
                                        <div className="quantity">
                                            <span>Umur Panen</span>
                                            <p>20 hari</p>
                                        </div>
                                        <div className="value">
                                            <span>Harga per Kg</span>
                                            <p>Rp1.000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListAsetTransaksi
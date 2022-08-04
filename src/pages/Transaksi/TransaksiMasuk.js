import React, { useContext, useEffect } from 'react'
import './Transaksi.css'
import { FaSeedling } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AsetContext } from '../../context/AsetContext'
import Cookies from 'js-cookie'

function TransaksiMasuk() {
    const { aset, numberFormat, formatDate, sortData, showData, selectedValue, setSelectedValue, setGetId,
        setQty, setCurrentIndex, elementPos, statusTrx } = useContext(AsetContext)
    const role = Cookies.get('role')
    
    const handleFilterInput = (event) => {
        let value = event.target.value
        setSelectedValue(value)
    }

    const handleClick = (id) => {
        const index = elementPos(id)
        setCurrentIndex(index)
    }

    return (
    <>
        <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>    
                        <div className="title">Transaksi Masuk</div>
                        <div className="subtitle">Daftar transaksi yang Anda diterima</div>
                    </div>
                </div>
                <div className="content">
                    <select name="status" id="status"  onChange={handleFilterInput} value={selectedValue} >
                        <option value="ALL">Semua Status</option>
                        <option value="SUCCESS">Terima</option>
                        <option value="PENDING">Tertunda</option>
                        <option value="FAILED">Tolak</option>
                    </select>
                    {showData(aset, 'in').length === 0 ? <p>Tidak ada transaksi masuk</p> : (<>
                    <div className="card__wrapper">
                        {showData(sortData(aset), 'in').map((data, index) => {
                            return(
                                <div className="card" key={index}>
                                    <div className="card__header">
                                        <div className="card__icon">
                                            <FaSeedling className='card__logo' />
                                        </div>
                                        <div style={{width : '100%'}}>
                                        <div className='card-name-and-status'>
                                            <b>{data.varietasBenih}</b>
                                            {statusTrx(data.isConfirmed, data.isRejected)}
                                        </div>
                                        <p style={{marginLeft: '15px'}} className="card__timestamp">{formatDate(data.tanggalTransaksi)}</p>
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="quantity-value">
                                            <div className="quantity">
                                                <span>Pengirim</span>
                                                <p>{data.namaPengirim}</p>
                                            </div>
                                            {role == 1 || role == 2 ? 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.kuantitasBenihKg)} Kg</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga(/Kg)</span>
                                                    <p>Rp{numberFormat(data.hargaBenihPerKg)}</p>
                                                </div>
                                            </> : role == 3 || role == 4 ? 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.kuantitasManggaKg)} Kg</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga(/Kg)</span>
                                                    <p>Rp{numberFormat(data.hargaManggaPerKg)}</p>
                                                </div>
                                            </> : <p></p>
                                            }
                                        </div>
                                        <div className="detail-btn">
                                            { data.isConfirmed === false && data.isRejected === false ? 
                                                <Link to={`/detail-transaksi/${data.id}`} onClick={() => handleClick(data.id)}>Konfirmasi</Link>
                                            :
                                                <Link to={`/detail-transaksi/${data.id}`}>Lihat Detail</Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    </>)}
                </div>
            </div>
        </div>
    </>
  )
}

export default TransaksiMasuk
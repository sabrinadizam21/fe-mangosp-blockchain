import React, { useContext } from 'react'
import './Transaksi.css'
import { FaSeedling } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AsetContext } from '../../context/AsetContext'
import Cookies from 'js-cookie'

function TransaksiKeluar() {
  const { aset, numberFormat, formatDate, sortData, showData, selectedValue, setSelectedValue, statusTrx } = useContext(AsetContext)
  
  const handleFilterInput = (event) => {
    let value = event.target.value
    setSelectedValue(value)
  }
  return (
    <>
        <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>
                        <h2 className="title">Transaksi Keluar</h2>
                        <div className="subtitle">Daftar transaksi yang Anda lakukan</div>
                    </div>
                </div>
                <div className="content">
                    <select name="status" id="status" onChange={handleFilterInput} value={selectedValue}>
                        <option value="ALL">Semua Status</option>
                        <option value="SUCCESS">Terima</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Tolak</option>
                    </select>
                    {showData(aset, 'out').length === 0 ? <p>Tidak ada transaki keluar</p> : (<>
                    <div className="card__wrapper">
                        {showData(sortData(aset), 'out').map((data, index) => {                          
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
                                                <span>Penerima</span>
                                                <p>{data.namaPenerima}</p>
                                            </div>
                                            {Cookies.get('role') == 1 || Cookies.get('role') == 2 ? 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.kuantitasBenihKg)} Kg</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga(/Kg)</span>
                                                    <p>Rp{numberFormat(data.hargaBenihPerKg)}</p>
                                                </div>
                                            </> : 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.kuantitasManggaKg)} Kg</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga(/Kg)</span>
                                                    <p>Rp{numberFormat(data.hargaManggaPerKg)}</p>
                                                </div>
                                            </>
                                        }
                                        </div>
                                        {data.isRejected === true &&
                                        <div>
                                            <span>Alasan tolak : </span>
                                            <p>{data.rejectReason}</p>
                                        </div>
                                        }
                                        <div className="detail-btn">
                                            <Link to={`/detail-transaksi/${data.id}`}>Lihat Detail</Link>
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

export default TransaksiKeluar
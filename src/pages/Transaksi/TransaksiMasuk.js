import React, { useContext, useEffect } from 'react'
import './Transaksi.css'
import { FaSeedling } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AsetContext } from '../../context/AsetContext'
import Cookies from 'js-cookie'

function TransaksiMasuk() {
    const { numberFormat, formatDate, sortData, showDataFiltered, selectedValue, setSelectedValue, 
        setCurrentIndex, elementPos, statusTrx, functionGet, dataTrxMasukPending, dataTrxMasukFailed, dataTrxMasukSuccess } = useContext(AsetContext)
    const { trxMasukPending, trxMasukFailed, trxMasukSuccess } = functionGet
    const role = Cookies.get('role')

    useEffect(()=>{
        trxMasukPending()
        trxMasukFailed()
        trxMasukSuccess()
    },[])
    
    const handleFilterInput = (event) => {
        let value = event.target.value
        setSelectedValue(value)
    }

    const handleClick = (id) => {
        const index = elementPos(id)
        setCurrentIndex(index)
    }

    const data = [...dataTrxMasukPending, ...dataTrxMasukFailed, ...dataTrxMasukSuccess]
    
    return (
    <>
        <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>    
                        <h2 className="title">Transaksi Masuk</h2>
                        <div className="subtitle">Daftar transaksi yang Anda diterima</div>
                    </div>
                </div>
                <div className="content">
                    <select name="status" id="status"  onChange={handleFilterInput} value={selectedValue} >
                        <option value="ALL">Semua Status</option>
                        <option value="SUCCESS">Terima</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Tolak</option>
                    </select>
                    {showDataFiltered(data).length === 0 ? <p>Tidak ada transaksi masuk</p> : (<>
                    <div className="card__wrapper">
                        {showDataFiltered(sortData(data)).map((data, index) => {
                            return(
                                <div className="card" key={index}>
                                    <div className="card__header">
                                        <div className="card__icon">
                                            <FaSeedling className='card__logo' />
                                        </div>
                                        <div style={{width : '100%'}}>
                                        <div className='card-name-and-status'>
                                            <b>{data.Record.varietasBenih}</b>
                                            {statusTrx(data.Record.isConfirmed, data.Record.isRejected)}
                                        </div>
                                        <p style={{marginLeft: '15px'}} className="card__timestamp">{formatDate(data.Record.tanggalTransaksi)}</p>
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="quantity-value">
                                            <div className="quantity">
                                                <span>Pengirim</span>
                                                <p>{data.Record.namaPengirim}</p>
                                            </div>
                                            {role === 'Org1' || role === 'Org2' ? 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.Record.kuantitasBenih)}</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga</span>
                                                    <p>Rp{numberFormat(data.Record.hargaBenihPerBuah)}</p>
                                                </div>
                                            </> : role === 'Org3' || role === 'Org4' ? 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.Record.kuantitasManggaKg)} Kg</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga(/Kg)</span>
                                                    <p>Rp{numberFormat(data.Record.hargaManggaPerKg)}</p>
                                                </div>
                                            </> : <p></p>
                                            }
                                        </div>
                                        <div className="detail-btn">
                                            { data.Record.isConfirmed === false && data.Record.isRejected === false ? 
                                                <Link to={`/detail-transaksi/${data.Record.id}`} onClick={() => handleClick(data.Record.id)}>Konfirmasi</Link>
                                            :
                                                <Link to={`/detail-transaksi/${data.Record.id}`}>Lihat Detail</Link>
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
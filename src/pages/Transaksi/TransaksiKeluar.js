import React, { useContext, useEffect } from 'react'
import './Transaksi.css'
import { FaSeedling } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AsetContext } from '../../context/AsetContext'
import Cookies from 'js-cookie'

function TransaksiKeluar() {
  const { numberFormat, formatDate, sortData, showDataFiltered, selectedValue, setSelectedValue, statusTrx, functionGet, 
    dataTrxKeluarPending, dataTrxKeluarFailed, dataTrxKeluarSuccess } = useContext(AsetContext)
  const { trxKeluarPending, trxKeluarFailed, trxKeluarSuccess, trxKeluarCh2, dataTrxKeluarCh2, dataTrxKeluarCh1 } = functionGet
  
  useEffect(()=>{
    trxKeluarPending()
    trxKeluarFailed()
    trxKeluarSuccess()
    if(Cookies.get('role') === 'Org1') trxKeluarCh2()
  },[])

  const handleFilterInput = (event) => {
    let value = event.target.value
    setSelectedValue(value)
  }

  const data = [...dataTrxKeluarPending, ...dataTrxKeluarFailed, ...dataTrxKeluarSuccess, ...dataTrxKeluarCh2, ...dataTrxKeluarCh1]
  
  return (
    <>
        <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>
                        <h2 className="title">Transaksi Keluar</h2>
                        <div className="subtitle">Daftar transaksi yang Anda diterima</div>
                    </div>
                </div>
                <div className="content">
                    <select name="status" id="status" onChange={handleFilterInput} value={selectedValue}>
                        <option value="ALL">Semua Status</option>
                        <option value="SUCCESS">Terima</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Tolak</option>
                    </select>
                    {showDataFiltered(data).length === 0 ? <p>Tidak ada transaki keluar</p> : (<>
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
                                                <span>Penerima</span>
                                                {Cookies.get('role') === 'Org4' ? <p>-</p> : 
                                                    <p>{data.Record.namaPenerima}</p>
                                                }
                                            </div>
                                            {Cookies.get('role') === 'Org1' ? 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.Record.kuantitasBenih)} Kg</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga(/Kg)</span>
                                                    <p>Rp{numberFormat(data.Record.hargaBenihPerBuah)}</p>
                                                </div>
                                            </> : 
                                            <>
                                                <div className="quantity">
                                                    <span>Kuantitas</span>
                                                    <p>{numberFormat(data.Record.kuantitasManggaKg)} Kg</p>
                                                </div>
                                                <div className="value">
                                                    <span>Harga(/Kg)</span>
                                                    <p>Rp{numberFormat(data.Record.hargaManggaPerKg)}</p>
                                                </div>
                                            </>
                                        }
                                        </div>
                                        {data.Record.rejectReason !== '' &&
                                        <div>
                                            <span>Alasan tolak : </span>
                                            <p>{data.Record.rejectReason}</p>
                                        </div>
                                        }
                                        <div className="detail-btn">
                                            <Link to={`/detail-transaksi/${data.Record.id}`}>Lihat Detail</Link>
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
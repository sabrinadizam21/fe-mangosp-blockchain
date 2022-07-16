import React, { useContext } from 'react'
import './Transaksi.css'
import { FaSeedling } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AsetContext } from '../../context/AsetContext'

function TransaksiMasuk() {
    const { aset, numberFormat, formatDate, sortData, showData, selectedValue, setSelectedValue } = useContext(AsetContext)
  
    const statusTrx = (confirm, reject) => {
        if(confirm === false && reject === false) {
            return (
                <p className="label-status color-pending">PENDING</p>
            )
        }
        else if (confirm === true){
            return (
                <p className="label-status color-success">TERIMA</p>
            )
        }
        else if (reject === true){
            return (
                <p className="label-status color-failed">TOLAK</p>
            )
        }
    }

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
                        <div className="title">Transaksi Masuk</div>
                        <div className="subtitle">Daftar transaksi yang Anda diterima</div>
                    </div>
                </div>
                <div className="content">
                    {showData(aset, 'in').length === 0 ? <p>Tidak ada transaksi masuk</p> : (<>
                    <select name="status" id="status"  onChange={handleFilterInput} value={selectedValue} >
                        <option value="ALL">Semua Status</option>
                        <option value="SUCCESS">Terima</option>
                        <option value="PENDING">Tertunda</option>
                        <option value="FAILED">Tolak</option>
                    </select>
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
                                            <b>{data.VarietasBenih}</b>
                                            {statusTrx(data.IsConfirmed, data.IsRejected)}
                                        </div>
                                        <p style={{marginLeft: '15px'}} className="card__timestamp">{formatDate(data.TanggalTransaksi)}</p>
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="quantity-value">
                                            <div className="quantity">
                                                <span>Pengirim</span>
                                                <p>{data.NamaPengirim}</p>
                                            </div>
                                            <div className="quantity">
                                                <span>Kuantitas</span>
                                                <p>{numberFormat(data.KuantitasBenihKg)}Kg</p>
                                            </div>
                                            <div className="value">
                                                <span>Harga per Kg</span>
                                                <p>Rp{numberFormat(data.HargaBenihKg)}</p>
                                            </div>
                                        </div>
                                        <div className="detail-btn">
                                            <Link to='/detail-transaksi'>Lihat Detail</Link>
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
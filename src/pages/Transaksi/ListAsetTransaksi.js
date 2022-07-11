import React, { useContext } from 'react'
import { FaSeedling } from 'react-icons/fa'
//import { Link } from 'react-router-dom'
import { AsetContext } from '../../context/AsetContext'
import './Transaksi.css'
import { useHistory } from 'react-router'

function ListAsetTransaksi() {
  const { aset, numberFormat, formatDate, sortData, setCurrentIndex } = useContext(AsetContext)
  let history = useHistory()
  const handleClick = (e, data, index) => {
    console.log(data)
    setCurrentIndex(index)
    history.push('/transaksi/buat')
  }
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
                        { sortData(aset).map((data, index)=>{
                            if(data.IsAsset === true) { 
                                return (
                                    // <Link to='/transaksi/buat' style={{textDecoration: 'none', color: '#1A1305'}}>
                                    <div className='listAset' value={index} onClick={((e) => handleClick(e, data, index))} key={index}>    
                                        <div className="card">
                                            <div className="card__header">
                                                <div className="card__icon">
                                                    <FaSeedling className='card__logo' />
                                                </div>
                                                <div className='card-name-and-status'>
                                                    <b>{data.VarietasBenih}</b>
                                                    <p className="status">{numberFormat(data.KuantitasBenihKg)} Kg</p>
                                                </div>
                                            </div>
                                            <div className="card__body">
                                                <div className="quantity-value">
                                                    <div className="quantity">
                                                        <span>Umur Benih</span>
                                                        <p>{numberFormat(data.UmurBenih)} hari</p>
                                                    </div>
                                                    <div className="value">
                                                        <span>Tanggal Daftar Aset</span>
                                                        <p>{formatDate(data.TanggalTransaksi)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // </Link>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListAsetTransaksi
import React, { useContext, useEffect } from 'react'
import { FaSeedling } from 'react-icons/fa'
import { AsetContext } from '../../context/AsetContext'
import './Transaksi.css'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import { UserContext } from '../../context/UserContext'

function ListAsetTransaksi() {
  const { numberFormat, formatDate, sortData, setCurrentIndex, elementPos, dataByRole, dataAset, functionGet, dataTrxMasukSuccess } = useContext(AsetContext)
  const { getAset, trxMasukSuccess } = functionGet
  const {functionUser} = useContext(UserContext)
  const {getUserLogin} = functionUser
  const username = Cookies.get('username')
  const role = Cookies.get('role')
  
  let history = useHistory()
  
  const handleClick = (e, id, manggaID, txID2, txID3) => {
    if(role === 'Org1') Cookies.set("idTrx", id)
    else if(role === 'Org2') Cookies.set("idTrx", manggaID)
    else if(role === 'Org3') Cookies.set("idTrx", txID2)
    else if(role === 'Org4') Cookies.set("idTrx", txID3)
    const index = elementPos(id)
    setCurrentIndex(index)
    history.push('/transaksi/buat')
  }
  
  useEffect(()=>{
    getUserLogin(username)
    getAset()
    trxMasukSuccess()
  },[username])
  
  var dataAsetPetani = dataByRole(dataAset).filter(data => data.Record.isPanen === true)
  var data = (role === 'Org2' ? dataAsetPetani : dataByRole(dataTrxMasukSuccess))

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
                    {data.length === 0 ? <p>Aset kosong</p> : 
                        <div className="content-wrapper-card">
                            {sortData(data).map((data, index)=>{
                                return (
                                    <div className='listAset' onClick={((e) => handleClick(e, data.Record.id, data.Record.manggaID, data.Record.txID2, data.Record.txID3))} key={index}>    
                                        <div className="card">
                                            <div className="card__header">
                                                <div className="card__icon">
                                                    <FaSeedling className='card__logo' />
                                                </div>
                                                <div className='card-name-and-status' style={{width : '100%'}}>
                                                    <b>{data.Record.varietasBenih}</b>
                                                    {Cookies.get('role') === 'Org1' ? 
                                                    <p className="status">{numberFormat(data.Record.kuantitasBenih)}</p>
                                                    :
                                                    <p className="status">{numberFormat(data.Record.kuantitasManggaKg)} Kg</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="card__body">
                                                <div className="quantity-value">
                                                    <div className="quantity">
                                                        <span>Umur Benih</span>
                                                        <p>{numberFormat(data.Record.umurBenih)}</p>
                                                    </div>
                                                    <div className="value">
                                                        <span>Tanggal Panen</span>
                                                        <p>{formatDate(data.Record.tanggalPanen)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default ListAsetTransaksi
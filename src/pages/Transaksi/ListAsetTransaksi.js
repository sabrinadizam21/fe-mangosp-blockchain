import React, { useContext, useEffect } from 'react'
import { FaSeedling } from 'react-icons/fa'
import { AsetContext } from '../../context/AsetContext'
import './Transaksi.css'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import { UserContext } from '../../context/UserContext'

function ListAsetTransaksi() {
  const { numberFormat, formatDate, sortData, setCurrentIndex, elementPos, dataByRole, dataAsetPenangkar } = useContext(AsetContext)
  const {functionUser} = useContext(UserContext)
  const {getUserLogin} = functionUser
  const username = Cookies.get('username')
  const role = Cookies.get('role')
  
  let history = useHistory()
  
  const handleClick = (e, id, manggaID, txID2, txID3) => {
    if(role == 1) Cookies.set("idTrx", id)
    else if(role == 2) Cookies.set("idTrx", manggaID)
    else if(role == 3) Cookies.set("idTrx", txID2)
    else if(role == 4) Cookies.set("idTrx", txID3)
    const index = elementPos(id)
    setCurrentIndex(index)
    history.push('/transaksi/buat')
  }
  
  useEffect(()=>{
    getUserLogin(username)
  },[username])
  var dataAsetPetani = dataByRole(dataAsetPenangkar).filter(data => data.Record.isPanen === true)
  var data = (role === 'Org1' ? dataByRole(dataAsetPenangkar) : role === 'Org2' ? dataAsetPetani : 0)
  console.log(data)

  //const data = dataByRole()
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
                                    <div className='listAset' onClick={((e) => handleClick(e, data.id, data.manggaID, data.txID2, data.txID3))} key={index}>    
                                        <div className="card">
                                            <div className="card__header">
                                                <div className="card__icon">
                                                    <FaSeedling className='card__logo' />
                                                </div>
                                                <div className='card-name-and-status' style={{width : '100%'}}>
                                                    <b>{data.Record.varietasBenih}</b>
                                                    {Cookies.get('role') === 'Org1' || Cookies.get('role') === 'Org2' ? 
                                                    <p className="status">{numberFormat(data.Record.kuantitasBenih)} Kg</p>
                                                    :
                                                    <p className="status">{numberFormat(data.kuantitasManggaKg)} Kg</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="card__body">
                                                <div className="quantity-value">
                                                    <div className="quantity">
                                                        <span>Umur Benih</span>
                                                        <p>{numberFormat(data.umurBenih)} hari</p>
                                                    </div>
                                                    <div className="value">
                                                        <span>Tanggal Daftar Aset</span>
                                                        <p>{formatDate(data.tanggalTransaksi)}</p>
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
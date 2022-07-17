import React, { useContext, useEffect } from 'react'
import { FaSeedling } from 'react-icons/fa'
import { AsetContext } from '../../context/AsetContext'
import './Transaksi.css'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import { UserContext } from '../../context/UserContext'

function ListAsetTransaksi() {
  const { numberFormat, formatDate, sortData, setCurrentIndex, elementPos, dataByRole, setGetId } = useContext(AsetContext)
  const {functionUser} = useContext(UserContext)
  const {getUserLogin} = functionUser
  const username = Cookies.get('username')
  
  let history = useHistory()
  
  const handleClick = (e, id) => {
    setGetId(id)
    const index = elementPos(id)
    setCurrentIndex(index)
    history.push('/transaksi/buat')
  }
  
  useEffect(()=>{
    getUserLogin(username)
  },[username])

  const data = dataByRole()
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
                                    <div className='listAset' onClick={((e) => handleClick(e, data.id))} key={index}>    
                                        <div className="card">
                                            <div className="card__header">
                                                <div className="card__icon">
                                                    <FaSeedling className='card__logo' />
                                                </div>
                                                <div className='card-name-and-status' style={{width : '100%'}}>
                                                    <b>{data.VarietasBenih}</b>
                                                    {Cookies.get('role') === 1 || Cookies.get('role') === 1 ? 
                                                    <p className="status">{numberFormat(data.KuantitasBenihKg)} Kg</p>
                                                    :
                                                    <p className="status">{numberFormat(data.KuantitasManggaKg)} Kg</p>
                                                    }
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
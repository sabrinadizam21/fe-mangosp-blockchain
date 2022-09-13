import React , { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../../components/Button'
import { FaSeedling } from 'react-icons/fa'
import './Aset.css'
import Modal from '../../components/Modal'
import { Input } from '../../components/Input'
import { UserContext } from '../../context/UserContext'
import UnlockAccess from '../../components/UnlockAccess'
import { AsetContext } from '../../context/AsetContext'
import Cookies from 'js-cookie'

function Aset() {
  const [modalOpen, setModalOpen] = useState(false)
  const [ confirmed, setConfirmed ] = useState(true)
  const { aset, numberFormat, formatDate, sortData, addQtyBenih, errorKuantitas, dataByRole,
    setCurrentIndex, getId, setGetId, dataAset, elementPos,
    functionGet, dataTrxMasukSuccess, inputTrx, setInputTrx
  } = useContext(AsetContext)
  const { getAset, trxMasukSuccess } = functionGet
  const {functionUser, error} = useContext(UserContext)
  const {getUserLogin, validateInput} = functionUser
  let history = useHistory()  
  const username = Cookies.get('username')

  useEffect(()=>{
    getUserLogin(username)
    getAset()
    trxMasukSuccess()
  },[username])

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputTrx({...inputTrx, [name]:value})
    validateInput(event)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // addQtyBenih(getId)
    setModalOpen(false)
    setConfirmed(true)
    validateInput(e)
  }

  const handleEdit = (event, id) => {
    setGetId(id)
    var index = parseInt(event.target.value)
    setInputTrx({
      kuantitasBenihKg : aset[index].kuantitasBenihKg
    })
    setCurrentIndex(index)
  }

  const handleClick = (e, id, activity) => {
    setGetId(id)
    const index = elementPos(id)
    setCurrentIndex(index)
    if (activity === 'plant') history.push(`/tanam-benih/${id}`) 
    else if (activity === 'harvest') history.push(`/panen/${id}`)
  }

  const handleCheck = () => {
    setConfirmed(!confirmed)
  }
  var dataForTanamBenih = dataByRole(dataTrxMasukSuccess)
  var dataForPanen = dataByRole(dataAset).filter(data => data.Record.isPanen === false)
  var dataForTrx = dataByRole(dataAset).filter(data => data.Record.isPanen === true)
  var dataAsetPetani = [...dataForTanamBenih, ...dataForPanen, ...dataForTrx]

  return (
    <>
        <div className="wrapper">
            <div className="section">
              <div className="header">
                {/* Header */}
                <div>
                  <div className="title">Aset</div>
                  <div className="subtitle">Aset yang Anda miliki</div>
                </div>
              </div>
              <div className="content">
                <div className="card__wrapper">
                  {/* START ASET PENANGKAR */}
                  <UnlockAccess request={'Org1'}>
                    <p>Tidak ada aset</p>
                  </UnlockAccess>
                  {/* END ASET PENANGKAR */}                  

                  {/* START ASET PETANI */}
                  <UnlockAccess request={'Org2'}>
                  {dataAsetPetani.length === 0 ? <p>Tidak ada aset</p> : (<>
                    { sortData(dataAsetPetani).map((data, index)=>{
                      return (
                        <div className="card" key={index}>
                          <div className="card__header">
                            <div className="card__icon">
                              <FaSeedling className='card__logo' />
                            </div>
                            <div style={{marginLeft: '15px'}}>
                              <b>{data.Record.varietasBenih}</b>
                              <p className="card__timestamp">
                                {data.Record.isAsset === false ? formatDate(data.Record.tanggalTransaksi) : 
                                data.Record.isPanen === false ? formatDate(data.Record.tanggalTanam) : 
                                formatDate(data.Record.tanggalPanen)}
                              </p>
                            </div>                
                          </div>
                          <div className="card__body">
                            <div className="quantity-value">
                              <div className="quantity">
                                {data.Record.isPanen === true ? 
                                <>
                                  <span>Kuantitas Mangga</span>
                                  <p>{numberFormat(data.Record.kuantitasManggaKg)}</p>
                                </> : <>
                                  <span>Kuantitas Benih</span>
                                  <p> {numberFormat(data.Record.kuantitasBenih)}</p>
                                </>
                                }
                              </div>
                              <div className="value">
                                <span>Harga per Kg</span>
                                <p>Rp{numberFormat(data.Record.hargaBenihPerBuah)}</p>
                              </div>
                            </div>
                            <div className="seed-age">
                              <span>Pengirim</span> 
                              <p>{data.Record.namaPengirim}</p>
                            </div>
                            <div className="seed-age">
                              <span>Umur Benih</span> 
                              <p>{data.Record.umurBenih}</p>
                            </div>
                            {/* <div className="harvest-age">
                              <span>Umur Panen</span>
                              <p>{data.UmurPanen} hari</p>
                            </div> */}
                          </div>
                          <div className="card__bottom">
                            {data.Record.isPanen === false ? 
                              data.Record.pupuk === '' ?
                                <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                  buttonStyle={'btn--outline'} onClick={((e) => {handleClick(e, data.Record.txID1, 'plant')})}> TANAM BENIH
                                </Button> :
                                <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                buttonStyle={'btn--outline'} onClick={((e) => handleClick(e, data.Record.manggaID, 'harvest'))}> PANEN
                                </Button>
                              : 
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonStyle={'btn--outline'} 
                              disabled > Siap Transaksi
                              </Button>
                            }
                          </div>
                        </div>
                      )
                    })}
                  </>)}
                   </UnlockAccess>
                  {/* END ASET PETANI */}

                  {/* START ASET PENGUMPUL */}
                  <UnlockAccess request={'Org3'}>
                  {dataForTanamBenih.length === 0 ? <p>Tidak ada aset</p> : (<>
                    { sortData(dataForTanamBenih).map((data, index)=>{
                      return ( 
                        <div className="card" key={index}>
                          <div className="card__header">
                            <div className="card__icon">
                              <FaSeedling className='card__logo' />
                            </div>
                            <div style={{marginLeft: '15px'}}>
                              <b>{data.Record.varietasBenih}</b>
                              <p className="card__timestamp">{formatDate(data.Record.tanggalTransaksi)}</p>
                            </div>                
                          </div>
                          <div className="card__body">
                            <div className="quantity-value">
                              <div className="quantity">
                                <span>Kuantitas</span>
                                <p>{numberFormat(data.Record.kuantitasManggaKg)} Kg</p>
                              </div>
                              <div className="value">
                                <span>Harga per Kg</span>
                                <p>Rp{numberFormat(data.Record.hargaManggaPerKg)}</p>
                              </div>
                            </div>
                            <div className="seed-age">
                              <span>Pengirim</span> 
                              <p>{data.Record.namaPengirim}</p>
                            </div>
                            <div className="seed-age">
                              <span>Umur Benih</span> 
                              <p>{data.Record.umurBenih}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </>)}
                  </UnlockAccess>
                  {/* END ASET PENGUMPUL */}

                  {/* START ASET PEDAGANG */}
                  <UnlockAccess request={'Org4'}>
                  {dataForTanamBenih.length === 0 ? <p>Tidak ada aset</p> : (<>
                    { sortData(dataForTanamBenih).map((data, index)=>{
                      return ( 
                        <div className="card" key={index}>
                          <div className="card__header">
                            <div className="card__icon">
                              <FaSeedling className='card__logo' />
                            </div>
                            <div style={{marginLeft: '15px'}}>
                              <b>{data.Record.varietasBenih}</b>
                              <p className="card__timestamp">{formatDate(data.Record.tanggalTransaksi)}</p>
                            </div>                
                          </div>
                          <div className="card__body">
                            <div className="quantity-value">
                              <div className="quantity">
                                <span>Kuantitas</span>
                                <p>{numberFormat(data.Record.kuantitasManggaKg)} Kg </p>
                              </div>
                              <div className="value">
                                <span>Harga per Kg</span>
                                <p>Rp{numberFormat(data.Record.hargaManggaPerKg)}</p>
                              </div>
                            </div>
                            <div className="seed-age">
                              <span>Pengirim</span> 
                              <p>{data.Record.namaPengirim}</p>
                            </div>
                            <div className="seed-age">
                              <span>Umur Benih</span> 
                              <p>{data.Record.umurBenih}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })} 
                  </>)}
                  </UnlockAccess>
                  {/* END ASET PEDAGANG */}
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Aset
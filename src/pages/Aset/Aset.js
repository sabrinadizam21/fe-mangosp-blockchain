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
  const { aset, numberFormat, formatDate, sortData, inputTrx, setInputTrx, addQtyBenih, errorKuantitas,
    setCurrentIndex, getId, setGetId, dataAsetPenangkar, dataAsetPetani, elementPos, dataAsetPengumpulPedagang,
  } = useContext(AsetContext)
  const {functionUser, error} = useContext(UserContext)
  const {getUserLogin, validateInput} = functionUser
  let history = useHistory()  
  const username = Cookies.get('username')
  const [ confirmed, setConfirmed ] = useState(true)

  useEffect(()=>{
    getUserLogin(username)
  },[username])

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputTrx({...inputTrx, [name]:value})
    validateInput(event)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addQtyBenih(getId)
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
    if (activity === 'plant') history.push('/tanam-benih') 
    else if (activity === 'harvest') history.push('/panen')
  }

  const handleCheck = () => {
    setConfirmed(!confirmed)
  }

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
                <UnlockAccess request={1}>
                  <div className="btn-header">
                    <Link to='/aset/daftaraset'>
                      <Button buttonColor='primary'>DAFTAR ASET</Button>
                    </Link>
                  </div>
                </UnlockAccess>
              </div>
              <div className="content">
                <div className="card__wrapper">
                  {/* START ASET PENANGKAR */}
                  <UnlockAccess request={1}>
                    {dataAsetPenangkar.length === 0 ? <p>Tidak ada aset</p> : (<>
                    { sortData(dataAsetPenangkar).map((data, index)=>{
                      return (
                        <div className="card" key={index}>
                          <div className="card__header">
                            <div className="card__icon">
                              <FaSeedling className='card__logo' />
                            </div>
                            <div style={{marginLeft: '15px'}}>
                              <b>{data.varietasBenih}</b>
                              <p className="card__timestamp">{formatDate(data.tanggalTanam)}</p>
                            </div>                
                          </div>
                          <div className="card__body">
                            <div className="quantity-value">
                              <div className="quantity">
                                <span>Kuantitas</span>
                                <p>{numberFormat(data.kuantitasBenihKg)} Kg </p>
                              </div>
                              <div className="value">
                                <span>Umur Benih</span>
                                <p>{numberFormat(data.umurBenih)} hari</p>
                              </div>
                            </div>
                          </div>
                          <div className="card__bottom">
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                onClick={(e) => {
                                  setModalOpen(true)
                                  handleEdit(e, data.id)
                                }}
                                value={index}
                              > 
                              TAMBAH KUANTITAS
                              </Button>
                            {modalOpen && 
                              <Modal setOpenModal={setModalOpen} 
                                modalTitle={'Tambah Kuantitas'}  
                                modalBody={
                                  <>
                                    <form id='editKuantitas' onSubmit={handleSubmit}>
                                      {errorKuantitas && <span className='err'>{errorKuantitas}</span>}
                                      <Input className='number' label={'Tambah Kuantitas Benih'} type='number' name='kuantitasBenihKg' id='kuantitasBenihKg' 
                                      placeholder='Tambah Kuantitas Benih' value={inputTrx.kuantitasBenihKg} onChange={handleChange} onBlur={validateInput} 
                                      errorMsg={error.kuantitasBenihKg} required />
                                      <p>Data tidak bisa diubah menjadi lebih kecil dari saat ini</p>
                                      <div style={{marginTop : '10px'}}>
                                        <label>
                                          <input type="checkbox" defaultChecked={false} onChange={handleCheck} /> Saya yakin mengubah data
                                        </label>
                                      </div>
                                    </form>
                                  </>
                                } 
                                cancelBtn ={'BATAL'}
                                processBtn={'SIMPAN'}
                                form='editKuantitas'
                                setConfirmed={setConfirmed}
                                disabled={confirmed}
                              />
                              }
                          </div>
                        </div>
                      )
                    })}
                    </>)}
                  </UnlockAccess>
                  {/* END ASET PENANGKAR */}                  

                  {/* START ASET PETANI */}
                  <UnlockAccess request={2}>
                  {dataAsetPetani.length === 0 ? <p>Tidak ada aset</p> : (<>
                    { sortData(dataAsetPetani).map((data, index)=>{
                      return (
                        <div className="card" key={index}>
                          <div className="card__header">
                            <div className="card__icon">
                              <FaSeedling className='card__logo' />
                            </div>
                            <div style={{marginLeft: '15px'}}>
                              <b>{data.varietasBenih}</b>
                              <p className="card__timestamp">{formatDate(data.tanggalTransaksi)}</p>
                            </div>                
                          </div>
                          <div className="card__body">
                            <div className="quantity-value">
                              <div className="quantity">
                                <span>Kuantitas</span>
                                <p>{numberFormat(data.kuantitasBenihKg)} Kg </p>
                              </div>
                              <div className="value">
                                <span>Harga per Kg</span>
                                <p>Rp{numberFormat(data.hargaBenihPerKg)}</p>
                              </div>
                            </div>
                            <div className="seed-age">
                              <span>Pengirim</span> 
                              <p>{data.namaPengirim}</p>
                            </div>
                            <div className="seed-age">
                              <span>Umur Benih</span> 
                              <p>{data.umurBenih} hari</p>
                            </div>
                            {/* <div className="harvest-age">
                              <span>Umur Panen</span>
                              <p>{data.UmurPanen} hari</p>
                            </div> */}
                          </div>
                          <div className="card__bottom">
                            {data.pestisida === '' ? 
                            data.pupuk === '' ?
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                buttonStyle={'btn--outline'} onClick={((e) => {handleClick(e, data.txID1, 'plant')})}> TANAM BENIH
                              </Button> :
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                              buttonStyle={'btn--outline'} onClick={((e) => handleClick(e, data.manggaID, 'harvest'))}> PANEN
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
                  <UnlockAccess request={3}>
                  { sortData(dataAsetPengumpulPedagang).map((data, index)=>{
                    return ( 
                      <div className="card" key={index}>
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>{data.varietasBenih}</b>
                            <p className="card__timestamp">{formatDate(data.tanggalTransaksi)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>{numberFormat(data.kuantitasManggaKg)} Kg</p>
                            </div>
                            <div className="value">
                              <span>Harga per Kg</span>
                              <p>Rp{numberFormat(data.hargaManggaPerKg)}</p>
                            </div>
                          </div>
                          <div className="seed-age">
                            <span>Pengirim</span> 
                            <p>{data.namaPengirim}</p>
                          </div>
                          <div className="seed-age">
                            <span>Umur Benih</span> 
                            <p>{data.umurBenih} bulan</p>
                          </div>
                          {/* <div className="harvest-age">
                            <span>Umur Panen</span>
                            <p>6 hari</p>
                          </div> */}
                        </div>
                        {/* <div className="card__bottom">
                            <Link to='/tanam-benih'> 
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                buttonStyle={'btn--outline'}> TANAM BENIH
                              </Button>
                            </Link>
                        </div> */}
                      </div>
                    )
                  })}
                  </UnlockAccess>
                  {/* END ASET PENGUMPUL */}

                  {/* START ASET PEDAGANG */}
                  <UnlockAccess request={4}>
                  { sortData(dataAsetPengumpulPedagang).map((data, index)=>{
                    return ( 
                      <div className="card" key={index}>
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>{data.varietasBenih}</b>
                            <p className="card__timestamp">{formatDate(data.tanggalTransaksi)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>{numberFormat(data.kuantitasManggaKg)} Kg </p>
                            </div>
                            <div className="value">
                              <span>Harga per Kg</span>
                              <p>Rp{numberFormat(data.hargaManggaPerKg)}</p>
                            </div>
                          </div>
                          <div className="seed-age">
                            <span>Pengirim</span> 
                            <p>{data.namaPengirim}</p>
                          </div>
                          <div className="seed-age">
                            <span>Umur Benih</span> 
                            <p>{data.umurBenih} bulan</p>
                          </div>
                        </div>
                        {/* <div className="card__bottom">
                            <Link to='/tanam-benih'> 
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                buttonStyle={'btn--outline'}> TANAM BENIH
                              </Button>
                            </Link>
                        </div> */}
                      </div>
                     )
                  })} 
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
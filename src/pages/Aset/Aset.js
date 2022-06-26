import React , { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { FaSeedling } from 'react-icons/fa'
import './Aset.css'
import Modal from '../../components/Modal'
import { Input } from '../../components/Input'
import { AsetContext } from '../../context/AsetContext'
import UnlockAccess from '../../components/UnlockAccess'
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie'

function Aset() {
  const [modalOpen, setModalOpen] = useState(false)
  const { aset, numberFormat, formatDate, sortData, qtyBenih, setQtyBenih, addQtyBenih, setCurrentIndex } = useContext(AsetContext)
  const {functionUser, error} = useContext(UserContext)
  const {getUserLogin, validateInput} = functionUser

  const handleChange = (event) => {
    let input = event.target.value
    setQtyBenih(input)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addQtyBenih()
    setModalOpen(false)
    validateInput(e)
  }

  const handleEdit = (event) => {
    var index = parseInt(event.target.value)
    setQtyBenih(aset[index].KuantitasBenihKg)
    setCurrentIndex(index)
  }

  useEffect(()=>{
    getUserLogin(Cookies.get('username'))
  },[])

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
                  { sortData(aset).map((data, index)=>{
                    return (
                      <div className="card" key={index}>
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>{data.VarietasBenih}</b>
                            <p className="card__timestamp">{formatDate(data.createdDate)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>{numberFormat(data.KuantitasBenihKg)} Kg </p>
                            </div>
                            <div className="value">
                              <span>Umur Benih</span>
                              <p>{numberFormat(data.UmurBenih)} hari</p>
                            </div>
                          </div>
                        </div>
                        <div className="card__bottom">
                            <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                              onClick={(e) => {
                                setModalOpen(true);
                                handleEdit(e)
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
                                    <Input className='number' label={'Tambah Kuantitas Benih'} type='number' name='KuantitasBenihKg' id='KuantitasBenihKg' 
                                    placeholder='Tambah Kuantitas Benih' value={qtyBenih} onChange={handleChange} onBlur={validateInput} errorMsg={error.KuantitasBenihKg} required />
                                  </form>
                                </>
                              } 
                              cancelBtn ={'BATAL'}
                              processBtn={'SIMPAN'}
                              form='editKuantitas'
                            />
                            }
                        </div>
                      </div>
                    )
                  })}
                  </UnlockAccess>
                  {/* END ASET PENANGKAR */}

                  {/* START ASET PETANI */}
                  <UnlockAccess request={2}>
                  {/* { sortData(aset).map((data, index)=>{
                    return ( */}
                      <div className="card"> {/* key={index}> */}
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>Benih 1</b>
                            <p className="card__timestamp">{formatDate(1648054793)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>120 Kg </p>
                            </div>
                            <div className="value">
                              <span>Harga per Kg</span>
                              <p>Rp54.000</p>
                            </div>
                          </div>
                          <div className="seed-age">
                            <span>Pengirim</span> 
                            <p>Penangkar</p>
                          </div>
                          <div className="seed-age">
                            <span>Umur Benih</span> 
                            <p>12 hari</p>
                          </div>
                          <div className="harvest-age">
                            <span>Umur Panen</span>
                            <p>6 hari</p>
                          </div>
                        </div>
                        <div className="card__bottom">
                            <Link to='/tanam-benih'> 
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                buttonStyle={'btn--outline'}> TANAM BENIH
                              </Button>
                            </Link>
                        </div>
                      </div>
                      <div className="card"> {/* key={index}> */}
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>Benih 4</b>
                            <p className="card__timestamp">{formatDate(1648054793)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>45 Kg </p>
                            </div>
                            <div className="value">
                              <span>Harga per Kg</span>
                              <p>Rp104.000</p>
                            </div>
                          </div>
                          <div className="seed-age">
                            <span>Pengirim</span> 
                            <p>Penangkar Suga</p>
                          </div>
                          <div className="seed-age">
                            <span>Umur Benih</span> 
                            <p>17 hari</p>
                          </div>
                          <div className="harvest-age">
                            <span>Umur Panen</span>
                            <p>21 hari</p>
                          </div>
                        </div>
                        <div className="card__bottom">
                            <Link to='/panen'> 
                              <Button className="openModalBtn" buttonSize={'btn--small'} buttonColor={'primary'}
                                buttonStyle={'btn--outline'}> PANEN
                              </Button>
                            </Link>
                        </div>
                      </div>
                    {/* )
                  })} */}
                  </UnlockAccess>
                  {/* END ASET PETANI */}

                  {/* START ASET PENGUMPUL */}
                  <UnlockAccess request={3}>
                  {/* { sortData(aset).map((data, index)=>{
                    return ( */}
                      <div className="card"> {/* key={index}> */}
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>Benih 1</b>
                            <p className="card__timestamp">{formatDate(1648054793)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>120 Kg </p>
                            </div>
                            <div className="value">
                              <span>Harga per Kg</span>
                              <p>Rp54.000</p>
                            </div>
                          </div>
                          <div className="seed-age">
                            <span>Pengirim</span> 
                            <p>Ina Petani</p>
                          </div>
                          <div className="seed-age">
                            <span>Umur Benih</span> 
                            <p>12 hari</p>
                          </div>
                          <div className="harvest-age">
                            <span>Umur Panen</span>
                            <p>6 hari</p>
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
                    {/* )
                  })} */}
                  </UnlockAccess>
                  {/* END ASET PENGUMPUL */}

                  {/* START ASET PEDAGANG */}
                  <UnlockAccess request={4}>
                  {/* { sortData(aset).map((data, index)=>{
                    return ( */}
                      <div className="card"> {/* key={index}> */}
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>Benih 1</b>
                            <p className="card__timestamp">{formatDate(1648054793)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>120 Kg </p>
                            </div>
                            <div className="value">
                              <span>Harga per Kg</span>
                              <p>Rp54.000</p>
                            </div>
                          </div>
                          <div className="seed-age">
                            <span>Pengirim</span> 
                            <p>Ari Pengumpul</p>
                          </div>
                          <div className="seed-age">
                            <span>Umur Benih</span> 
                            <p>12 hari</p>
                          </div>
                          <div className="harvest-age">
                            <span>Umur Panen</span>
                            <p>6 hari</p>
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
                    {/* )
                  })} */}
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
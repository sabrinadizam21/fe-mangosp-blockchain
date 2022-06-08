import React , { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { FaSeedling } from 'react-icons/fa'
import './Aset.css'
import Modal from '../../components/Modal'
import { Input } from '../../components/Input'
import { AsetContext } from '../../context/AsetContext'
import UnlockAccess from '../../components/UnlockAccess';

function Aset() {
  const [modalOpen, setModalOpen] = useState(false)
  const { aset, numberFormat, formatDate, sortData } = useContext(AsetContext)
  const [inputData, setInputData] = useState("")
  const [currentIndex, setCurrentIndex] = useState(-1)

  const handleChange = (event) => {
    let input = event.target.value
    setInputData(input)
  }

  console.log(aset)

  const handleSubmit = (e) => {
    e.preventDefault()
    let newData = aset
      if(currentIndex === -1){
        newData = [...aset, {
          kuantitasBenih : parseInt(inputData)
        }]
      }
      else {
        if(inputData <= newData[currentIndex].kuantitasBenih) alert("Input tidak boleh lebih kecil dari kuantitas sekarang")
        else newData[currentIndex].kuantitasBenih = inputData
      }
      console.log(newData)
      setModalOpen(false)
  }

  const handleEdit = (event) => {
    var index = parseInt(event.target.value)
    setInputData(aset[index].kuantitasBenih)
    setCurrentIndex(index)
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
                  { sortData(aset).map((data, index)=>{
                    return (
                      <div className="card" key={index}>
                        <div className="card__header">
                          <div className="card__icon">
                            <FaSeedling className='card__logo' />
                          </div>
                          <div style={{marginLeft: '15px'}}>
                            <b>{data.varietas}</b>
                            <p className="card__timestamp">{formatDate(data.createdDate)}</p>
                          </div>                
                        </div>
                        <div className="card__body">
                          <div className="quantity-value">
                            <div className="quantity">
                              <span>Kuantitas</span>
                              <p>{numberFormat(data.kuantitasBenih)} Kg </p>
                            </div>
                            <div className="value">
                              <span>Harga per Kg</span>
                              <p>Rp{numberFormat(data.hargaPanen)}</p>
                            </div>
                          </div>
                          <div className="seed-age">
                            <span>Umur Benih</span> 
                            <p>{numberFormat(data.umurBenih)} hari</p>
                          </div>
                          <div className="harvest-age">
                            <span>Umur Panen</span>
                            <p>{numberFormat(data.umurPanen)} hari</p>
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
                                    <Input className='number' label={'Tambah Kuantitas Benih'} type='number' name='kuantitasBenih' id='kuantitasBenih' 
                                    placeholder='Tambah Kuantitas Benih' value={inputData} onChange={handleChange} required />
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
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Aset
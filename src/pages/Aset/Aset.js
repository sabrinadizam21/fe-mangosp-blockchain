import React , { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { FaSeedling } from 'react-icons/fa'
import './Aset.css'
import Modal from '../../components/Modal'
import { Input } from '../../components/Input'
import { AsetContext } from '../../context/AsetContext'

function Aset() {
  const [modalOpen, setModalOpen] = useState(false)
  const { aset } = useContext(AsetContext)
  const [inputData, setInputData] = useState("")
  const [currentIndex, setCurrentIndex] = useState(-1)

  const handleChange = (event) => {
    let input = event.target.value
    setInputData(input)
}

  const handleSubmit = (e) => {
    e.preventDefault()
    let newData = aset
        if(currentIndex === -1){
            newData = [...aset, inputData]
        }
        else {
            newData[currentIndex] = inputData
        }
  }

  function numberFormat(number){
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
  }

  return (
    <>
        <div className="aset__wrapper">
            <div className="aset__section">
              <div className="aset__header">
                {/* Header */}
                <div>
                  <div className="aset__title"><h4>Aset</h4></div>
                  <div className="aset__subtitle">Aset yang Anda miliki</div>
                </div>
                <div className="aset__btn-tambahBenih">
                  <Link to='/aset/daftaraset'>
                    <Button buttonColor='primary'>DAFTAR ASET</Button>
                  </Link>
                </div>
              </div>
              <div className="aset__content">
                {aset.map((data, index)=>{
                  return (
                    <div className="card" key={data.id}>
                      <div className="card__header">
                        <div className="card__icon">
                          <FaSeedling className='card__logo' />
                        </div>
                        <div style={{marginLeft: '20px'}}>
                          <b>{data.varietas}</b>
                          <p className="card__timestamp">{data.createDate}</p>
                        </div>                
                      </div>
                      <div className="card__body">
                        <div className="quantity-value">
                          <div className="quantity">
                            <span>Kuantitas</span>
                            <p>{numberFormat(data.kuantitasBenih)} Kg</p>
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
                          <Button className="openModalBtn" buttonSize={'btn--primary'}
                            onClick={() => {
                              setModalOpen(true);
                            }}
                          > 
                          TAMBAH KUANTITAS
                          </Button>
                        {modalOpen && 
                          <Modal setOpenModal={setModalOpen} 
                            modalTitle={'Tambah Kuantitas'}  
                            modalBody={
                              <>
                                <p>Kuantitas Benih A saat ini : {data.kuantitasBenih} Kg</p>
                                <br />
                                <form onSubmit={handleSubmit}>
                                  <Input className='number' label={'Kuantitas Benih Baru'} type='number' name='kuantitasBenih' id='kuantitasBenih' 
                                  placeholder='Kuantitas Benih Baru' value={inputData} onChange={handleChange} required />
                                </form>
                              </>
                            } 
                            cancelBtn ={'BATAL'}
                            processBtn={'SIMPAN'}
                            typePrcsBtn={'SUBMIT'}
                          />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
        </div>
    </>
  )
}

export default Aset
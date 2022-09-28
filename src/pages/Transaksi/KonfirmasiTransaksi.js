import React, {useState, useContext} from 'react'
import { GiSeedling, GiFarmer, GiShop } from "react-icons/gi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { FaWarehouse, FaCircle } from "react-icons/fa"
import './DetailTransaksi.css'
import Modal from '../../components/Modal'
import ModalDetTrx from '../../components/ModalDetTrx'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { UserContext } from '../../context/UserContext'
import { AsetContext } from '../../context/AsetContext'
import Cookies from 'js-cookie'

function KonfirmasiTransaksi() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDetTrxOpen, setModalDetTrxOpen] = useState(false)
  const { functionUser, error } = useContext(UserContext)
  const { aset, rejectTrx, inputTrx, setInputTrx, confirmTrx, getId, getIdBenih, getIdMangga, getIdTx2, qty, 
    currentIndex, formatDate, statusTrx } = useContext(AsetContext)
  const { validateInput } = functionUser
  const role = Cookies.get('role')
  const data = aset[currentIndex]

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputTrx({...inputTrx, [name]:value})
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if(role == 2) rejectTrx(getId, getIdBenih, qty)
    else if (role == 3) rejectTrx(getId, getIdMangga, qty)
    else if (role == 4) rejectTrx(getId, getIdTx2, qty)
    setModalOpen(false)
    validateInput(e)
    console.log(aset)
  }

  return (
    <>
        <div className="wrapper">
            <div className="section">
              <div className="detailTrx__header">
                <h2 className="title">Detail Transaksi</h2>
              </div>
              <div className="content">
                <div className="actor-status">
                  <div className="detailTrx__status">
                    <GiSeedling className='detailTrx__icon'/>
                    <p>Penangkar</p>
                  </div>
                  <HiOutlineArrowNarrowRight className='detailTrx__icon'/>
                  <div className="detailTrx__status">
                    <GiFarmer className='detailTrx__icon'/>
                    <p>Petani</p>
                  </div>
                  <HiOutlineArrowNarrowRight className='detailTrx__icon'/>
                  <div className="detailTrx__status">
                    <FaWarehouse className='detailTrx__icon'/>
                    <p>Pengumpul</p>
                  </div>
                  <HiOutlineArrowNarrowRight className='detailTrx__icon'/>
                  <div className="detailTrx__status">
                    <GiShop className='detailTrx__icon'/>
                    <p>Pedagang</p>
                  </div>
                </div>
                <div className="information">
                  <div className="last-note">
                    <span>Pencatat Transaksi</span>
                    <p>{data.namaPengirim}</p>
                  </div>
                  <div className="status-trx">
                    {statusTrx(data.isConfirmed, data.isRejected)}
                    <p className="timestamp">{formatDate(data.tanggalTransaksi)}</p>
                  </div>
                </div>
                <div className="btn-konfirmasi">
                    <Button onClick={() => confirmTrx(getId)} buttonSize='btn--small'>TERIMA</Button>
                </div>
                <div className="btn-konfirmasi">
                    <Button id='rejectButton' buttonStyle='btn--outline' buttonSize='btn--small' onClick={() => { setModalOpen(true)}}>TOLAK</Button>
                    {modalOpen && 
                  <Modal setOpenModal={setModalOpen} 
                    modalTitle={'Tolak Transaksi'}  
                    modalBody={
                      <>  
                        <form id='rejectReason' onSubmit={handleSubmit}>
                          <Input label={'Alasan'} type='text' name='rejectReason' id='rejectReason' placeholder='Alasan' 
                          value={inputTrx.rejectReason} onChange={handleChange} onBlur={validateInput} errorMsg={error.rejectReason} required />
                        </form>
                      </>
                    } 
                    cancelBtn ={'TUTUP'}
                    processBtn={'SIMPAN'}
                    form={'rejectReason'}
                  />
                }
                </div>
                <div className="detailTrx__timeline">
                  <div className="timeline-title">Timeline</div>
                  <div className="timeline-content">
                    <FaCircle style={{color : '#1A1305', fontSize : '20px'}}/>
                    <div className="timeline-card">
                      <div className="timeline-card__header">
                        <b>Penangkar mendaftarkan benih</b>              
                      </div>
                      <div className="timeline-card__body">
                        <p className="timestamp">20 Januari 2000 - 23:14 wib</p>
                      </div>
                      <div className="timeline-card__bottom">
                          <button className='detailBtn' onClick={() => { setModalDetTrxOpen(true) }}>Lihat Detail</button>
                          {modalDetTrxOpen && 
                            <ModalDetTrx setModalDetTrxOpen={setModalDetTrxOpen} 
                              modalDetTrxTitle={'Penangkar mendaftarkan Benih'}  
                            />
                          }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default KonfirmasiTransaksi
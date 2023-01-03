import React, {useContext, useState} from 'react'
import { MdQrCodeScanner } from "react-icons/md"
import { GiSeedling, GiFarmer, GiShop } from "react-icons/gi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { FaWarehouse } from "react-icons/fa"
import { MdContentCopy } from "react-icons/md"
import './DetailTransaksi.css'
import Modal from '../../components/Modal'
import Timeline from '../../components/Timeline'
import { AsetContext } from '../../context/AsetContext'
import { useParams } from "react-router"
import { Button } from '../../components/Button'
import { UserContext } from '../../context/UserContext'
import { Input } from '../../components/Input'
import Cookies from 'js-cookie'
import SpeechBubble from '../../components/SpeechBubble'

function DetailTransaksi() {
  const [modalOpen, setModalOpen] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(true)
  const [modalRejectOpen, setModalRejectOpen] = useState(false)
  const [text, setText] = useState('adlaldfsaerwe10923123joawadlaldfsaerwe10923123joaw')
  const { aset, statusTrx, elementPos, formatDate, formatDateNoHour, rejectTrx, inputTrx, setInputTrx, confirmTrx, 
    } = useContext(AsetContext)
  const { functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser
  const role = Cookies.get('role')
  let { idTrx } = useParams()
  
  const data = aset[elementPos(idTrx)]
  const idBenih = data.benihID
  const idMangga = data.manggaID
  const idTx2 = data.txID2
  
  const handleChange = (event) => {
    const id_QR = event.target.value
    setText(id_QR)
  }

  const copyClipboard = async () => {
    await navigator.clipboard.writeText(text)
    alert("ID berhasil di salin")
  }

  const handleReject = (event) => {
    let {value, name} = event.target
    setInputTrx({...inputTrx, [name]:value})
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if(role == 2) rejectTrx(idTrx, idBenih, data.kuantitasBenihKg)
    else if (role == 3) rejectTrx(idTrx, idMangga, data.kuantitasManggaKg)
    else if (role == 4) rejectTrx(idTrx, idTx2, data.kuantitasManggaKg)
    setModalRejectOpen(false)
    validateInput(e)
    console.log(aset)
  }

  const pendingCondition = (data.isAsset === false && data.namaPenerima === Cookies.get('username') && data.isConfirmed === false && data.isRejected === false)
  
  const summaryCondition = (text) => {
    return text === '' || text === '1 Jan 1970' ? <p className='timestamp'>Belum Tersedia</p> : text
  }
  return (
    <>
        <div className="wrapper">
            <div className="section">           
              <div className="detailTrx__header">
                <h2 className="title">Detail Transaksi</h2>    
                <div style={{position : 'relative'}}>           
                  {bubbleOpen && 
                  <SpeechBubble 
                    setBubbleOpen={setBubbleOpen} 
                    text={'Klik untuk melihat QR Code dan ID Transaksi disini.'} />
                  }
                  <button  onClick={() => { setModalOpen(true) }}>
                    <MdQrCodeScanner className='detailTrx__qrcode' />
                  </button>
                </div>
                {modalOpen && 
                  <Modal setOpenModal={setModalOpen} 
                    modalTitle={'QR CODE'}  
                    modalBody={
                      <>  
                        <div className="img-qr">
                          <img width='150px' src={`http://api.qrserver.com/v1/create-qr-code/?data=${idTrx}&size=400x400&bgcolor=ffffff`} alt="qr-code" />
                        </div>
                        <div className='qrcode-input'>
                          <input type="text" value={idTrx} onChange={handleChange} disabled />
                          <button onClick={copyClipboard} disabled={!idTrx}><MdContentCopy /></button>
                        </div>
                      </>
                    } 
                    cancelBtn ={'TUTUP'}
                    processBtn={
                      <a className='btn-download' href={`http://api.qrserver.com/v1/create-qr-code/?data=${idTrx}&size=400x400&bgcolor=ffffff`} download>Unduh QR Code</a>
                    }
                  />
                }
              </div>
              <div className="content">
                <div className="actor-status">
                  <div className={data.benihID !== '' ? "detailTrx__status" : "detailTrx__status iconNotActive"}>
                    <GiSeedling className='detailTrx__icon'/>
                    <p>Penangkar</p>
                  </div>
                  <HiOutlineArrowNarrowRight className={data.manggaID !== '' || data.txID2 !== '' ? 'detailTrx__icon' : 'detailTrx__icon iconNotActive'}/>
                  
                  <div className={data.manggaID !== '' || data.txID2 !== '' ? "detailTrx__status" : "detailTrx__status iconNotActive"}>
                    <GiFarmer className='detailTrx__icon'/>
                    <p>Petani</p>
                  </div>
                  <HiOutlineArrowNarrowRight className={data.txID3 !== '' ? 'detailTrx__icon' : 'detailTrx__icon iconNotActive'}/>
                  
                  <div className={data.txID3 !== '' ? "detailTrx__status" : "detailTrx__status iconNotActive"}>
                    <FaWarehouse className='detailTrx__icon'/>
                    <p>Pengumpul</p>
                  </div>
                  <HiOutlineArrowNarrowRight className={data.txID4 !== '' ? 'detailTrx__icon' : 'detailTrx__icon iconNotActive'}/>
                  
                  <div className={data.txID4 !== '' ? "detailTrx__status" : "detailTrx__status iconNotActive"}>
                    <GiShop className='detailTrx__icon'/>
                    <p>Pedagang</p>
                  </div>
                </div>
                <div className="information">
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="last-note">
                      <span>Varietas</span>
                      <p>{data.varietasBenih}</p>
                    </div>
                    <div className="status-trx">
                      {statusTrx(data.isConfirmed, data.isRejected)}
                      <p className="timestamp">
                        {data.pupuk !== "" && data.kuantitasManggaKg === 0 ? 
                          formatDate(data.tanggalTanam) : 
                        data.kuantitasManggaKg !== 0 && data.isPanen === true ?
                          formatDate(data.tanggalPanen) :
                          formatDate(data.tanggalTransaksi)
                        }
                      </p>
                    </div>
                  </div>
                  <table className='summary-table'>
                    <tr>
                      <td>Pestisida</td>
                      <td>{summaryCondition(data.pestisida)}</td>
                    </tr>
                    <tr>
                      <td>Pupuk</td>
                      <td>{summaryCondition(data.pupuk)}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Tanam</td>
                      <td>{summaryCondition(formatDateNoHour(data.tanggalTanam))}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Panen</td>
                      <td>{summaryCondition(formatDateNoHour(data.tanggalPanen))}</td>
                    </tr>
                    <tr>
                      <td>Lokasi tanam</td>
                      <td>{summaryCondition(data.lokasiLahan)}</td>
                    </tr>
                  </table>
                </div>
                {pendingCondition && <>
                  <div className="btn-konfirmasi">
                      <Button onClick={() => confirmTrx(idTrx)} buttonSize='btn--small'>TERIMA</Button>
                  </div>
                  <div className="btn-konfirmasi">
                      <Button id='rejectButton' buttonStyle='btn--outline' buttonSize='btn--small' onClick={() => { setModalRejectOpen(true)}}>TOLAK</Button>
                      {modalRejectOpen && 
                      <Modal setOpenModal={setModalRejectOpen} 
                        modalTitle={'Tolak Transaksi'}  
                        modalBody={
                          <>  
                            <form id='rejectReason' onSubmit={handleSubmit}>
                              <Input label={'Alasan'} type='text' name='rejectReason' id='rejectReason' placeholder='Alasan' 
                              value={inputTrx.rejectReason} onChange={handleReject} onBlur={validateInput} errorMsg={error.rejectReason} required />
                            </form>
                          </>
                        } 
                        cancelBtn ={'TUTUP'}
                        processBtn={'SIMPAN'}
                        form={'rejectReason'}
                      />
                    }
                  </div>
                </>
                }
                <div className="detailTrx__timeline">
                  <div className="timeline-title">Timeline</div>
                  <div className="timeline-content">
                    { data.txID4 !== '' &&
                      <Timeline title={'Pedagang menjual mangga'} data={aset[elementPos(data.txID4)]} />
                    }
                    { data.txID3 !== '' &&
                      <Timeline title={'Pengumpul menjual mangga'} data={aset[elementPos(data.txID3)]} />
                    }
                    { data.txID2 !== '' &&
                      <Timeline title={'Petani menjual mangga'} data={aset[elementPos(data.txID2)]} />
                    } 
                    { data.pestisida !== '' && data.manggaID !== '' &&
                      <Timeline title={'Petani memanen mangga'} data={aset[elementPos('asetTanamBenih2')]} />
                    }
                    { data.pupuk !== '' && data.manggaID !== '' &&
                      <Timeline title={'Petani menanam benih'} data={aset[elementPos(data.manggaID)]} />
                    } 
                    { data.txID1 !== '' &&
                      <Timeline title={'Penangkar menjual benih'} data={aset[elementPos(data.txID1)]} />
                    }
                    {/* { data.benihID !== '' &&
                      <Timeline title={'Penangkar mendaftarkan benih'} data={aset[elementPos(data.benihID)]} />
                    } */}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default DetailTransaksi
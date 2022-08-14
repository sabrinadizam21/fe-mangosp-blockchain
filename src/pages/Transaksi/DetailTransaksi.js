import React, {useContext, useState, useEffect} from 'react'
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
import axios from 'axios'

function DetailTransaksi() {
  const [modalOpen, setModalOpen] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(true)
  const [modalRejectOpen, setModalRejectOpen] = useState(false)

  const [ data, setData ] = useState([])
  const [ petaniTrx, setPetaniTrx ] = useState([])
  const [ tanamBenih, setTanamBenih ] = useState([])
  const [ penangkarTrx, setPenangkarTrx ] = useState([])
  const [ pengumpulTrx, setPengumpulTrx ] = useState([])
  const [ text, setText ] = useState('')

  const { statusTrx, formatDate, rejectTrx, inputTrx, setInputTrx, confirmTrx } = useContext(AsetContext)
  const { functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser

  const role = Cookies.get('role')
  const chaincodeName = Cookies.get('chaincodeName')
  const channelName = Cookies.get('channelName')
  
  const { idTrx } = useParams()

  const getManggaDetailById = async (idAset, order) => {
    const role = Cookies.get('role').toLowerCase()
    await axios({
      method : 'get',
      url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
      headers : {
        Authorization : 'Bearer ' + Cookies.get('token')
      } ,
      params : {
          peer : "peer0." + role + ".example.com",
          fcn  : "GetManggaByID",
          args : '["' + idAset + '"]'
      }
    }).then(async(res)=>{ 
      const response = res.data.result
      if(order === 0) {
        await setData(response)
        Cookies.set('idMangga', response.manggaID)
        Cookies.set('idTx2', response.txID2)
        Cookies.set('idTx1', response.txID1)
        Cookies.set('idTx3', response.txID3)
        Cookies.set('idBenih', response.benihID)
      }
      else if(order === 1) setPenangkarTrx(response)
      else if(order === 2) setTanamBenih(response)
      else if(order === 3) setPetaniTrx(response)
      else if(order === 4) setPengumpulTrx(response)
    }).catch((err) => console.log(err))
  }

  const idBenih = Cookies.get('idBenih')
  const idMangga = Cookies.get('idMangga')
  const idTx2 = Cookies.get('idTx2')
  const idTx1 = Cookies.get('idTx1')
  const idTx3 = Cookies.get('idTx3')

  useEffect(()=>{    
    const getDetail = async() => {
      await getManggaDetailById(idTrx, 0)
      await getManggaDetailById(idTx1, 1)
      await getManggaDetailById(idMangga, 2)
      await getManggaDetailById(idTx2, 3)
      await getManggaDetailById(idTx3, 4)
    }
    getDetail()
  },[])
  
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
    if(role === 'Org2') rejectTrx(idTrx, idBenih, data.kuantitasBenih)
    else if (role === 'Org3') rejectTrx(idTrx, idMangga, data.kuantitasManggaKg)
    else if (role === 'Org4') rejectTrx(idTrx, idTx2, data.kuantitasManggaKg)
    setModalRejectOpen(false)
    validateInput(e)
  }

  const pendingCondition = (data.isAsset === false && data.namaPenerima === Cookies.get('username') && data.isConfirmed === false && data.isRejected === false)

  return (
    <>
        <div className="wrapper">
            <div className="section">           
              <div className="detailTrx__header">
                <span className="title">Detail Transaksi</span>    
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
                      <a className='btn-download' href={`http://api.qrserver.com/v1/create-qr-code/?data=${idTrx}&size=400x400&bgcolor=ffffff`} download target={'_blank'} rel="noreferrer">Unduh QR Code</a>
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
                  <div className="last-note">
                    <span>Pencatat Transaksi</span>
                    <p>{data.namaPengirim}</p>
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
                      <Timeline title={'Pedagang menjual mangga'} data={data} />
                    }
                    { data.txID3 !== '' &&
                      <Timeline title={'Pengumpul menjual mangga'} data={pengumpulTrx} />
                    }
                    { data.txID2 !== '' &&
                      <Timeline title={'Petani menjual mangga'} data={petaniTrx} />
                    } 
                    { data.kuantitasManggaKg !== 0 && data.manggaID !== '' &&
                      <Timeline title={'Petani memanen mangga'} data={tanamBenih} />
                    }
                    { data.pupuk !== '' && data.manggaID !== '' &&
                      <Timeline title={'Petani menanam benih'} data={tanamBenih} />
                    }                      
                    { data.txID1 !== '' &&
                      <Timeline title={'Penangkar menjual benih'} data={penangkarTrx} />
                    }
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default DetailTransaksi
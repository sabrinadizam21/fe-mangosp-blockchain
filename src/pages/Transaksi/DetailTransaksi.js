import React, {useState} from 'react'
import { MdQrCodeScanner } from "react-icons/md";
import { GiSeedling, GiFarmer, GiShop } from "react-icons/gi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { FaWarehouse, FaCircle } from "react-icons/fa"
import { MdContentCopy } from "react-icons/md"
import './DetailTransaksi.css'
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

function DetailTransaksi() {
  const [modalOpen, setModalOpen] = useState(false)
  const [text, setText] = useState('adlaldfsaerwe10923123joawadlaldfsaerwe10923123joaw');

  const handleChange = (event) => {
    const id_QR = event.target.value
    setText(id_QR)
  }

  const copyClipboard = async () => {
    await navigator.clipboard.writeText(text)
    alert("ID berhasil di salin")
  }
  return (
    <>
        <div className="wrapper">
            <div className="section">
              <div className="detailTrx__header">
                <span className="title">Detail Transaksi</span>
                <button  onClick={() => { setModalOpen(true); }}>
                  <MdQrCodeScanner className='detailTrx__qrcode' />
                </button>
                {modalOpen && 
                  <Modal setOpenModal={setModalOpen} 
                    modalTitle={'QR CODE'}  
                    modalBody={
                      <>  
                        <img src="https://ipb.link/User/QrCode?shortlink=modul-toga&domain=ipb.link" alt="qr-code" />
                        <div className='qrcode-input'>
                          <input type="text" value={text} onChange={handleChange} disabled />
                          <button onClick={copyClipboard} disabled={!text}><MdContentCopy /></button>
                        </div>
                      </>
                    } 
                    cancelBtn ={'TUTUP'}
                    processBtn={'DOWNLOAD QR'}
                  />
                }
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
                    <p>Pak Penangkar</p>
                  </div>
                  <div className="status-trx">
                    <p className='status'>Tertunda</p>
                    <p className="timestamp">20 Januari 2000 - 23:14 wib</p>
                  </div>
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
                          <Link to=''>Lihat Detail</Link>
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

export default DetailTransaksi
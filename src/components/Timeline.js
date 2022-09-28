import React, {useContext, useState} from 'react'
import ModalDetTrx from './ModalDetTrx'
import '../pages/Transaksi/DetailTransaksi.css'
import { AsetContext } from '../context/AsetContext'

function Timeline({
    title,
    data,
}) {
  const [modalDetTrxOpen, setModalDetTrxOpen] = useState(false)
  const { formatDate } = useContext(AsetContext)
  return (
    <>
        <div className='all-set-card'>
            <div style={{width: '17px', display: 'grid'}}>
                <div className='bullet-style'></div>
                {data.pupuk !=='' && <div className='dash-style'></div>}
            </div>
            <div className="timeline-card">
                <div className="timeline-card__header">
                    <b>{title}</b>              
                </div>
                <div className="timeline-card__body">
                    <p className="timestamp"> 
                    { title==='Petani menanam benih' ?//data.pupuk !== "" && data.kuantitasManggaKg === 0 ? 
                        formatDate(data.tanggalTanam) : 
                        title==='Petani memanen mangga' ?//data.kuantitasManggaKg !== 0 && data.isPanen === true ?
                        formatDate(data.tanggalPanen) :
                        formatDate(data.tanggalTransaksi)}</p>
                </div>
                <div className="timeline-card__bottom">
                    <button className='detailBtn' onClick={() => { setModalDetTrxOpen(true) }}>Lihat Detail</button>
                    {modalDetTrxOpen && 
                    <ModalDetTrx setModalDetTrxOpen={setModalDetTrxOpen} 
                        modalDetTrxTitle={title}  
                        data = {data}
                    />
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Timeline
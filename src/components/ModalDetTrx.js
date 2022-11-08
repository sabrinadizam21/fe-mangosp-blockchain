import React, {useContext} from 'react'
import "./Modal.css"
import { ImCross } from "react-icons/im"
import { AsetContext } from '../context/AsetContext'

function ModalDetTrx({ 
    setModalDetTrxOpen,
    modalDetTrxTitle,
    data
   }) {
  const { formatDate, numberFormat } = useContext(AsetContext)
  
  const createBenih = [
    {atribute : "Varietas", value : data.varietasBenih},
    {atribute : "Umur Benih", value : data.umurBenih},
    {atribute : "Kuantitas Benih", value : numberFormat(data.kuantitasBenih)},
    {atribute : "Penangkar", value : data.namaPengirim},
  ]
  const trxByPenangkar = [
    {atribute : "Varietas", value : data.varietasBenih},
    {atribute : "Umur Benih", value : data.umurBenih},
    {atribute : "Kuantitas Benih", value : numberFormat(data.kuantitasBenih)},
    {atribute : "Harga Benih", value : 'Rp' + numberFormat(data.hargaBenihPerBuah)},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
    {atribute : "Penjual", value : data.namaPengirim},
    {atribute : "Pembeli", value : data.namaPenerima},
  ]
  const tanamBenih = [
    {atribute : "Petani", value : data.namaPengirim},
    {atribute : "Kuantitas Benih", value : numberFormat(data.kuantitasBenih)},
    {atribute : "Pupuk", value : data.pupuk},
    {atribute : "Lokasi lahan", value : data.lokasiLahan},
    {atribute : "Tanggal Tanam", value : formatDate(data.tanggalTanam)},
  ]
  const panenMangga = [
    {atribute : "Petani", value : data.namaPengirim},
    {atribute : "Kuantitas Mangga", value : numberFormat(data.kuantitasManggaKg) + ' Kg'},
    {atribute : "Ukuran", value : data.ukuran},
    {atribute : "Pestisida", value : data.pestisida},
    {atribute : "Kadar Air", value : data.kadarAir + '%'},
    {atribute : "Perlakuan", value : data.perlakuan},
    {atribute : "Produktivitas", value : data.produktivitas},
  ]
  const trxByPetani = [
    {atribute : "Penjual", value : data.namaPengirim},
    {atribute : "Pembeli", value : data.namaPenerima},
    {atribute : "Kuantitas Mangga", value : numberFormat(data.kuantitasManggaKg) + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
  ]
  const trxByPengumpul = [
    {atribute : "Penjual", value : data.namaPengirim},
    {atribute : "Pembeli", value : data.namaPenerima},
    {atribute : "Kuantitas Mangga", value : numberFormat(data.kuantitasManggaKg) + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
    {atribute : "Teknik Sorting", value : data.teknikSorting},
    {atribute : "Metode Pengemasan", value : data.metodePengemasan},
    {atribute : "Pengangkutan", value : data.pengangkutan},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
  ]
  const trxByPedagang = [
    {atribute : "Penjual", value : data.namaPengirim},
    {atribute : "Kuantitas Mangga", value : numberFormat(data.kuantitasManggaKg) + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
    {atribute : "Teknik Sorting", value : data.teknikSorting},
    {atribute : "Metode Pengemasan", value : data.metodePengemasan},
    {atribute : "Pengangkutan", value : data.pengangkutan},
  ]

  const trxByPengumpulCh2 = [
    {atribute : "Penjual", value : data.namaPengirim},
    {atribute : "Pembeli", value : data.namaPenerima},
    {atribute : "Kuantitas Mangga", value : numberFormat(data.kuantitasManggaKg) + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
  ]
  const trxByPedagangCh2 = [
    {atribute : "Penjual", value : data.namaPengirim},
    {atribute : "Kuantitas Mangga", value : numberFormat(data.kuantitasManggaKg) + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
  ]

  const detailData = modalDetTrxTitle === 'Pedagang menjual mangga' && !data.teknikSorting  ? trxByPedagangCh2 :
                    modalDetTrxTitle === 'Pedagang menjual mangga' && data.teknikSorting   ? trxByPedagang :        
                    modalDetTrxTitle === 'Pengumpul menjual mangga' && !data.teknikSorting ? trxByPengumpulCh2 :
                    modalDetTrxTitle === 'Pengumpul menjual mangga' && data.teknikSorting ? trxByPengumpul :
                    modalDetTrxTitle === 'Petani menjual mangga' ? trxByPetani :
                    modalDetTrxTitle === 'Petani memanen mangga' ? panenMangga  : 
                    modalDetTrxTitle === 'Petani menanam benih' ? tanamBenih : 
                    modalDetTrxTitle === 'Penangkar menjual benih' ? trxByPenangkar : ''
  return (
    <div className="modal__background">
      <div className="modal__container">
        <div className="modal__header">
            <div className="modal__title">
                <p>{modalDetTrxTitle}</p>
            </div>
          <button
            onClick={() => {
                setModalDetTrxOpen(false);
            }}
          >
            <ImCross />
          </button>
        </div>
        <div className="modal__body">
            <table>
              <thead>
              </thead>
              <tbody>
                {detailData.map((detailRow, index) => {
                return(
                  <tr key={index}>
                      <td>{detailRow.atribute}</td>
                      <td>{detailRow.value}</td>
                  </tr>
                )})}
                {data.isRejected === true &&
                <tr>
                    <td>Alasan Tolak</td>
                    <td>{data.rejectReason}</td>
                </tr>}
              </tbody>
            </table>
        </div>
       
      </div>
    </div>
  )
}

export default ModalDetTrx
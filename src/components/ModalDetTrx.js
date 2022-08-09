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
    {atribute : "Umur Benih", value : data.umurBenih + ' Bulan'},
    {atribute : "Kuantitas Benih", value : numberFormat(data.kuantitasBenih) + ' Kg'},
    {atribute : "Penangkar", value : data.namaPengirim},
  ]
  const trxByPenangkar = [
    {atribute : "Kuantitas Benih", value : numberFormat(data.kuantitasBenih) + ' Kg'},
    {atribute : "Harga Benih Kg", value : 'Rp' + numberFormat(data.hargaBenihPerBuah)},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
    {atribute : "Pengirim", value : data.namaPengirim},
    {atribute : "Penerima", value : data.namaPenerima},
  ]
  const tanamBenih = [
    {atribute : "Petani", value : data.namaPengirim},
    {atribute : "Kuantitas Benih", value : numberFormat(data.kuantitasBenih) + ' Kg'},
    {atribute : "Pupuk", value : data.pupuk},
    {atribute : "Lokasi lahan", value : data.lokasiLahan},
    {atribute : "Tanggal Tanam", value : formatDate(data.tanggalTanam)},
  ]
  const panenMangga = [
    {atribute : "Petani", value : data.namaPengirim},
    {atribute : "Kuantitas Mangga", value : data.kuantitasManggaKg + ' Kg'},
    {atribute : "Ukuran", value : data.ukuran},
    {atribute : "Pestisida", value : data.pestisida},
    {atribute : "Kadar Air", value : data.kadarAir + '%'},
    {atribute : "Perlakuan", value : data.perlakuan},
    {atribute : "Produktivitas", value : data.produktivitas},
  ]
  const trxByPetani = [
    {atribute : "Pengirim", value : data.namaPengirim},
    {atribute : "Penerima", value : data.namaPenerima},
    {atribute : "Kuantitas Mangga", value : data.kuantitasManggaKg + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
  ]
  const trxByPengumpul = [
    {atribute : "Pengirim", value : data.namaPengirim},
    {atribute : "Penerima", value : data.namaPenerima},
    {atribute : "Kuantitas Mangga", value : data.kuantitasManggaKg + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
    {atribute : "Teknik Sorting", value : data.teknikSorting},
    {atribute : "Metode Pengemasan", value : data.metodePengemasan},
    {atribute : "Pengangkutan", value : data.pengangkutan},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
  ]
  const trxByPedagang = [
    {atribute : "Pengirim", value : data.namaPengirim},
    {atribute : "Penerima", value : data.namaPenerima},
    {atribute : "Kuantitas Mangga", value : data.kuantitasManggaKg + ' Kg'},
    {atribute : "Harga Mangga /Kg", value : 'Rp' + numberFormat(data.hargaManggaPerKg)},
    {atribute : "Teknik Sorting", value : data.teknikSorting},
    {atribute : "Metode Pengemasan", value : data.metodePengemasan},
    {atribute : "Pengangkutan", value : data.pengangkutan},
    {atribute : "Cara Pembayaran", value : data.caraPembayaran},
  ]

  const detailData = data.txID4 !== '' ? trxByPedagang :
                    data.txID3 !== '' ? trxByPengumpul :
                    data.txID2 !== '' ? trxByPetani :
                    data.manggaID !== '' && data.pupuk !== '' ? tanamBenih : 
                    data.manggaID !== '' && data.kuantitasManggaKg !== 0 ? panenMangga :
                    data.txID1 !== '' ? trxByPenangkar :
                    data.benihID !== '' ? createBenih : ''
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
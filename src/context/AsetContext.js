import { useState, createContext } from 'react'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
export const AsetContext = createContext()
export const AsetProvider = props => {
    
    let history = useHistory()
    const [currentIndex, setCurrentIndex] = useState(-1)
    
    const formatDate = (x) => {
        if (x.toString().length < 12) { x = x*1000 }
        const date = new Date(x)
        const day = date.toLocaleString('default', {day: 'numeric'})
        const month = date.toLocaleString('default', {month: 'long'})
        const year = date.toLocaleString('default', {year: 'numeric'})
        const hour = date.toLocaleString('default', {hour : 'numeric', minute : 'numeric', hour12 : false})
        return day + ' ' + month + ' ' + year + ' - ' + hour
    }

    const sortData = (data) => data.sort((a,b) => (a.createdDate < b.createdDate) ? 1 : -1)
    
    function numberFormat(number){
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    }
    
    const [qtyBenih, setQtyBenih] = useState("")
    
    const [aset,setAset] = useState([
        {id : 0, createdDate: 1648054793, VarietasBenih :'Benih A', KuantitasBenihKg : 1000, UmurBenih : 20, isAsset : true},
        {id : 1, createdDate: 1648757753, VarietasBenih :'Jaya Raya', KuantitasBenihKg : 1200, UmurBenih : 10, isAsset : true},
        {id : 2, createdDate: 1641967200, VarietasBenih :'Benih C', KuantitasBenihKg : 300, UmurBenih : 14, isAsset : true},
        {id : 3, createdDate: 1645668000, VarietasBenih :'Benih K', KuantitasBenihKg : 540, UmurBenih : 18, isAsset : true}
    ])

    const [inputTrx, setInputTrx] = useState([
        {   id : '', 
            BenihID : 0, 
            ManggaID : '', 
            NamaPengirim : '', 
            NamaPenerima : '', 
            KuantitasBenihKg : '', 
            HargaBenihKg : '', 
            HargaBenihTotal : '', 
            KuantitasManggaKg : '', 
            HargaManggaKg : '', 
            HargaManggaTotal : '', 
            TanggalTransaksi : '', 
            VarietasBenih : '', 
            UmurBenih : '', 
            Pupuk : '', 
            TanggalTanam : '', 
            LokasiLahan : '', 
            Ukuran : '', 
            Pestisida : '', 
            KadarAir : '', 
            Perlakuan : '', 
            Produktivitas : '', 
            TanggalPanen : '', 
            TanggalMasuk : '', 
            TeknikSorting : '', 
            MetodePengemasan : '', 
            Pengangkutan : '', 
            Pembeli : '', 
            CaraPembayaran : '', 
            TxID1 : '', 
            TxID2 : '', 
            TxID3 : '', 
            TxID4 : '', 
            IsAsset : '', 
            IsConfirmed : '', 
            IsEmpty : '', 
            IsRejected : '', 
            RejectReason : ''}
    ])
    
    
    //======================== START ASET BENIH ========================//

    // Input Benih
    const [input, setInput] = useState({
        VarietasBenih :'', KuantitasBenihKg : '', UmurBenih : '', createdDate :'', isAsset : ''
    })

    const createBenih = () => {
        if(currentIndex === -1){
            setAset([...aset, {
              id : 5,
              VarietasBenih : input.VarietasBenih,
              KuantitasBenihKg : parseInt(input.KuantitasBenihKg),
              UmurBenih : parseInt(input.UmurBenih),
              createdDate : new Date().getTime(),
              isAsset : true
            }])
            history.push('/aset')
            setInput({
                VarietasBenih :'', 
                KuantitasBenihKg : '',
                UmurBenih : ''
            })
        }
    }

    const addQtyBenih = () => {
        let newData = aset
        if(currentIndex === -1){
          newData = [...aset, {
            KuantitasBenihKg : parseInt(qtyBenih)
          }]
        }
        else {
          if(qtyBenih <= newData[currentIndex].KuantitasBenihKg) alert("Input tidak boleh lebih kecil dari kuantitas sekarang")
          else newData[currentIndex].KuantitasBenihKg = qtyBenih
        }
        console.log(newData)
    }
    //======================== END ASET BENIH ========================//

    
    //======================== START TRANSAKSI PENANGKAR ========================//
    const [trxPenangkar, setTrxPenangkar] = useState([])
    const [checked, setChecked] = useState([])

    const createTrxPenangkar = () => {
        if(currentIndex === -1){
            setAset([...aset, {
                NamaPengirim : Cookies.get('username'),
                KuantitasBenihKg : inputTrx.KuantitasBenihKg, 
                UmurBenih : inputTrx.UmurBenih, 
                UmurPanen : inputTrx.UmurPanen, 
                HargaBenihKg : inputTrx.HargaBenihKg, 
                NamaPenerima : inputTrx.NamaPenerima,
                CaraPembayaran : inputTrx.CaraPembayaran,
                isAsset : false,
            }])
            //history.push('/transaksi-keluar')
            setInputTrx({
                KuantitasBenihKg : '', 
                UmurBenih : '', 
                UmurPanen : '', 
                HargaBenihKg : '', 
                isAsset : false, 
                NamaPengirim : '', 
                NamaPenerima : '', 
                CaraPembayaran : []
            })
        }
    }
    //======================== END TRANSAKSI PENANGKAR ========================//


    //======================== START TRANSAKSI PETANI ========================//
    const createTrxPetani = () => {
        if(currentIndex === -1){
            setAset([...aset, {
                Benih : inputTrx.Benih,
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                Ukuran : inputTrx.Ukuran,
                Pestisida : inputTrx.Pestisida,
                KadarAir : inputTrx.KadarAir,
                Perlakuan : inputTrx.Perlakuan,
                Produktivitas : inputTrx.Produktivitas,
                HargaManggaTotal : inputTrx.HargaManggaTotal,
                NamaPenerima : inputTrx.NamaPenerima,
                CaraPembayaran : inputTrx.CaraPembayaran
            }])
            //history.push('/transaksi-keluar')
            setInputTrx({
                Benih : '',
                KuantitasManggaKg : '',
                Ukuran : '',
                Pestisida : '',
                KadarAir : '',
                Perlakuan : '',
                Produktivitas : '',
                HargaManggaTotal : '',
                NamaPenerima : '',
                CaraPembayaran : []
            })
        }
    }
    //======================== END TRANSAKSI PETANI ========================//

    
    //======================== START TRANSAKSI PENGUMPUL ========================//
    const createTrxPengumpul = () => {
        if(currentIndex === -1){
            setAset([...aset, {
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                TeknikSorting : inputTrx.TeknikSorting,
                HargaManggaKg : inputTrx.HargaManggaKg,
                MetodePengemasan : inputTrx.MetodePengemasan,
                Pengangkutan : inputTrx.Pengangkutan,
                NamaPenerima : inputTrx.NamaPenerima,
                CaraPembayaran : inputTrx.CaraPembayaran,
                
            }])
            //history.push('/transaksi-keluar')
            setInputTrx({
                KuantitasManggaKg : '',
                TeknikSorting : '',
                HargaManggaKg : '',
                MetodePengemasan : '',
                Pengangkutan : '',
                NamaPenerima : '',
                CaraPembayaran : []
            })
        }
    }
    //======================== END TRANSAKSI PENGUMPUL ========================//

    //======================== START TRANSAKSI PEDAGANG ========================//
    const createTrxPedagang = () => {
        if(currentIndex === -1){
            setAset([...aset, {
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                TeknikSorting : inputTrx.TeknikSorting,
                HargaManggaKg : inputTrx.HargaManggaKg,
                MetodePengemasan : inputTrx.MetodePengemasan,
                Pengangkutan : inputTrx.Pengangkutan,
                CaraPembayaran : inputTrx.CaraPembayaran,
            }])
            //history.push('/transaksi-keluar')
            setInputTrx({
                KuantitasManggaKg : '',
                TeknikSorting : '',
                HargaManggaKg : '',
                MetodePengemasan : '',
                Pengangkutan : '',
                NamaPenerima : '',
                CaraPembayaran : []
            })
        }
    }
    //======================== END TRANSAKSI PEDAGANG ========================//

    return(
       <AsetContext.Provider value={{ 
           aset, setAset, numberFormat, formatDate, sortData, createBenih, input, setInput, addQtyBenih,
           qtyBenih, setQtyBenih, currentIndex, setCurrentIndex, inputTrx, setInputTrx, 
           trxPenangkar, setTrxPenangkar, createTrxPenangkar, checked, setChecked, createTrxPetani,
           createTrxPengumpul,  createTrxPedagang
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}
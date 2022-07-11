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

    const sortData = (data) => data.sort((a,b) => (a.TanggalTransaksi < b.TanggalTransaksi) ? 1 : -1)
    
    function numberFormat(number){
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    }

    const [selectedValue, setSelectedValue] = useState('ALL')

    const showData = (datas, trxType) => {
        if(trxType === 'out'){
            datas = datas.filter(data => data.IsAsset === false && data.NamaPengirim === Cookies.get('username'))
        } else if (trxType === 'in') {
            datas = datas.filter(data => data.IsAsset === false && data.NamaPenerima === Cookies.get('username'))
        }

        if(selectedValue === 'ALL')
            return datas
        else if(selectedValue === 'SUCCESS')
            return datas.filter(data => data.IsConfirmed === true)
        else if(selectedValue === 'FAILED')
            return datas.filter(data => data.IsRejected === true)
        else if(selectedValue === 'PENDING')
            return datas.filter(data => data.IsConfirmed === false && data.IsRejected === false)
      }
    
    const [qtyBenih, setQtyBenih] = useState("")
    
    const [aset,setAset] = useState([
        {id : 'benih1', 
        BenihID : 'benih1', 
        ManggaID : '', 
        NamaPengirim : '', 
        NamaPenerima : '', 
        KuantitasBenihKg : 10, 
        HargaBenihKg : 0, 
        HargaBenihTotal : 0, 
        KuantitasManggaKg : 0, 
        HargaManggaKg : 0, 
        HargaManggaTotal : 0, 
        TanggalTransaksi : 1648054793, 
        VarietasBenih : 'Benih ABC', 
        UmurBenih : 2, 
        Pupuk : '', 
        TanggalTanam : 0, 
        LokasiLahan : '', 
        Ukuran : '', 
        Pestisida : '', 
        KadarAir : 0, 
        Perlakuan : '', 
        Produktivitas : '', 
        TanggalPanen : 0, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : '', 
        TxID1 : '', 
        TxID2 : '', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : true, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
    
        {id : 'benih2', 
        BenihID : 'benih2', 
        ManggaID : '', 
        NamaPengirim : '', 
        NamaPenerima : '', 
        KuantitasBenihKg : 15, 
        HargaBenihKg : 0, 
        HargaBenihTotal : 0, 
        KuantitasManggaKg : 0, 
        HargaManggaKg : 0, 
        HargaManggaTotal : 0, 
        TanggalTransaksi : 1648757753, 
        VarietasBenih : 'Benih B', 
        UmurBenih : 6, 
        Pupuk : '', 
        TanggalTanam : 0, 
        LokasiLahan : '', 
        Ukuran : '', 
        Pestisida : '', 
        KadarAir : 0, 
        Perlakuan : '', 
        Produktivitas : '', 
        TanggalPanen : 0, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : '', 
        TxID1 : '', 
        TxID2 : '', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : true, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},     
        
        {id : 'trxPenangkarkePetani1', 
        BenihID : 'benih1', 
        ManggaID : '', 
        NamaPengirim : 'penangkarAgus', 
        NamaPenerima : 'pakPetaniA', 
        KuantitasBenihKg : 5, 
        HargaBenihKg : 10000, 
        HargaBenihTotal : 50000, 
        KuantitasManggaKg : 0, 
        HargaManggaKg : 0, 
        HargaManggaTotal : 0, 
        TanggalTransaksi : 1648757753, 
        VarietasBenih : 'Benih AA', 
        UmurBenih : 3, 
        Pupuk : '', 
        TanggalTanam : 0, 
        LokasiLahan : '', 
        Ukuran : '', 
        Pestisida : '', 
        KadarAir : 0, 
        Perlakuan : '', 
        Produktivitas : '', 
        TanggalPanen : 0, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Transfer via Bank', 'Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : '', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},

        {id : 'trxPenangkarkePetani2', 
        BenihID : 'benih2', 
        ManggaID : '', 
        NamaPengirim : 'penangkarAgus', 
        NamaPenerima : 'pakPetaniB', 
        KuantitasBenihKg : 7, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 63000, 
        KuantitasManggaKg : 0, 
        HargaManggaKg : 0, 
        HargaManggaTotal : 0, 
        TanggalTransaksi : 1641967200, 
        VarietasBenih : 'Benih AB', 
        UmurBenih : 3, 
        Pupuk : '', 
        TanggalTanam : 0, 
        LokasiLahan : '', 
        Ukuran : '', 
        Pestisida : '', 
        KadarAir : 0, 
        Perlakuan : '', 
        Produktivitas : '', 
        TanggalPanen : 0, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani2', 
        TxID2 : '', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : true, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},

        {id : 'trxPenangkarkePetani3', 
        BenihID : 'benih3', 
        ManggaID : '', 
        NamaPengirim : 'penangkarAgus', 
        NamaPenerima : 'pakPetaniC', 
        KuantitasBenihKg : 14, 
        HargaBenihKg : 5000, 
        HargaBenihTotal : 70000, 
        KuantitasManggaKg : 0, 
        HargaManggaKg : 0, 
        HargaManggaTotal : 0, 
        TanggalTransaksi : 1645668000, 
        VarietasBenih : 'Benih ABC', 
        UmurBenih : 6, 
        Pupuk : '', 
        TanggalTanam : 0, 
        LokasiLahan : '', 
        Ukuran : '', 
        Pestisida : '', 
        KadarAir : 0, 
        Perlakuan : '', 
        Produktivitas : '', 
        TanggalPanen : 0, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung', 'Transfer via Bank'], 
        TxID1 : 'trxPenangkarkePetani3', 
        TxID2 : '', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : true, 
        RejectReason : 'Harga terlalu mahal'},
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
    const createBenih = () => {        
        const newData = {
            fcn : "RegistrasiBenih",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggasatu_cc",
            channelName: "channel1",
            args: {
                VarietasBenih : inputTrx.VarietasBenih,
                KuantitasBenihKg : parseInt(inputTrx.KuantitasBenihKg),
                UmurBenih : parseInt(inputTrx.UmurBenih),
                TanggalTransaksi : new Date().getTime()
            }
        }
        console.log(newData)

        if(currentIndex === -1){
            setAset([...aset, {
                VarietasBenih : inputTrx.VarietasBenih,
                KuantitasBenihKg : parseInt(inputTrx.KuantitasBenihKg),
                UmurBenih : parseInt(inputTrx.UmurBenih),
                TanggalTransaksi : new Date().getTime()
            }])
            history.push('/aset')
            setInputTrx({
                VarietasBenih :'', 
                KuantitasBenihKg : '',
                UmurBenih : ''
            })
        }
    }

    const addQtyBenih = () => {
        const newData = {
            fcn : "AddKuantitasBenihByID",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggasatu_cc",
            channelName: "channel1",
            args: {
                KuantitasBenihKg : parseInt(inputTrx.KuantitasBenihKg)
            }
          }
        
          let newQty = aset
          if(currentIndex === -1){
            newQty = [...aset, {
              KuantitasBenihKg : newData.args.KuantitasBenihKg
            }]
          }
          else {
            if(newData.args.KuantitasBenihKg <= newQty[currentIndex].KuantitasBenihKg) alert("Input tidak boleh lebih kecil dari kuantitas sekarang")
            else newQty[currentIndex].KuantitasBenihKg = newData.args.KuantitasBenihKg
          }
    }
    //======================== END ASET BENIH ========================//

    
    //======================== START TRANSAKSI PENANGKAR ========================//
    const [trxPenangkar, setTrxPenangkar] = useState([])
    const [checked, setChecked] = useState([])

    const createTrxPenangkar = () => {
        let newTrx = aset
        const newData = {
            fcn : "CreateTrxManggaByPenangkar",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggasatu_cc",
            channelName: "channel1",
            args: {
                NamaPengirim : Cookies.get('username'),
                KuantitasBenihKg : inputTrx.KuantitasBenihKg, 
                UmurBenih : inputTrx.UmurBenih, 
                UmurPanen : inputTrx.UmurPanen, 
                HargaBenihKg : inputTrx.HargaBenihKg, 
                NamaPenerima : inputTrx.NamaPenerima,
                CaraPembayaran : inputTrx.CaraPembayaran,
                isAsset : false,
            }
        }
        newTrx[currentIndex] = newData.args
        console.log(newData)
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
    //======================== END TRANSAKSI PENANGKAR ========================//


    //======================== START TRANSAKSI PETANI ========================//
    const createTrxPetani = () => {
        if(currentIndex === -1){
            const newData = {
                fcn : "CreateTrxManggaByPetani",
                peers: [
                    "peer0.penangkar.example.com",
                    "peer0.petani.example.com",
                    "peer0.pengumpul.example.com",
                    "peer0.pedagang.example.com"
                ],
                chaincodeName: "manggasatu_cc",
                channelName: "channel1",
                args: setAset([...aset, {
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
            }
            console.log(newData)
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
                fcn : "CreateTrxManggaByPengumpul",
                peers: [
                    "peer0.penangkar.example.com",
                    "peer0.petani.example.com",
                    "peer0.pengumpul.example.com",
                    "peer0.pedagang.example.com"
                ],
                chaincodeName: "manggasatu_cc",
                channelName: "channel1",
                args: [{
                    KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                    TeknikSorting : inputTrx.TeknikSorting,
                    HargaManggaKg : inputTrx.HargaManggaKg,
                    MetodePengemasan : inputTrx.MetodePengemasan,
                    Pengangkutan : inputTrx.Pengangkutan,
                    NamaPenerima : inputTrx.NamaPenerima,
                    CaraPembayaran : inputTrx.CaraPembayaran,
                }]
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
                fcn : "CreateTrxManggaByPedagang",
                peers: [
                    "peer0.penangkar.example.com",
                    "peer0.petani.example.com",
                    "peer0.pengumpul.example.com",
                    "peer0.pedagang.example.com"
                ],
                chaincodeName: "manggasatu_cc",
                channelName: "channel1",
                args: [{
                    KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                    TeknikSorting : inputTrx.TeknikSorting,
                    HargaManggaKg : inputTrx.HargaManggaKg,
                    MetodePengemasan : inputTrx.MetodePengemasan,
                    Pengangkutan : inputTrx.Pengangkutan,
                    CaraPembayaran : inputTrx.CaraPembayaran,
                }]
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


    //======================== START CONFIRM/REJECT TRANSAKSI ========================//
    const rejectTrx = () => {
        if(currentIndex === -1){
            setAset([...aset, {
                fcn: "RejectTrxByID",
                peers: [
                    "peer0.penangkar.example.com",
                    "peer0.petani.example.com",
                    "peer0.pengumpul.example.com",
                    "peer0.pedagang.example.com"
                ],
                chaincodeName: "manggasatu_cc",
                channelName: "channel1",
                args: [
                    "idAset/Mangga",
                    "idTransaksi",
                    2.71,
                    inputTrx.RejectReason
                ]
            }])
            setInputTrx({
                RejectReason : ''
            })
        }
    }

    const confirmTrx = () => {
        if(currentIndex === -1){
            setAset([...aset, {
                fcn: "ConfirmTrxByID",
                peers: [
                    "peer0.penangkar.example.com",
                    "peer0.petani.example.com",
                    "peer0.pengumpul.example.com",
                    "peer0.pedagang.example.com"
                ],
                chaincodeName: "manggasatu_cc",
                channelName: "channel1",
                args: [
                    "idTransaksi"
                ]
            }])
        }
        console.log(aset)
    }
    //======================== END CONFIRM/REJECT TRANSAKSI ========================//

    return(
       <AsetContext.Provider value={{ 
           aset, setAset, numberFormat, formatDate, sortData, createBenih, addQtyBenih,
           qtyBenih, setQtyBenih, currentIndex, setCurrentIndex, inputTrx, setInputTrx, 
           trxPenangkar, setTrxPenangkar, createTrxPenangkar, checked, setChecked, createTrxPetani,
           createTrxPengumpul,  createTrxPedagang, rejectTrx, confirmTrx, showData,
           selectedValue, setSelectedValue
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}
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
        //aset penangkar
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
        TanggalTransaksi : 1648757753, 
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
        TanggalTransaksi : 1648054793, 
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
        
        //trx penangkar -> petani
        {id : 'trxPenangkarkePetani1', 
        BenihID : 'benih1', 
        ManggaID : '', 
        NamaPengirim : 'penangkarAgus', 
        NamaPenerima : 'petani1', 
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
        NamaPenerima : 'petani1', 
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
        NamaPenerima : 'petani1', 
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

        //aset petani
        {id : 'trxPenangkarkePetani2', 
        BenihID : 'benih2', 
        ManggaID : '', 
        NamaPengirim : 'penangkarAgus', 
        NamaPenerima : 'petani1', 
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
        IsAsset : true, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
        //data sudah tanam benih
        {id : 'asetTanamBenih1', 
        BenihID : 'benih3', 
        ManggaID : 'asetTanamBenih1', 
        NamaPengirim : 'petani1', 
        NamaPenerima : '', 
        KuantitasBenihKg : 5, 
        HargaBenihKg : 10000, 
        HargaBenihTotal : 50000, 
        KuantitasManggaKg : 0, 
        HargaManggaKg : 0, 
        HargaManggaTotal : 0, 
        TanggalTransaksi : 1657589335, 
        VarietasBenih : 'Benih AA', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk Kompos', 
        TanggalTanam : 1657589210, 
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
        CaraPembayaran : [], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : '', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : true, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
        //data sudah panen
        {id : 'asetTanamBenih2', 
        BenihID : 'benih4', 
        ManggaID : 'asetTanamBenih2', 
        NamaPengirim : 'petani1', 
        NamaPenerima : '', 
        KuantitasBenihKg : 7, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 63000, 
        KuantitasManggaKg : 10, 
        HargaManggaKg : 0, 
        HargaManggaTotal : 0, 
        TanggalTransaksi : 1641967200, 
        VarietasBenih : 'Benih ABCC', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1657589200, 
        LokasiLahan : '', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1657589335, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : [], 
        TxID1 : 'trxPenangkarkePetani2', 
        TxID2 : '', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : true, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},

        // trx petani -> pengumpul
        {id : 'trxPetanikePengumpul1', 
        BenihID : 'benih3', 
        ManggaID : 'asetTanamBenih1', 
        NamaPengirim : 'petani1', 
        NamaPenerima : 'pengumpul1', 
        KuantitasBenihKg : 14, 
        HargaBenihKg : 5000, 
        HargaBenihTotal : 70000, 
        KuantitasManggaKg : 10, 
        HargaManggaKg : 10000, 
        HargaManggaTotal : 100000, 
        TanggalTransaksi : 1657589335, 
        VarietasBenih : 'Benih ABCD', 
        UmurBenih : 6, 
        Pupuk : 'Pupuk ABC', 
        TanggalTanam : 1647589335, 
        LokasiLahan : 'Bogor', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1657589335, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung', 'Transfer via Bank'], 
        TxID1 : 'trxPenangkarkePetani3', 
        TxID2 : 'trxPetanikePengumpul1', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
    
        {id : 'trxPetanikePengumpul3', 
        BenihID : 'benih2', 
        ManggaID : 'asetTanamBenih2', 
        NamaPengirim : 'petani1', 
        NamaPenerima : 'pengumpul1', 
        KuantitasBenihKg : 7, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 63000, 
        KuantitasManggaKg : 10, 
        HargaManggaKg : 15000, 
        HargaManggaTotal : 150000, 
        TanggalTransaksi : 1647585225, 
        VarietasBenih : 'Benih AB', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1647580225, 
        LokasiLahan : 'Bogor', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1647585335, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : 'trxPetanikePengumpul3', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : true, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
    
        {id : 'trxPetanikePengumpul2', 
        BenihID : 'benih4', 
        ManggaID : 'asetTanamBenih2', 
        NamaPengirim : 'petani1', 
        NamaPenerima : 'pengumpul123', 
        KuantitasBenihKg : 7, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 63000, 
        KuantitasManggaKg : 10, 
        HargaManggaKg : 15000, 
        HargaManggaTotal : 150000, 
        TanggalTransaksi : 1651967400, 
        VarietasBenih : 'Benih AB', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1657589200, 
        LokasiLahan : 'Bogor', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1657589335, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani2', 
        TxID2 : 'trxPetanikePengumpul2', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : true, 
        RejectReason : 'Kuantitas Kurang'},

        //aset pengumpul
        {id : 'trxPetanikePengumpul3', 
        BenihID : 'benih2', 
        ManggaID : 'asetTanamBenih2', 
        NamaPengirim : 'petani1', 
        NamaPenerima : 'pengumpul1', 
        KuantitasBenihKg : 7, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 63000, 
        KuantitasManggaKg : 10, 
        HargaManggaKg : 15000, 
        HargaManggaTotal : 150000, 
        TanggalTransaksi : 1647585225, 
        VarietasBenih : 'Benih AB', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1647580225, 
        LokasiLahan : 'Bandung', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1647585335, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : 'trxPetanikePengumpul3', 
        TxID3 : '', 
        TxID4 : '', 
        IsAsset : true, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
        
        //trx pengumpul -> pedagang
        {id : 'trxPengumpulkePedagang1', 
        BenihID : 'benih2', 
        ManggaID : 'asetTanamBenih2', 
        NamaPengirim : 'pengumpul1', 
        NamaPenerima : 'pedagang1', 
        KuantitasBenihKg : 7, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 63000, 
        KuantitasManggaKg : 10, 
        HargaManggaKg : 15000, 
        HargaManggaTotal : 150000, 
        TanggalTransaksi : 1647585225, 
        VarietasBenih : 'Benih AB Pending', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1647580225, 
        LokasiLahan : '', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1647585335, 
        TanggalMasuk : 0, 
        TeknikSorting : 'AAA', 
        MetodePengemasan : 'BBB', 
        Pengangkutan : 'CCCC', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : 'trxPetanikePengumpul3', 
        TxID3 : 'trxPengumpulkePedagang1', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
        
        {id : 'trxPengumpulkePedagang2', 
        BenihID : 'benih7', 
        ManggaID : 'asetTanamBenih9', 
        NamaPengirim : 'pengumpul1', 
        NamaPenerima : 'pedagang1', 
        KuantitasBenihKg : 10, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 90000, 
        KuantitasManggaKg : 12, 
        HargaManggaKg : 12000, 
        HargaManggaTotal : 144000, 
        TanggalTransaksi : 1677985325, 
        VarietasBenih : 'Benih AB Terima', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1647580225, 
        LokasiLahan : 'Bandung', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1647585335, 
        TanggalMasuk : 0, 
        TeknikSorting : 'AAA', 
        MetodePengemasan : 'BBB', 
        Pengangkutan : 'CCCC', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : 'trxPetanikePengumpul2', 
        TxID3 : 'trxPengumpulkePedagang2', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : true, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
    
        {id : 'trxPengumpulkePedagang3', 
        BenihID : 'benih2', 
        ManggaID : 'asetTanamBenih2', 
        NamaPengirim : 'pengumpul1', 
        NamaPenerima : 'pedagang1', 
        KuantitasBenihKg : 5, 
        HargaBenihKg : 1000, 
        HargaBenihTotal : 5000, 
        KuantitasManggaKg : 10, 
        HargaManggaKg : 10000, 
        HargaManggaTotal : 100000, 
        TanggalTransaksi : 1667589525, 
        VarietasBenih : 'Benih AB Tolak', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1647580225, 
        LokasiLahan : 'Bandung', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1647585335, 
        TanggalMasuk : 0, 
        TeknikSorting : 'AAA', 
        MetodePengemasan : 'BBB', 
        Pengangkutan : 'CCCC', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : 'trxPetanikePengumpul1', 
        TxID3 : 'trxPengumpulkePedagang3', 
        TxID4 : '', 
        IsAsset : false, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : true, 
        RejectReason : 'Harga terlalu murah'},

        //aset pedagang
        {id : 'trxPengumpulkePedagang2', 
        BenihID : 'benih7', 
        ManggaID : 'asetTanamBenih9', 
        NamaPengirim : 'pengumpul1', 
        NamaPenerima : 'pedagang1', 
        KuantitasBenihKg : 10, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 90000, 
        KuantitasManggaKg : 12, 
        HargaManggaKg : 12000, 
        HargaManggaTotal : 144000, 
        TanggalTransaksi : 1677985325, 
        VarietasBenih : 'Benih AB Terima', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1647580225, 
        LokasiLahan : 'Bandung', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1647585335, 
        TanggalMasuk : 0, 
        TeknikSorting : '', 
        MetodePengemasan : '', 
        Pengangkutan : '', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : 'trxPetanikePengumpul2', 
        TxID3 : 'trxPengumpulkePedagang2',
        TxID4 : '', 
        IsAsset : true, 
        IsConfirmed : false, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},

        //trx pedagang
        {id : 'trxPedagang1', 
        BenihID : 'benih7', 
        ManggaID : 'asetTanamBenih7', 
        NamaPengirim : 'pedagang1', 
        NamaPenerima : '-', 
        KuantitasBenihKg : 10, 
        HargaBenihKg : 9000, 
        HargaBenihTotal : 90000, 
        KuantitasManggaKg : 12, 
        HargaManggaKg : 12000, 
        HargaManggaTotal : 144000, 
        TanggalTransaksi : 1677985325, 
        VarietasBenih : 'Benih ABC', 
        UmurBenih : 3, 
        Pupuk : 'Pupuk AA', 
        TanggalTanam : 1647580225, 
        LokasiLahan : 'Bandung', 
        Ukuran : 'Besar', 
        Pestisida : 'Lorem ipsum', 
        KadarAir : 90, 
        Perlakuan : 'Shading net', 
        Produktivitas : 'lorem ipsum', 
        TanggalPanen : 1647585335, 
        TanggalMasuk : 0, 
        TeknikSorting : 'AAA', 
        MetodePengemasan : 'BBB', 
        Pengangkutan : 'CCCC', 
        Pembeli : '', 
        CaraPembayaran : ['Bayar Langsung'], 
        TxID1 : 'trxPenangkarkePetani1', 
        TxID2 : 'trxPetanikePengumpul2', 
        TxID3 : 'trxPengumpulkePedagang2', 
        TxID4 : 'trxPedagang1', 
        IsAsset : false, 
        IsConfirmed : true, 
        IsEmpty : false, 
        IsRejected : false, 
        RejectReason : ''},
    ])
    
    const dataAsetPenangkar = aset.filter(asets => asets.IsAsset === true && asets.TxID1 === '')

    const dataAsetPetani = aset.filter(data => 
        // Data belum tanam benih
        (data.NamaPenerima === Cookies.get('username') && data.IsAsset === true) || //data.IsConfirmed === true
        // Data sudah tanam benih atau belum panen && sudah panen
        (data.NamaPengirim === Cookies.get('username') && data.Pupuk !== '' && data.IsAsset === true)
    )

    const dataAsetPengumpul = aset.filter(data => data.NamaPenerima === Cookies.get('username') && data.IsAsset === true)
    
    // Data untuk list aset yang akan di Transaksi
    const dataByRole = () => {
        const role = Cookies.get('role')
        if(role == 1) var data = dataAsetPenangkar
        else if (role == 2) var data = aset.filter(asets => asets.TanggalPanen !== 0 && asets.IsAsset === true)
        else if (role == 3) var data = dataAsetPengumpul
        else if (role == 4) var data = dataAsetPengumpul
        return data
    }

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
    
    const [ getId, setGetId ] = useState('')

    var elementPos = (id) => {
        const indexArray = aset.map(function(x) {return x.id}).indexOf(id)
        return indexArray
    }

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
            name: Cookies.get('username'),
            role: Cookies.get('role'),
            args: [{
                VarietasBenih : inputTrx.VarietasBenih,
                KuantitasBenihKg : parseInt(inputTrx.KuantitasBenihKg),
                UmurBenih : parseInt(inputTrx.UmurBenih),
                TanggalTransaksi : new Date().getTime()
            }]
        }
        console.log(newData)

        if(currentIndex === -1){
            setAset([...aset, {
                VarietasBenih : newData.args[0].VarietasBenih,
                KuantitasBenihKg :newData.args[0].KuantitasBenihKg,
                UmurBenih : newData.args[0].UmurBenih,
                TanggalTransaksi : new Date().getTime()
            }])
            history.push('/aset')
            setInputTrx({
                VarietasBenih :'', 
                KuantitasBenihKg : '',
                UmurBenih : ''
            })
        }
        console.log(aset)
    }

    const addQtyBenih = (id) => {
        const idBenih = id
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
            name: Cookies.get('username'),
            role: Cookies.get('role'),
            args: [
                parseInt(inputTrx.KuantitasBenihKg),
                idBenih           
            ]
          }
          console.log(newData)
          let newQty = aset
          if(currentIndex === -1){
            newQty = [...aset, {
              KuantitasBenihKg : newData.args[0]
            }]
          }
          else {
            if(newData.args[0] <= newQty[currentIndex].KuantitasBenihKg) alert("Input tidak boleh lebih kecil dari kuantitas sekarang")
            else newQty[currentIndex].KuantitasBenihKg = newData.args[0]
          }
    }
    //======================== END ASET BENIH ========================//

    
    //======================== START TRANSAKSI PENANGKAR ========================//
    const [trxPenangkar, setTrxPenangkar] = useState([])
    const [checked, setChecked] = useState([])

    const createTrxPenangkar = (idBenih) => {
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
            name: Cookies.get('username'),
            role: Cookies.get('role'),
            args: [{
                NamaPengirim : Cookies.get('username'),
                KuantitasBenihKg : inputTrx.KuantitasBenihKg, 
                UmurBenih : inputTrx.UmurBenih,  
                HargaBenihKg : inputTrx.HargaBenihKg, 
                NamaPenerima : inputTrx.NamaPenerima,
                CaraPembayaran : inputTrx.CaraPembayaran,
                }, idBenih
            ]
        }
        newTrx[currentIndex] = newData.args
        console.log(newData)
        //history.push('/transaksi-keluar')
        setInputTrx({
            KuantitasBenihKg : '', 
            UmurBenih : '',
            HargaBenihKg : '', 
            isAsset : false, 
            NamaPengirim : '', 
            NamaPenerima : '', 
            CaraPembayaran : []
        })
        
    }
    //======================== END TRANSAKSI PENANGKAR ========================//


    //======================== START TRANSAKSI PETANI ========================//
    const createTrxPetani = (manggaid) => {
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
            name: Cookies.get('username'),
            role: Cookies.get('role'),
            args: [{
                NamaPengirim : Cookies.get('username'),
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                hargaManggaPerKg : inputTrx.hargaManggaPerKg,
                NamaPenerima : inputTrx.NamaPenerima,
                CaraPembayaran : inputTrx.CaraPembayaran
                }, manggaid
            ]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                NamaPengirim : Cookies.get('username'),
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                HargaManggaPerKg : inputTrx.HargaManggaPerKg,
                NamaPenerima : inputTrx.NamaPenerima,
                CaraPembayaran : inputTrx.CaraPembayaran
            }])
        }
        else {
            newQty[currentIndex].NamaPengirim = newData.args[0].NamaPengirim
            newQty[currentIndex].KuantitasManggaKg = newData.args[0].KuantitasManggaKg
            newQty[currentIndex].HargaManggaPerKg = newData.args[0].HargaManggaPerKg
            newQty[currentIndex].NamaPenerima = newData.args[0].NamaPenerima
            newQty[currentIndex].CaraPembayaran = newData.args[0].CaraPembayaran
        }
        //history.push('/transaksi-keluar')
        setInputTrx({
            NamaPengirim : '',
            KuantitasManggaKg : '',
            HargaManggaPerKg : '',
            NamaPenerima : '',
            CaraPembayaran : ''
        })
        
    }
    //======================== END TRANSAKSI PETANI ========================//

    
    //======================== START TANAM BENIH PETANI ========================//
    const tanamBenihPetani = (txid1) =>{
        const newData = {
            fcn : "TanamBenih",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggasatu_cc",
            channelName: "channel1",
            name: Cookies.get('username'),
            role: Cookies.get('role'),
            args: [
                {
                    Pupuk : inputTrx.Pupuk, 
                    LokasiLahan : inputTrx.LokasiLahan,
                }, txid1
            ]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                Pupuk : inputTrx.Pupuk, 
                LokasiLahan : inputTrx.LokasiLahan,
            }])
        }
        else {
            newQty[currentIndex].Pupuk = newData.args[0].Pupuk
            newQty[currentIndex].LokasiLahan = newData.args[0].LokasiLahan
        }
        setInputTrx({
            Pupuk : '', 
            LokasiLahan : '',
        })
        //history.push('/detail-transaksi')
        console.log(aset)
    }
    //======================== END TANAM BENIH PETANI ========================//


    //======================== START PANEN PETANI ========================//
    const panenPetani = (manggaid) => {
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
            args: [{
                Ukuran : inputTrx.Ukuran, 
                Pestisida : inputTrx.Pestisida, 
                KadarAir : inputTrx.KadarAir, 
                Perlakuan : inputTrx.Perlakuan, 
                Produktivitas : inputTrx.Produktivitas, 
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                TanggalTanam : new Date().getTime(), 
            }, manggaid]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                Ukuran : inputTrx.Ukuran, 
                Pestisida : inputTrx.Pestisida, 
                KadarAir : inputTrx.KadarAir, 
                Perlakuan : inputTrx.Perlakuan, 
                Produktivitas : inputTrx.Produktivitas, 
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                TanggalTanam : new Date().getTime(),
            }])
        }
        else {
            newQty[currentIndex].Ukuran = newData.args[0].Ukuran
            newQty[currentIndex].Pestisida = newData.args[0].Pestisida
            newQty[currentIndex].KadarAir = newData.args[0].KadarAir
            newQty[currentIndex].Perlakuan = newData.args[0].Perlakuan
            newQty[currentIndex].Produktivitas = newData.args[0].Produktivitas
            newQty[currentIndex].KuantitasManggaKg = newData.args[0].KuantitasManggaKg
            newQty[currentIndex].TanggalTanam = newData.args[0].TanggalTanam
        }
        setInputTrx({
            Ukuran : '', 
            Pestisida : '', 
            KadarAir : '', 
            Perlakuan : '', 
            Produktivitas : '', 
            KuantitasManggaKg : '',
            TanggalTanam : '' 
        })
        history.push('/detail-transaksi')
        console.log(aset)
    }
    //======================== END PANEN PETANI ========================//


    //======================== START TRANSAKSI PENGUMPUL ========================//
    const createTrxPengumpul = (txid2) => {
        const newData ={
                fcn : "CreateTrxManggaByPengumpul",
                peers: [
                    "peer0.penangkar.example.com",
                    "peer0.petani.example.com",
                    "peer0.pengumpul.example.com",
                    "peer0.pedagang.example.com"
                ],
                chaincodeName: "manggasatu_cc",
                channelName: "channel1",
                name: Cookies.get('username'),
                role: Cookies.get('role'),
                args: [{
                    KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                    TeknikSorting : inputTrx.TeknikSorting,
                    HargaManggaKg : inputTrx.HargaManggaKg,
                    MetodePengemasan : inputTrx.MetodePengemasan,
                    Pengangkutan : inputTrx.Pengangkutan,
                    NamaPenerima : inputTrx.NamaPenerima,
                    CaraPembayaran : inputTrx.CaraPembayaran,
                }, txid2]
            }
            console.log(newData)
            const newQty = aset
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
            }
            else {
                newQty[currentIndex].KuantitasManggaKg = newData.args[0].KuantitasManggaKg
                newQty[currentIndex].TeknikSorting = newData.args[0].TeknikSorting
                newQty[currentIndex].HargaManggaKg = newData.args[0].HargaManggaKg
                newQty[currentIndex].MetodePengemasan = newData.args[0].MetodePengemasan
                newQty[currentIndex].Pengangkutan = newData.args[0].Pengangkutan
                newQty[currentIndex].NamaPenerima = newData.args[0].NamaPenerima
                newQty[currentIndex].CaraPembayaran = newData.args[0].CaraPembayaran
            }
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
    //======================== END TRANSAKSI PENGUMPUL ========================//

    //======================== START TRANSAKSI PEDAGANG ========================//
    const createTrxPedagang = (txid3) => {
        const newData = {
            fcn : "CreateTrxManggaByPedagang",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggasatu_cc",
            channelName: "channel1",
            name: Cookies.get('username'),
            role: Cookies.get('role'),
            args: [{
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                TeknikSorting : inputTrx.TeknikSorting,
                HargaManggaKg : inputTrx.HargaManggaKg,
                MetodePengemasan : inputTrx.MetodePengemasan,
                Pengangkutan : inputTrx.Pengangkutan,
                CaraPembayaran : inputTrx.CaraPembayaran,
            }, txid3]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                KuantitasManggaKg : inputTrx.KuantitasManggaKg,
                TeknikSorting : inputTrx.TeknikSorting,
                HargaManggaKg : inputTrx.HargaManggaKg,
                MetodePengemasan : inputTrx.MetodePengemasan,
                Pengangkutan : inputTrx.Pengangkutan,
                CaraPembayaran : inputTrx.CaraPembayaran,
            }])
        }
        else {
            newQty[currentIndex].KuantitasManggaKg = newData.args[0].KuantitasManggaKg
            newQty[currentIndex].TeknikSorting = newData.args[0].TeknikSorting
            newQty[currentIndex].HargaManggaKg = newData.args[0].HargaManggaKg
            newQty[currentIndex].MetodePengemasan = newData.args[0].MetodePengemasan
            newQty[currentIndex].Pengangkutan = newData.args[0].Pengangkutan
            newQty[currentIndex].CaraPembayaran = newData.args[0].CaraPembayaran
        }
        //history.push('/transaksi-keluar')
        setInputTrx({
            KuantitasManggaKg : '',
            TeknikSorting : '',
            HargaManggaKg : '',
            MetodePengemasan : '',
            Pengangkutan : '',
            CaraPembayaran : []
        })
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
                name: Cookies.get('username'),
                role: Cookies.get('role'),
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
                name: Cookies.get('username'),
                role: Cookies.get('role'),
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
           createTrxPengumpul,  createTrxPedagang, rejectTrx, confirmTrx, showData, tanamBenihPetani,
           selectedValue, setSelectedValue, getId, setGetId, dataAsetPenangkar, dataAsetPetani, dataByRole, 
           elementPos, panenPetani, dataAsetPengumpul
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}
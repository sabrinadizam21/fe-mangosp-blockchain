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

    const sortData = (data) => data.sort((a,b) => (a.tanggalTransaksi < b.tanggalTransaksi) ? 1 : -1)
    
    function numberFormat(number){
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    }

    const [selectedValue, setSelectedValue] = useState('ALL')

    const showData = (datas, trxType) => {
        if(trxType === 'out'){
            datas = datas.filter(data => data.isAsset === false && data.namaPengirim === Cookies.get('username'))
        } else if (trxType === 'in') {
            datas = datas.filter(data => data.isAsset === false && data.namaPenerima === Cookies.get('username'))
        }

        if(selectedValue === 'ALL')
            return datas
        else if(selectedValue === 'SUCCESS')
            return datas.filter(data => data.isConfirmed === true)
        else if(selectedValue === 'FAILED')
            return datas.filter(data => data.isRejected === true)
        else if(selectedValue === 'PENDING')
            return datas.filter(data => data.isConfirmed === false && data.isRejected === false)
    }
    
    const [aset,setAset] = useState([
        //aset penangkar
        {id : 'benih1', 
        benihID : 'benih1', 
        manggaID : '', 
        namaPengirim : '', 
        namaPenerima : '', 
        kuantitasBenihKg : 10, 
        hargaBenihPerKg : 0, 
        hargaBenihTotal : 0, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 0, 
        varietasBenih : 'Benih ABC', 
        umurBenih : 2, 
        pupuk : '', 
        tanggalTanam : 1648757753, 
        lokasiLahan : '', 
        ukuran : '', 
        pestisida : '', 
        kadarAir : 0, 
        perlakuan : '', 
        produktivitas : '', 
        tanggalPanen : 0, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : '', 
        txID1 : '', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
    
        {id : 'benih2', 
        benihID : 'benih2', 
        manggaID : '', 
        namaPengirim : '', 
        namaPenerima : '', 
        kuantitasBenihKg : 15, 
        hargaBenihPerKg : 0, 
        hargaBenihTotal : 0, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 0, 
        varietasBenih : 'Benih B', 
        umurBenih : 6, 
        pupuk : '', 
        tanggalTanam : 1648054793, 
        lokasiLahan : '', 
        ukuran : '', 
        pestisida : '', 
        kadarAir : 0, 
        perlakuan : '', 
        produktivitas : '', 
        tanggalPanen : 0, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : '', 
        txID1 : '', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},     
        
        //trx penangkar -> petani
        {id : 'trxPenangkarkePetani1', 
        benihID : 'benih1', 
        manggaID : '', 
        namaPengirim : 'penangkarAgus', 
        namaPenerima : 'petani1', 
        kuantitasBenihKg : 5, 
        hargaBenihPerKg : 10000, 
        hargaBenihTotal : 50000, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1648757753, 
        varietasBenih : 'Benih AA', 
        umurBenih : 3, 
        pupuk : '', 
        tanggalTanam : 0, 
        lokasiLahan : '', 
        ukuran : '', 
        pestisida : '', 
        kadarAir : 0, 
        perlakuan : '', 
        produktivitas : '', 
        tanggalPanen : 0, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Transfer via Bank', 'Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},

        {id : 'trxPenangkarkePetani2', 
        benihID : 'benih2', 
        manggaID : '', 
        namaPengirim : 'penangkarAgus', 
        namaPenerima : 'petani1', 
        kuantitasBenihKg : 7, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 63000, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1641967200, 
        varietasBenih : 'Benih AB', 
        umurBenih : 3, 
        pupuk : '', 
        tanggalTanam : 0, 
        lokasiLahan : '', 
        ukuran : '', 
        pestisida : '', 
        kadarAir : 0, 
        perlakuan : '', 
        produktivitas : '', 
        tanggalPanen : 0, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : true, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},

        {id : 'trxPenangkarkePetani3', 
        benihID : 'benih3', 
        manggaID : '', 
        namaPengirim : 'penangkarAgus', 
        namaPenerima : 'petani1', 
        kuantitasBenihKg : 14, 
        hargaBenihPerKg : 5000, 
        hargaBenihTotal : 70000, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1645668000, 
        varietasBenih : 'Benih ABC', 
        umurBenih : 6, 
        pupuk : '', 
        tanggalTanam : 0, 
        lokasiLahan : '', 
        ukuran : '', 
        pestisida : '', 
        kadarAir : 0, 
        perlakuan : '', 
        produktivitas : '', 
        tanggalPanen : 0, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung', 'Transfer via Bank'], 
        txID1 : 'trxPenangkarkePetani3', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : true, 
        rejectReason : 'Harga terlalu mahal'},

        //aset petani
        {id : 'trxPenangkarkePetani2', 
        benihID : 'benih2', 
        manggaID : '', 
        namaPengirim : 'penangkarAgus', 
        namaPenerima : 'petani1', 
        kuantitasBenihKg : 7, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 63000, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1641967200, 
        varietasBenih : 'Benih AB', 
        umurBenih : 3, 
        pupuk : '', 
        tanggalTanam : 0, 
        lokasiLahan : '', 
        ukuran : '', 
        pestisida : '', 
        kadarAir : 0, 
        perlakuan : '', 
        produktivitas : '', 
        tanggalPanen : 0, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
        //data sudah tanam benih
        {id : 'asetTanamBenih1', 
        benihID : 'benih3', 
        manggaID : 'asetTanamBenih1', 
        namaPengirim : 'petani1', 
        namaPenerima : '', 
        kuantitasBenihKg : 5, 
        hargaBenihPerKg : 10000, 
        hargaBenihTotal : 50000, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1657589335, 
        varietasBenih : 'Benih AA', 
        umurBenih : 3, 
        pupuk : 'pupuk Kompos', 
        tanggalTanam : 1657589210, 
        lokasiLahan : '', 
        ukuran : '', 
        pestisida : '', 
        kadarAir : 0, 
        perlakuan : '', 
        produktivitas : '', 
        tanggalPanen : 0, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : [], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
        //data sudah panen
        {id : 'asetTanamBenih2', 
        benihID : 'benih4', 
        manggaID : 'asetTanamBenih2', 
        namaPengirim : 'petani1', 
        namaPenerima : '', 
        kuantitasBenihKg : 7, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 63000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1641967200, 
        varietasBenih : 'Benih ABCC', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1657589200, 
        lokasiLahan : '', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1657589335, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : [], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},

        // trx petani -> pengumpul
        {id : 'trxPetanikePengumpul1', 
        benihID : 'benih3', 
        manggaID : 'asetTanamBenih1', 
        namaPengirim : 'petani1', 
        namaPenerima : 'pengumpul1', 
        kuantitasBenihKg : 14, 
        hargaBenihPerKg : 5000, 
        hargaBenihTotal : 70000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 10000, 
        hargaManggaTotal : 100000, 
        tanggalTransaksi : 1657589335, 
        varietasBenih : 'Benih ABCD', 
        umurBenih : 6, 
        pupuk : 'pupuk ABC', 
        tanggalTanam : 1647589335, 
        lokasiLahan : 'Bogor', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1657589335, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung', 'Transfer via Bank'], 
        txID1 : 'trxPenangkarkePetani3', 
        txID2 : 'trxPetanikePengumpul1', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
    
        {id : 'trxPetanikePengumpul3', 
        benihID : 'benih2', 
        manggaID : 'asetTanamBenih2', 
        namaPengirim : 'petani1', 
        namaPenerima : 'pengumpul1', 
        kuantitasBenihKg : 7, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 63000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 15000, 
        hargaManggaTotal : 150000, 
        tanggalTransaksi : 1647585225, 
        varietasBenih : 'Benih AB', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1647580225, 
        lokasiLahan : 'Bogor', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1647585335, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : 'trxPetanikePengumpul3', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : true, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
    
        {id : 'trxPetanikePengumpul2', 
        benihID : 'benih4', 
        manggaID : 'asetTanamBenih2', 
        namaPengirim : 'petani1', 
        namaPenerima : 'pengumpul123', 
        kuantitasBenihKg : 7, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 63000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 15000, 
        hargaManggaTotal : 150000, 
        tanggalTransaksi : 1651967400, 
        varietasBenih : 'Benih AB', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1657589200, 
        lokasiLahan : 'Bogor', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1657589335, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : 'trxPetanikePengumpul2', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : true, 
        rejectReason : 'Kuantitas Kurang'},

        //aset pengumpul
        {id : 'trxPetanikePengumpul3', 
        benihID : 'benih2', 
        manggaID : 'asetTanamBenih2', 
        namaPengirim : 'petani1', 
        namaPenerima : 'pengumpul1', 
        kuantitasBenihKg : 7, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 63000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 15000, 
        hargaManggaTotal : 150000, 
        tanggalTransaksi : 1647585225, 
        varietasBenih : 'Benih AB', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1647580225, 
        lokasiLahan : 'Bandung', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1647585335, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : 'trxPetanikePengumpul3', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
        
        //trx pengumpul -> pedagang
        {id : 'trxPengumpulkePedagang1', 
        benihID : 'benih2', 
        manggaID : 'asetTanamBenih2', 
        namaPengirim : 'pengumpul1', 
        namaPenerima : 'pedagang1', 
        kuantitasBenihKg : 7, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 63000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 15000, 
        hargaManggaTotal : 150000, 
        tanggalTransaksi : 1647585225, 
        varietasBenih : 'Benih AB Pending', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1647580225, 
        lokasiLahan : '', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1647585335, 
        tanggalMasuk : 0, 
        teknikSorting : 'AAA', 
        metodePengemasan : 'BBB', 
        pengangkutan : 'CCCC', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : 'trxPetanikePengumpul3', 
        txID3 : 'trxPengumpulkePedagang1', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
        
        {id : 'trxPengumpulkePedagang2', 
        benihID : 'benih7', 
        manggaID : 'asetTanamBenih9', 
        namaPengirim : 'pengumpul1', 
        namaPenerima : 'pedagang1', 
        kuantitasBenihKg : 10, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 90000, 
        kuantitasManggaKg : 12, 
        hargaManggaPerKg : 12000, 
        hargaManggaTotal : 144000, 
        tanggalTransaksi : 1677985325, 
        varietasBenih : 'Benih AB Terima', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1647580225, 
        lokasiLahan : 'Bandung', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1647585335, 
        tanggalMasuk : 0, 
        teknikSorting : 'AAA', 
        metodePengemasan : 'BBB', 
        pengangkutan : 'CCCC', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : 'trxPetanikePengumpul2', 
        txID3 : 'trxPengumpulkePedagang2', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : true, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
    
        {id : 'trxPengumpulkePedagang3', 
        benihID : 'benih2', 
        manggaID : 'asetTanamBenih2', 
        namaPengirim : 'pengumpul1', 
        namaPenerima : 'pedagang1', 
        kuantitasBenihKg : 5, 
        hargaBenihPerKg : 1000, 
        hargaBenihTotal : 5000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 10000, 
        hargaManggaTotal : 100000, 
        tanggalTransaksi : 1667589525, 
        varietasBenih : 'Benih AB Tolak', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1647580225, 
        lokasiLahan : 'Bandung', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1647585335, 
        tanggalMasuk : 0, 
        teknikSorting : 'AAA', 
        metodePengemasan : 'BBB', 
        pengangkutan : 'CCCC', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : 'trxPetanikePengumpul1', 
        txID3 : 'trxPengumpulkePedagang3', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : true, 
        rejectReason : 'Harga terlalu murah'},

        //aset pedagang
        {id : 'trxPengumpulkePedagang2', 
        benihID : 'benih7', 
        manggaID : 'asetTanamBenih9', 
        namaPengirim : 'pengumpul1', 
        namaPenerima : 'pedagang1', 
        kuantitasBenihKg : 10, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 90000, 
        kuantitasManggaKg : 12, 
        hargaManggaPerKg : 12000, 
        hargaManggaTotal : 144000, 
        tanggalTransaksi : 1677985325, 
        varietasBenih : 'Benih AB Terima', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1647580225, 
        lokasiLahan : 'Bandung', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1647585335, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : 'trxPetanikePengumpul2', 
        txID3 : 'trxPengumpulkePedagang2',
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},

        //trx pedagang
        {id : 'trxPedagang1', 
        benihID : 'benih7', 
        manggaID : 'asetTanamBenih7', 
        namaPengirim : 'pedagang1', 
        namaPenerima : '-', 
        kuantitasBenihKg : 10, 
        hargaBenihPerKg : 9000, 
        hargaBenihTotal : 90000, 
        kuantitasManggaKg : 12, 
        hargaManggaPerKg : 12000, 
        hargaManggaTotal : 144000, 
        tanggalTransaksi : 1677985325, 
        varietasBenih : 'Benih ABC', 
        umurBenih : 3, 
        pupuk : 'pupuk AA', 
        tanggalTanam : 1647580225, 
        lokasiLahan : 'Bandung', 
        ukuran : 'Besar', 
        pestisida : 'Lorem ipsum', 
        kadarAir : 90, 
        perlakuan : 'Shading net', 
        produktivitas : 'lorem ipsum', 
        tanggalPanen : 1647585335, 
        tanggalMasuk : 0, 
        teknikSorting : 'AAA', 
        metodePengemasan : 'BBB', 
        pengangkutan : 'CCCC', 
        pembeli : '', 
        caraPembayaran : ['Bayar Langsung'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : 'trxPetanikePengumpul2', 
        txID3 : 'trxPengumpulkePedagang2', 
        txID4 : 'trxPedagang1', 
        isAsset : false, 
        isConfirmed : true, 
        isEmpty : false, 
        isRejected : false, 
        rejectReason : ''},
    ])
    
    const dataAsetPenangkar = aset.filter(asets => asets.isAsset === true && asets.txID1 === '')

    const dataAsetPetani = aset.filter(data => 
        // Data belum tanam benih
        (data.namaPenerima === Cookies.get('username') && data.isAsset === true) ||
        // Data sudah tanam benih atau belum panen && sudah panen
        (data.namaPengirim === Cookies.get('username') && data.pupuk !== '' && data.isAsset === true)
    )

    const dataAsetPengumpul = aset.filter(data => data.namaPenerima === Cookies.get('username') && data.isAsset === true)
    
    // Data untuk list aset yang akan di Transaksi
    const dataByRole = () => {
        const role = Cookies.get('role')
        if(role == 1) var data = dataAsetPenangkar
        else if (role == 2) var data = aset.filter(asets => asets.tanggalPanen !== 0 && asets.isAsset === true)
        else if (role == 3) var data = dataAsetPengumpul
        else if (role == 4) var data = dataAsetPengumpul
        return data
    }

    const [inputTrx, setInputTrx] = useState([
        {   id : '', 
            benihID : 0, 
            manggaID : '', 
            namaPengirim : '', 
            namaPenerima : '', 
            kuantitasBenihKg : '', 
            hargaBenihPerKg : '', 
            hargaBenihTotal : '', 
            kuantitasManggaKg : '', 
            hargaManggaPerKg : '', 
            hargaManggaTotal : '', 
            tanggalTransaksi : '', 
            varietasBenih : '', 
            umurBenih : '', 
            pupuk : '', 
            tanggalTanam : '', 
            lokasiLahan : '', 
            ukuran : '', 
            pestisida : '', 
            kadarAir : '', 
            perlakuan : '', 
            produktivitas : '', 
            tanggalPanen : '', 
            tanggalMasuk : '', 
            teknikSorting : '', 
            metodePengemasan : '', 
            pengangkutan : '', 
            pembeli : '', 
            caraPembayaran : '', 
            txID1 : '', 
            txID2 : '', 
            txID3 : '', 
            txID4 : '', 
            isAsset : '', 
            isConfirmed : '', 
            isEmpty : '', 
            isRejected : '', 
            rejectReason : ''}
    ])
    
    const [ getId, setGetId ] = useState('')
    const [ getIdBenih, setGetIdBenih ] = useState('')
    const [ getIdMangga, setGetIdMangga ] = useState('')
    const [ getIdTx2, setGetIdTx2 ] = useState('')
    const [ qty, setQty ] = useState('')

    var elementPos = (id) => {
        const indexArray = aset.map(function(x) {return x.id}).indexOf(id)
        return indexArray
    }

    const statusTrx = (confirm, reject) => {
        if(confirm === false && reject === false) {
            return (
                <p className="label-status color-pending">PENDING</p>
            )
        }
        else if (confirm === true){
            return (
                <p className="label-status color-success">TERIMA</p>
            )
        }
        else if (reject === true){
            return (
                <p className="label-status color-failed">TOLAK</p>
            )
        }
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
                varietasBenih : inputTrx.varietasBenih,
                kuantitasBenihKg : parseInt(inputTrx.kuantitasBenihKg),
                umurBenih : parseInt(inputTrx.umurBenih),
                tanggalTransaksi : new Date().getTime()
            }]
        }
        console.log(newData)

        if(currentIndex === -1){
            setAset([...aset, {
                varietasBenih : newData.args[0].varietasBenih,
                kuantitasBenihKg :newData.args[0].kuantitasBenihKg,
                umurBenih : newData.args[0].umurBenih,
                tanggalTransaksi : new Date().getTime()
            }])
            history.push('/aset')
            setInputTrx({
                varietasBenih :'', 
                kuantitasBenihKg : '',
                umurBenih : ''
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
                parseInt(inputTrx.kuantitasBenihKg),
                idBenih           
            ]
        }
        let newQty = aset
        if(currentIndex === -1){
        newQty = [...aset, {
            kuantitasBenihKg : newData.args[0]
        }]
        }
        else {
        if(newData.args[0] <= newQty[currentIndex].kuantitasBenihKg) 
        alert("Input tidak boleh lebih kecil dari kuantitas sekarang. Silahkan ubah kuantitas kembali.")
        else {
            console.log(newData)
            newQty[currentIndex].kuantitasBenihKg = newData.args[0]
        }
        }
        setInputTrx({
        kuantitasBenihKg : ''
        })
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
                namaPengirim : Cookies.get('username'),
                kuantitasBenihKg : inputTrx.kuantitasBenihKg, 
                umurBenih : inputTrx.umurBenih,  
                hargaBenihPerKg : inputTrx.hargaBenihPerKg, 
                namaPenerima : inputTrx.namaPenerima,
                caraPembayaran : inputTrx.caraPembayaran,
                }, idBenih
            ]
        }
        newTrx[currentIndex] = newData.args
        console.log(newData)
        //history.push('/transaksi-keluar')
        setInputTrx({
            kuantitasBenihKg : '', 
            umurBenih : '',
            hargaBenihPerKg : '', 
            isAsset : false, 
            namaPengirim : '', 
            namaPenerima : '', 
            caraPembayaran : []
        })
        
    }
    //======================== END TRANSAKSI PENANGKAR ========================//


    //======================== START TRANSAKSI PETANI ========================//
    const createTrxPetani = (manggaID) => {
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
                namaPengirim : Cookies.get('username'),
                kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                hargaManggaPerKg : inputTrx.hargaManggaPerKg,
                namaPenerima : inputTrx.namaPenerima,
                caraPembayaran : inputTrx.caraPembayaran
                }, manggaID
            ]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                namaPengirim : Cookies.get('username'),
                kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                HargaManggaPerKg : inputTrx.HargaManggaPerKg,
                namaPenerima : inputTrx.namaPenerima,
                caraPembayaran : inputTrx.caraPembayaran
            }])
        }
        else {
            newQty[currentIndex].namaPengirim = newData.args[0].namaPengirim
            newQty[currentIndex].kuantitasManggaKg = newData.args[0].kuantitasManggaKg
            newQty[currentIndex].HargaManggaPerKg = newData.args[0].HargaManggaPerKg
            newQty[currentIndex].namaPenerima = newData.args[0].namaPenerima
            newQty[currentIndex].caraPembayaran = newData.args[0].caraPembayaran
        }
        //history.push('/transaksi-keluar')
        setInputTrx({
            namaPengirim : '',
            kuantitasManggaKg : '',
            HargaManggaPerKg : '',
            namaPenerima : '',
            caraPembayaran : ''
        })
        
    }
    //======================== END TRANSAKSI PETANI ========================//

    
    //======================== START TANAM BENIH PETANI ========================//
    const tanamBenihPetani = (txID1) =>{
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
                    pupuk : inputTrx.pupuk, 
                    lokasiLahan : inputTrx.lokasiLahan,
                }, txID1
            ]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                pupuk : inputTrx.pupuk, 
                lokasiLahan : inputTrx.lokasiLahan,
            }])
        }
        else {
            newQty[currentIndex].pupuk = newData.args[0].pupuk
            newQty[currentIndex].lokasiLahan = newData.args[0].lokasiLahan
        }
        setInputTrx({
            pupuk : '', 
            lokasiLahan : '',
        })
        //history.push('/detail-transaksi')
        console.log(aset)
    }
    //======================== END TANAM BENIH PETANI ========================//


    //======================== START PANEN PETANI ========================//
    const panenPetani = (manggaID) => {
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
                ukuran : inputTrx.ukuran, 
                pestisida : inputTrx.pestisida, 
                kadarAir : inputTrx.kadarAir, 
                perlakuan : inputTrx.perlakuan, 
                produktivitas : inputTrx.produktivitas, 
                kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                tanggalTanam : new Date().getTime(), 
            }, manggaID]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                ukuran : inputTrx.ukuran, 
                pestisida : inputTrx.pestisida, 
                kadarAir : inputTrx.kadarAir, 
                perlakuan : inputTrx.perlakuan, 
                produktivitas : inputTrx.produktivitas, 
                kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                tanggalTanam : new Date().getTime(),
            }])
        }
        else {
            newQty[currentIndex].ukuran = newData.args[0].ukuran
            newQty[currentIndex].pestisida = newData.args[0].pestisida
            newQty[currentIndex].kadarAir = newData.args[0].kadarAir
            newQty[currentIndex].perlakuan = newData.args[0].perlakuan
            newQty[currentIndex].produktivitas = newData.args[0].produktivitas
            newQty[currentIndex].kuantitasManggaKg = newData.args[0].kuantitasManggaKg
            newQty[currentIndex].tanggalTanam = newData.args[0].tanggalTanam
        }
        setInputTrx({
            ukuran : '', 
            pestisida : '', 
            kadarAir : '', 
            perlakuan : '', 
            produktivitas : '', 
            kuantitasManggaKg : '',
            tanggalTanam : '' 
        })
        history.push('/detail-transaksi')
        console.log(aset)
    }
    //======================== END PANEN PETANI ========================//


    //======================== START TRANSAKSI PENGUMPUL ========================//
    const createTrxPengumpul = (txID2) => {
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
                    kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                    teknikSorting : inputTrx.teknikSorting,
                    hargaManggaPerKg : inputTrx.hargaManggaPerKg,
                    metodePengemasan : inputTrx.metodePengemasan,
                    pengangkutan : inputTrx.pengangkutan,
                    namaPenerima : inputTrx.namaPenerima,
                    caraPembayaran : inputTrx.caraPembayaran,
                }, txID2]
            }
            console.log(newData)
            const newQty = aset
            if(currentIndex === -1){
                setAset([...aset, {
                    kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                    teknikSorting : inputTrx.teknikSorting,
                    hargaManggaPerKg : inputTrx.hargaManggaPerKg,
                    metodePengemasan : inputTrx.metodePengemasan,
                    pengangkutan : inputTrx.pengangkutan,
                    namaPenerima : inputTrx.namaPenerima,
                    caraPembayaran : inputTrx.caraPembayaran,
                }])
            }
            else {
                newQty[currentIndex].kuantitasManggaKg = newData.args[0].kuantitasManggaKg
                newQty[currentIndex].teknikSorting = newData.args[0].teknikSorting
                newQty[currentIndex].hargaManggaPerKg = newData.args[0].hargaManggaPerKg
                newQty[currentIndex].metodePengemasan = newData.args[0].metodePengemasan
                newQty[currentIndex].pengangkutan = newData.args[0].pengangkutan
                newQty[currentIndex].namaPenerima = newData.args[0].namaPenerima
                newQty[currentIndex].caraPembayaran = newData.args[0].caraPembayaran
            }
            //history.push('/transaksi-keluar')
            setInputTrx({
                kuantitasManggaKg : '',
                teknikSorting : '',
                hargaManggaPerKg : '',
                metodePengemasan : '',
                pengangkutan : '',
                namaPenerima : '',
                caraPembayaran : []
            })
    }
    //======================== END TRANSAKSI PENGUMPUL ========================//

    //======================== START TRANSAKSI PEDAGANG ========================//
    const createTrxPedagang = (txID3) => {
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
                kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                teknikSorting : inputTrx.teknikSorting,
                hargaManggaPerKg : inputTrx.hargaManggaPerKg,
                metodePengemasan : inputTrx.metodePengemasan,
                pengangkutan : inputTrx.pengangkutan,
                caraPembayaran : inputTrx.caraPembayaran,
            }, txID3]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                teknikSorting : inputTrx.teknikSorting,
                hargaManggaPerKg : inputTrx.hargaManggaPerKg,
                metodePengemasan : inputTrx.metodePengemasan,
                pengangkutan : inputTrx.pengangkutan,
                caraPembayaran : inputTrx.caraPembayaran,
            }])
        }
        else {
            newQty[currentIndex].kuantitasManggaKg = newData.args[0].kuantitasManggaKg
            newQty[currentIndex].teknikSorting = newData.args[0].teknikSorting
            newQty[currentIndex].hargaManggaPerKg = newData.args[0].hargaManggaPerKg
            newQty[currentIndex].metodePengemasan = newData.args[0].metodePengemasan
            newQty[currentIndex].pengangkutan = newData.args[0].pengangkutan
            newQty[currentIndex].caraPembayaran = newData.args[0].caraPembayaran
        }
        //history.push('/transaksi-keluar')
        setInputTrx({
            kuantitasManggaKg : '',
            teknikSorting : '',
            hargaManggaPerKg : '',
            metodePengemasan : '',
            pengangkutan : '',
            caraPembayaran : []
        })
    }
    //======================== END TRANSAKSI PEDAGANG ========================//


    //======================== START CONFIRM/REJECT TRANSAKSI ========================//
    const rejectTrx = (idAset, idTrx, qty) => {
        const newData = {
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
                idAset,
                idTrx,
                qty,
                inputTrx.rejectReason
            ]
        }
        console.log(newData)
        const newQty = aset
        if(currentIndex === -1){
            setAset([...aset, {
                rejectReason : inputTrx.rejectReason
            }])
        }
        else {
            newQty[currentIndex].rejectReason = newData.args[0].rejectReason
        }
        setInputTrx({
            rejectReason : ''
        })
    }        

    const confirmTrx = (idTrx) => {
        const newData ={
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
                idTrx
            ]
        }
        console.log(newData)
    }
    //======================== END CONFIRM/REJECT TRANSAKSI ========================//

    return(
       <AsetContext.Provider value={{ 
           aset, setAset, numberFormat, formatDate, sortData, createBenih, addQtyBenih,
           qty, setQty, currentIndex, setCurrentIndex, inputTrx, setInputTrx, 
           trxPenangkar, setTrxPenangkar, createTrxPenangkar, checked, setChecked, createTrxPetani,
           createTrxPengumpul,  createTrxPedagang, rejectTrx, confirmTrx, showData, tanamBenihPetani,
           selectedValue, setSelectedValue, getId, setGetId, dataAsetPenangkar, dataAsetPetani, dataByRole, 
           elementPos, panenPetani, dataAsetPengumpul, getIdBenih, setGetIdBenih, getIdMangga, setGetIdMangga,
           getIdTx2, setGetIdTx2, statusTrx
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}
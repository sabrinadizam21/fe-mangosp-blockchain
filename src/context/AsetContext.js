import { useState, createContext } from 'react'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
export const AsetContext = createContext()
export const AsetProvider = props => {
    
    let history = useHistory()
    const [ currentIndex, setCurrentIndex ] = useState(-1)
    const [ selectedValue, setSelectedValue ] = useState('ALL')
    const [ getId, setGetId ] = useState('')
    const [ getIdBenih, setGetIdBenih ] = useState('')
    const [ getIdMangga, setGetIdMangga ] = useState('')
    const [ getIdTx2, setGetIdTx2 ] = useState('')
    const [ qty, setQty ] = useState('')
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
    const [aset,setAset] = useState([        
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
        tanggalTransaksi : 1664438875, 
        varietasBenih : 'Arum manis', 
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
        caraPembayaran : ['Tunai'], 
        txID1 : 'trxPenangkarkePetani1', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        isPanen : false,
        rejectReason : ''},
    
        {id : 'trxPenangkarkePetani2', 
        benihID : 'benih2', 
        manggaID : '', 
        namaPengirim : 'penangkarAgus', 
        namaPenerima : 'petani1', 
        kuantitasBenihKg : 5, 
        hargaBenihPerKg : 10000, 
        hargaBenihTotal : 50000, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1664438875, 
        varietasBenih : 'Arum manis', 
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
        caraPembayaran : ['Tunai'], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : true, 
        isEmpty : false, 
        isRejected : false, 
        isPanen : false,
        rejectReason : ''},

        //aset petani == Transaksi Masuk  && isConfirmed true
    
        //data sudah tanam benih
        {id : 'asetTanamBenih1', 
        benihID : 'benih1', 
        manggaID : 'asetTanamBenih1', 
        namaPengirim : 'petani1', 
        namaPenerima : '', 
        kuantitasBenihKg : 5, 
        hargaBenihPerKg : 10000, 
        hargaBenihTotal : 50000, 
        kuantitasManggaKg : 0, 
        hargaManggaPerKg : 0, 
        hargaManggaTotal : 0, 
        tanggalTransaksi : 1664438875, 
        varietasBenih : 'Arum manis', 
        umurBenih : 3, 
        pupuk : 'Kompos', 
        tanggalTanam : 1664438928, 
        lokasiLahan : 'Bandung', 
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
        caraPembayaran : ['Tunai'], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        isPanen : true,
        rejectReason : ''},

        // //data sudah panen
        {id : 'asetTanamBenih2', 
        benihID : 'benih2', 
        manggaID : 'asetTanamBenih2', 
        namaPengirim : 'petani1', 
        namaPenerima : '', 
        kuantitasBenihKg : 5, 
        hargaBenihPerKg : 10000, 
        hargaBenihTotal : 50000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 12000, 
        hargaManggaTotal : 120000, 
        tanggalTransaksi : 1664438875, 
        varietasBenih : 'Arum manis', 
        umurBenih : 3, 
        pupuk : 'Kompos', 
        tanggalTanam : 1664438928, 
        lokasiLahan : 'Bandung', 
        ukuran : 'Besar', 
        pestisida : 'pestisida', 
        kadarAir : 90, 
        perlakuan : 'Fungisida', 
        produktivitas : '10/ha', 
        tanggalPanen : 1664439107, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Tunai'], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : '', 
        txID3 : '', 
        txID4 : '', 
        isAsset : true, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        isPanen : false,
        rejectReason : ''},
    
        // trx petani -> pengumpul
        {id : '4f1269351a641e1k1c7438a6q6h9016dff90066ry5asf1862917b2e1872b3615f', 
        benihID : 'benih1', 
        manggaID : 'asetTanamBenih1', 
        namaPengirim : 'petani1', 
        namaPenerima : 'pengumpul1', 
        kuantitasBenihKg : 5, 
        hargaBenihPerKg : 10000, 
        hargaBenihTotal : 50000, 
        kuantitasManggaKg : 10, 
        hargaManggaPerKg : 15000, 
        hargaManggaTotal : 150000, 
        tanggalTransaksi : 1664439215, 
        varietasBenih : 'Arum manis', 
        umurBenih : 3, 
        pupuk : 'Kompos', 
        tanggalTanam : 1664438928, 
        lokasiLahan : 'Bandung', 
        ukuran : 'Besar', 
        pestisida : 'pestisida', 
        kadarAir : 90, 
        perlakuan : 'Fungisida', 
        produktivitas : '10/ha', 
        tanggalPanen : 1664439107, 
        tanggalMasuk : 0, 
        teknikSorting : '', 
        metodePengemasan : '', 
        pengangkutan : '', 
        pembeli : '', 
        caraPembayaran : ['Tunai'], 
        txID1 : 'trxPenangkarkePetani2', 
        txID2 : '4f1269351a641e1k1c7438a6q6h9016dff90066ry5asf1862917b2e1872b3615f', 
        txID3 : '', 
        txID4 : '', 
        isAsset : false, 
        isConfirmed : false, 
        isEmpty : false, 
        isRejected : false, 
        isPanen : false,
        rejectReason : ''},
    ])
    
    const formatDate = (x) => {
        if (x.toString().length < 12) { x = x*1000 }
        const date = new Date(x)
        const day = date.toLocaleString('default', {day: 'numeric'})
        const month = date.toLocaleString('default', {month: 'short'})
        const year = date.toLocaleString('default', {year: 'numeric'})
        const hour = date.toLocaleString('default', {hour : 'numeric', minute : 'numeric', hour12 : false})
        return day + ' ' + month + ' ' + year + ' - ' + hour
    }

    const sortData = (data) => data.sort((a,b) => (a.tanggalTransaksi < b.tanggalTransaksi) ? 1 : -1)
    
    function numberFormat(number){
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    }
    
    // Cari index di array pada data aset
    var elementPos = (id) => {
        const indexArray = aset.map(function(x) {return x.id}).indexOf(id)
        return indexArray
    }

    // Label Transaksi Masuk atau Keluar
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
    
    //======================== START FILTER ASET ========================//
    // Data Transaksi Masuk atau Keluar
    const showData = (datas, trxType) => {
        if(trxType === 'out'){
            datas = datas.filter(data => data.isAsset === false && data.namaPengirim === Cookies.get('username'))
        } else if (trxType === 'in') {
            datas = datas.filter(data => data.isAsset === false && data.namaPenerima === Cookies.get('username'))
        }

        // Filter Status transaksi
        if(selectedValue === 'ALL')
            return datas
        else if(selectedValue === 'SUCCESS')
            return datas.filter(data => data.isConfirmed === true && data.isRejected === false)
        else if(selectedValue === 'FAILED')
            return datas.filter(data => data.isConfirmed === false && data.isRejected === true)
        else if(selectedValue === 'PENDING')
            return datas.filter(data => data.isConfirmed === false && data.isRejected === false)
    }
    
    const dataAsetPenangkar = aset.filter(asets => asets.txID1 === '' && asets.namaPengirim === Cookies.get('username'))

    const dataAsetPetani = aset.filter(data => 
        // Data belum tanam benih
        (data.namaPenerima === Cookies.get('username') && data.isAsset === false && data.isConfirmed === true && data.isRejected === false) ||
        // Data sudah tanam benih atau belum panen 
        (data.namaPengirim === Cookies.get('username') && data.isPanen !== true && data.isAsset === true) || 
        // Data sudah panen 
        (data.namaPengirim === Cookies.get('username') && data.isPanen !== false && data.isAsset === true)
    )

    const dataAsetPengumpulPedagang = aset.filter(data => data.namaPenerima === Cookies.get('username') && data.isAsset === false && data.isConfirmed === true && data.isRejected === false)
    
    // Data untuk list aset yang akan di Transaksi
    const dataByRole = () => {
        const role = Cookies.get('role')
        if(role == 1) var data = dataAsetPenangkar.filter(data => data.isEmpty === false)
        else if (role == 2) var data = aset.filter(asets => asets.tanggalPanen !== 0 && asets.isAsset === true && asets.isEmpty === false)
        else if (role == 3) var data = dataAsetPengumpulPedagang.filter(data => data.isEmpty === false)
        else if (role == 4) var data = dataAsetPengumpulPedagang.filter(data => data.isEmpty === false)
        return data
    }

    const newTrx = aset.map((u)=>{
        const copyAset = Object.assign({}, u)
        return copyAset
    })
    //======================== END FILTER ASET ========================//

    
    //======================== START GET DATA ========================//
    const getAset = (roleName) => {
        const username = Cookies.get('username')
        const body = {
            peer : "peer0."+roleName+".example.com",
            fcn  : "GetManggaForQuery",
            argn : ["{\"selector\":{\"namaPengirim\":\""+ username + "\", \"isAsset\":" + true + "\", \"isEmpty\":" + false + "}}"]
        }        
        console.log(body)
    }

    // Transaksi Keluar
    const trxKeluarPending = (roleName) => {
        const username = Cookies.get('username')
        const body = {
            peer : "peer0."+roleName+".example.com",
            fcn  : "GetManggaForQuery",
            argn : [
                "{\"selector\":{\"namaPengirim\":\""+ username + 
                "\", \"isConfirmed\":" + false + 
                "\", \"isAsset\":" + false + 
                "\", \"isReject\":" + false + 
            "}}"]
        }        
        console.log(body)
    }
    const trxKeluarFailed = (roleName) => {
        const username = Cookies.get('username')
        const body = {
            peer : "peer0."+roleName+".example.com",
            fcn  : "GetManggaForQuery",
            argn : [
                "{\"selector\":{\"namaPengirim\":\""+ username + 
                "\", \"isConfirmed\":" + false + 
                "\", \"isAsset\":" + false + 
                "\", \"isReject\":" + true + 
            "}}"]
        }        
        console.log(body)
    }
    const trxKeluarSuccess = (roleName) => {
        const username = Cookies.get('username')
        const body = {
            peer : "peer0."+roleName+".example.com",
            fcn  : "GetManggaForQuery",
            argn : [
                "{\"selector\":{\"namaPengirim\":\""+ username + 
                "\", \"isConfirmed\":" + true + 
                "\", \"isAsset\":" + false + 
                "\", \"isReject\":" + false + 
            "}}"]
        }        
        console.log(body)
    }

    // Transaksi Masuk
    const trxMasukPending = (roleName) => {
        const username = Cookies.get('username')
        const body = {
            peer : "peer0."+roleName+".example.com",
            fcn  : "GetManggaForQuery",
            argn : [
                "{\"selector\":{\"namaPenerima\":\""+ username + 
                "\", \"isConfirmed\":" + false + 
                "\", \"isAsset\":" + false + 
                "\", \"isReject\":" + false + 
            "}}"]
        }        
        console.log(body)
    }
    const trxMasukFailed = (roleName) => {
        const username = Cookies.get('username')
        const body = {
            peer : "peer0."+roleName+".example.com",
            fcn  : "GetManggaForQuery",
            argn : [
                "{\"selector\":{\"namaPenerima\":\""+ username + 
                "\", \"isConfirmed\":" + false + 
                "\", \"isAsset\":" + false + 
                "\", \"isReject\":" + true + 
            "}}"]
        }        
        console.log(body)
    }
    const trxMasukSuccess = (roleName) => {
        const username = Cookies.get('username')
        const body = {
            peer : "peer0."+roleName+".example.com",
            fcn  : "GetManggaForQuery",
            argn : [
                "{\"selector\":{\"namaPenerima\":\""+ username + 
                "\", \"isConfirmed\":" + true + 
                "\", \"isAsset\":" + false + 
                "\", \"isReject\":" + false + 
            "}}"]
        }        
        console.log(body)
    }
    const functionGet = {
        getAset, trxKeluarPending, trxKeluarFailed, trxKeluarSuccess,
        trxMasukPending, trxMasukFailed, trxMasukSuccess
    }
    //======================== END GET DATA ========================//


    //======================== START ASET BENIH ========================//
    const createBenih = () => {        
        const body = {
            fcn : "RegistrasiBenih",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                varietasBenih : inputTrx.varietasBenih,
                kuantitasBenihKg : parseInt(inputTrx.kuantitasBenihKg),
                namaPengirim : Cookies.get('username')
            }]
        }
        console.log(body)

        const newAset = {
            id : 'newBenih',
            benihID : 'newBenih',
            varietasBenih : body.args[0].varietasBenih,
            kuantitasBenihKg :body.args[0].kuantitasBenihKg,
            namaPengirim : body.args[0].namaPengirim,
            kuantitasManggaKg : '',
            tanggalTanam : new Date().getTime(),
            tanggalTransaksi : 0,
            txID1 : '',
            txID2 : '',
            txID3 : '',
            txID4 : '',
            manggaID : '',
            pupuk : '',
        }
        aset.push(newAset)
        let idTrx = newAset.id
        history.push(`/detail-transaksi/${idTrx}`)
        setInputTrx({
            varietasBenih :'', 
            kuantitasBenihKg : '',
        })
        console.log(aset)
    }

    const addQtyBenih = (id) => {
        const idBenih = id
        const body = {
            fcn : "AddKuantitasBenihByID",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [
                inputTrx.kuantitasBenihKg,
                idBenih           
            ]
        }
        let newQty = aset
        if(body.args[0] <= newQty[currentIndex].kuantitasBenihKg) 
            alert("Input tidak boleh lebih kecil dari kuantitas sekarang. Silahkan ubah kuantitas kembali.")
        else {
            console.log(body)
            newQty[currentIndex].kuantitasBenihKg = body.args[0]
            newQty[currentIndex].tanggalTanam = new Date().getTime()
        }
        setInputTrx({
            kuantitasBenihKg : ''
        })
    }
    //======================== END ASET BENIH ========================//

    
    //======================== START TRANSAKSI PENANGKAR ========================//
    const [checked, setChecked] = useState([])

    const createTrxPenangkar = () => {
        const body = {
            fcn : "CreateTrxManggaByPenangkar",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                varietasBenih : inputTrx.varietasBenih,
                namaPenerima : inputTrx.namaPenerima,
                kuantitasBenihKg : parseInt(inputTrx.kuantitasBenihKg), 
                umurBenih : inputTrx.umurBenih,  
                hargaBenihPerKg : parseInt(inputTrx.hargaBenihPerKg), 
                caraPembayaran : inputTrx.caraPembayaran,
                }
            ]
        }
        console.log(body)
        
        const newTrx =  {
            varietasBenih: body.args[0].varietasBenih,
            kuantitasBenihKg : body.args[0].kuantitasBenihKg, 
            umurBenih : body.args[0].umurBenih,
            hargaBenihPerKg : body.args[0].hargaBenihPerKg, 
            namaPengirim : Cookies.get('username'), 
            namaPenerima : body.args[0].namaPenerima, 
            caraPembayaran : body.args[0].caraPembayaran,
            isAsset : false, 
            isConfirmed: false,
            isEmpty: false,
            isPanen: false,
            isRejected: false,
            tanggalTanam : 0,
            tanggalTransaksi : 1664438875,
            hargaManggaPerKg : 0,
            id : 'trxPenangkarkePetani1',
            txID4 : '',
            txID3 : '',
            txID2 : '',
            kuantitasManggaKg : 0,
            manggaID : '',
            pupuk : '',
            txID1 : 'trxPenangkarkePetani1',
            // benihID : idBenih,
        }
        aset.push(newTrx)
        console.log(aset)
        const idTrx = newTrx.id
        Cookies.remove('idTrx')
        history.push(`/transaksi/keluar`)
        setInputTrx({
            kuantitasBenihKg : '', 
            umurBenih : '',
            hargaBenihPerKg : '', 
            varietasBenih:'',
            isAsset : false, 
            namaPengirim : '', 
            namaPenerima : '', 
            caraPembayaran : []
        })
    }
    //======================== END TRANSAKSI PENANGKAR ========================//


    //======================== START TRANSAKSI PETANI ========================//
    const createTrxPetani = (manggaID) => {
        const body = {
            fcn : "CreateTrxManggaByPetani",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                kuantitasManggaKg : parseInt(inputTrx.kuantitasManggaKg),
                hargaManggaPerKg : parseInt(inputTrx.hargaManggaPerKg),
                namaPenerima : inputTrx.namaPenerima,
                caraPembayaran : inputTrx.caraPembayaran
                }, manggaID
            ]
        }
        console.log(body)
        if(currentIndex !== -1){
            newTrx[currentIndex].namaPengirim = Cookies.get('username')
            newTrx[currentIndex].kuantitasManggaKg = body.args[0].kuantitasManggaKg
            newTrx[currentIndex].hargaManggaPerKg = body.args[0].hargaManggaPerKg
            newTrx[currentIndex].namaPenerima = body.args[0].namaPenerima
            newTrx[currentIndex].caraPembayaran = body.args[0].caraPembayaran
            newTrx[currentIndex].id = '4f1269351a641e1k1c7438a6q6h9016dff90066ry5asf1862917b2e1872b3615f'
            newTrx[currentIndex].txID2 = '4f1269351a641e1k1c7438a6q6h9016dff90066ry5asf1862917b2e1872b3615f'
            newTrx[currentIndex].txID1 = 'trxPenangkarkePetani1'
            newTrx[currentIndex].isAsset = false
        }
        aset.push(newTrx[currentIndex])
        const index = aset.length - 1
        console.log(aset)
        // const idTrx = aset[index].id
        Cookies.remove("idTrx")
        history.push(`/transaksi/keluar`)
        setInputTrx({
            namaPengirim : '',
            kuantitasManggaKg : '',
            hargaManggaPerKg : '',
            namaPenerima : '',
            caraPembayaran : ''
        })
    }
    //======================== END TRANSAKSI PETANI ========================//

    
    //======================== START TANAM BENIH PETANI ========================//
    const tanamBenihPetani = (txID1) =>{
        const body = {
            fcn : "TanamBenih",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                    pupuk : inputTrx.pupuk, 
                    lokasiLahan : inputTrx.lokasiLahan,
                    kuantitasBenihKg : inputTrx.kuantitasBenihKg
                }, txID1
            ]
        }
        console.log(body)
        if(currentIndex !== -1){
            newTrx[currentIndex].pupuk = body.args[0].pupuk
            newTrx[currentIndex].lokasiLahan = body.args[0].lokasiLahan
            newTrx[currentIndex].kuantitasBenihKg = body.args[0].kuantitasBenihKg
            newTrx[currentIndex].id = 'asetTanamBenih'
            newTrx[currentIndex].manggaID = 'asetTanamBenih'
            newTrx[currentIndex].isAsset = true 
            newTrx[currentIndex].isConfirmed= false
            newTrx[currentIndex].isEmpty= false
            newTrx[currentIndex].isPanen= true
            newTrx[currentIndex].isRejected= false
            newTrx[currentIndex].tanggalTanam = new Date().getTime()
            newTrx[currentIndex].tanggalTransaksi = 0 
        }
        aset.push(newTrx[currentIndex])
        const index = aset.length - 1
        console.log(aset)
        // const idTrx = aset[index].id
        history.push(`/aset`)
        setInputTrx({
            pupuk : '', 
            lokasiLahan : '',
        })
    }
    //======================== END TANAM BENIH PETANI ========================//


    //======================== START PANEN PETANI ========================//
    const panenPetani = (manggaID) => {
        const body = {
            fcn : "PanenMangga",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                ukuran : inputTrx.ukuran, 
                pestisida : inputTrx.pestisida, 
                kadarAir : parseInt(inputTrx.kadarAir), 
                perlakuan : inputTrx.perlakuan, 
                produktivitas : inputTrx.produktivitas, 
                kuantitasManggaKg : parseInt(inputTrx.kuantitasManggaKg),
            }, manggaID]
        }
        console.log(body)
        if(currentIndex !== -1){
            newTrx[currentIndex].ukuran = body.args[0].ukuran
            newTrx[currentIndex].pestisida = body.args[0].pestisida
            newTrx[currentIndex].kadarAir = body.args[0].kadarAir
            newTrx[currentIndex].perlakuan = body.args[0].perlakuan
            newTrx[currentIndex].produktivitas = body.args[0].produktivitas
            newTrx[currentIndex].kuantitasManggaKg = body.args[0].kuantitasManggaKg
            newTrx[currentIndex].tanggalTransaksi = 1664439107
            newTrx[currentIndex].tanggalPanen = 1664439107
            newTrx[currentIndex].namaPengirim = Cookies.get('username')
            newTrx[currentIndex].id = 'asetPanen'
            newTrx[currentIndex].pupuk = 'Pupuk kompos'
            newTrx[currentIndex].isPanen = false
            newTrx[currentIndex].isAsset = false
        }
        aset.push(newTrx[currentIndex])
        const index = aset.length - 1
        console.log(aset)
        // const idTrx = aset[index].id
        history.push(`/aset`)
        setInputTrx({
            ukuran : '', 
            pestisida : '', 
            kadarAir : '', 
            perlakuan : '', 
            produktivitas : '', 
            kuantitasManggaKg : '',
            tanggalTanam : '' 
        })
        console.log(aset)
    }
    //======================== END PANEN PETANI ========================//


    //======================== START TRANSAKSI PENGUMPUL ========================//
    const createTrxPengumpul = (txID2) => {
        const body ={
            fcn : "CreateTrxManggaByPengumpul",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                namaPenerima : inputTrx.namaPenerima,
                kuantitasManggaKg : inputTrx.kuantitasManggaKg,
                hargaManggaPerKg : inputTrx.hargaManggaPerKg,
                teknikSorting : inputTrx.teknikSorting,
                metodePengemasan : inputTrx.metodePengemasan,
                pengangkutan : inputTrx.pengangkutan,
                caraPembayaran : inputTrx.caraPembayaran,
            }, txID2]
        }
        console.log(body)
        if(currentIndex !== -1){
            newTrx[currentIndex].namaPengirim = Cookies.get('username')
            newTrx[currentIndex].kuantitasManggaKg = body.args[0].kuantitasManggaKg
            newTrx[currentIndex].teknikSorting = body.args[0].teknikSorting
            newTrx[currentIndex].hargaManggaPerKg = body.args[0].hargaManggaPerKg
            newTrx[currentIndex].metodePengemasan = body.args[0].metodePengemasan
            newTrx[currentIndex].pengangkutan = body.args[0].pengangkutan
            newTrx[currentIndex].namaPenerima = body.args[0].namaPenerima
            newTrx[currentIndex].caraPembayaran = body.args[0].caraPembayaran
            newTrx[currentIndex].id = 'idTrxPengumpulkePedagang'
            newTrx[currentIndex].txID3 = 'idTrxPengumpulkePedagang'
            newTrx[currentIndex].isAsset = false
            newTrx[currentIndex].isConfirmed = false
        }
        aset.push(newTrx[currentIndex])
        const index = aset.length - 1
        console.log(aset)
        const idTrx = aset[index].id
        Cookies.remove("idTrx")
        history.push(`/detail-transaksi/${idTrx}`)
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
        const body = {
            fcn : "CreateTrxManggaByPedagang",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                kuantitasManggaKg : parseInt(inputTrx.kuantitasManggaKg),
                hargaManggaPerKg : parseInt(inputTrx.hargaManggaPerKg),
                caraPembayaran : inputTrx.caraPembayaran,
            }, txID3]
        }
        console.log(body)
        if(currentIndex !== -1){
            newTrx[currentIndex].namaPengirim = Cookies.get('username')
            newTrx[currentIndex].kuantitasManggaKg = body.args[0].kuantitasManggaKg
            newTrx[currentIndex].hargaManggaPerKg = body.args[0].hargaManggaPerKg
            newTrx[currentIndex].caraPembayaran = body.args[0].caraPembayaran
            newTrx[currentIndex].tanggalTransaksi = new Date().getTime()
            newTrx[currentIndex].id = 'idTrxPedagang'
            newTrx[currentIndex].txID4 = 'idTrxPedagang'
            newTrx[currentIndex].isAsset = false
            newTrx[currentIndex].isConfirmed = true
        }
        aset.push(newTrx[currentIndex])
        const index = aset.length - 1
        console.log(aset)
        const idTrx = aset[index].id
        Cookies.remove("idTrx")
        history.push(`/detail-transaksi/${idTrx}`)
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
    const rejectTrx = (trxID, idAset, qty) => {
        const body = {
            fcn: "RejectTrxByID",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [
                idAset,
                trxID,
                qty,
                inputTrx.rejectReason
            ]
        }
        console.log(body)
        const reject = aset
        if(currentIndex !== -1){
            reject[currentIndex].rejectReason = body.args[3]
            reject[currentIndex].isAsset = false
            reject[currentIndex].isConfirmed = false
            reject[currentIndex].isEmpty = false
            reject[currentIndex].isPanen = false
            reject[currentIndex].isRejected = true
        }
        const idTrx =  trxID
        Cookies.remove("idTrx")
        console.log(aset)
        history.push(`/detail-transaksi/${idTrx}`)
        setInputTrx({
            rejectReason : ''
        })
    }        

    const confirmTrx = (trxID) => {
        const body ={
            fcn: "ConfirmTrxByID",
            peers: [
                "peer0.penangkar.example.com",
                "peer0.petani.example.com",
                "peer0.pengumpul.example.com",
                "peer0.pedagang.example.com"
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [
                trxID
            ]
        }
        console.log(body)
        const reject = aset
        if(currentIndex !== -1){
            reject[currentIndex].isAsset = false
            reject[currentIndex].isConfirmed = true
            reject[currentIndex].isEmpty = false
            reject[currentIndex].isPanen = false
            reject[currentIndex].isRejected = false
        }
        const idTrx =  trxID
        Cookies.remove("idTrx")
        console.log(aset)
        history.push(`/detail-transaksi/${idTrx}`)
    }
    //======================== END CONFIRM/REJECT TRANSAKSI ========================//

    return(
       <AsetContext.Provider value={{ 
           aset, setAset, numberFormat, formatDate, sortData, createBenih, addQtyBenih,
           qty, setQty, currentIndex, setCurrentIndex, inputTrx, setInputTrx, 
           createTrxPenangkar, checked, setChecked, createTrxPetani,
           createTrxPengumpul,  createTrxPedagang, rejectTrx, confirmTrx, showData, tanamBenihPetani,
           selectedValue, setSelectedValue, getId, setGetId, dataAsetPenangkar, dataAsetPetani, dataByRole, 
           elementPos, panenPetani, dataAsetPengumpulPedagang, getIdBenih, setGetIdBenih, getIdMangga, setGetIdMangga,
           getIdTx2, setGetIdTx2, statusTrx, functionGet
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}
import { useState, createContext } from 'react'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import axios from 'axios'
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
            kuantitasBenih : '', 
            hargaBenihPerBuah : '', 
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
    const [aset,setAset] = useState([])
    
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
    
    const { dataAsetPenangkar, setDataAsetPenangkar } = useState([])
    //aset.filter(asets => asets.isAsset === true && asets.txID1 === '' && asets.namaPengirim === Cookies.get('username'))

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
    const dataByRole = (data) => {
        const role = Cookies.get('role')
        if(role === 'Org2') return data.filter(datas => datas.Record.kuantitasBenih > 0)
        else return data.filter(datas => datas.Record.isEmpty === false)
    }

    const newTrx = aset.map((u)=>{
        const copyAset = Object.assign({}, u)
        return copyAset
    })
    //======================== END FILTER ASET ========================//

    
    //======================== START GET DATA ========================//
    const getAset = (roleName) => {
        const username = Cookies.get('username')
        const token = "Bearer " + Cookies.get('token')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/channels/channel1/chaincodes/manggach1_cc`,{
            headers : {
                Authorization : token
            },
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPengirim\\":\\"' +
                            username +
                            '\\", \\"isAsset\\":true' + 
                            "}}" +
                        '"]'
            }
        })
        .then((res)=>{
            let data = res.data.result
            setDataAsetPenangkar(data)
        })
        .catch((err) => alert(err))
    }   
    const { mangga, setMangga } = useState([])
    const getManggaById = async (id) => {
        const idAset = id
        const token = "Bearer " + Cookies.get('token')
        const role = Cookies.get('role').toLowerCase()
        try {
            const res = await axios.get(`http://localhost:4000/channels/channel1/chaincodes/manggach1_cc`,{
                headers : {
                    Authorization : token
                },
                params : {
                    peer : "peer0." + role + ".example.com",
                    fcn  : "GetManggaByID",
                    args : '["' + idAset + '"]'
                }
            })
            let output = res.data.result
            console.log(output)
            history.push('/aset')
            setMangga('output')
            console.log(mangga)
        } catch (err) {
            console.log(err)
        }
        // .then((res)=>{
        //     let data = res.data.result
        //     console.log(data)
        //     setMangga(data)
        //     console.log(mangga)
        // })
        // .catch((err) => console.log(err))
    }
    const getAsetForPanen = () =>{
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/channels/channel1/chaincodes/manggach1_cc`, {
            headers :{
                Authorization : 'Bearer ' + Cookies.get('token')
            },
            params : {
                peer : "peer0." + role + ".example.com",
                fcn : "GetManggaForQuery",
                args : '["' +
                            '{\\"selector\\":{\\"namaPengirim\\":\\"' + username + 
                            '\\",\\"isAsset\\":true,\\"isPanen\\":false' + '}}' + 
                        '"]'
            }
        }).then((res)=>{
            const data = res.data.result
            console.log(data)
        }).catch((err) => console.log(err))
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
        getAset, getManggaById, getAsetForPanen,
        trxKeluarPending, trxKeluarFailed, trxKeluarSuccess,
        trxMasukPending, trxMasukFailed, trxMasukSuccess, 
    }
    //======================== END GET DATA ========================//


    //======================== START ASET BENIH ========================//
    const createBenih = () => {        
        const body = {
            fcn : "RegistrasiBenih",
            peers: [
                "peer0.org1.example.com",
                "peer0.org2.example.com",
                "peer0.org3.example.com",
                "peer0.org4.example.com",
            ],
            chaincodeName: "manggach1_cc",
            channelName: "channel1",
            args: [{
                varietasBenih : inputTrx.varietasBenih,
                kuantitasBenih : parseInt(inputTrx.kuantitasBenih),
                namaPengirim : Cookies.get('username')
            }]
        }
        console.log(body)

        const newAset = {
            id : 'newBenih',
            benihID : 'newBenih',
            varietasBenih : body.args[0].varietasBenih,
            kuantitasBenih :body.args[0].kuantitasBenih,
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
            kuantitasBenih : '',
        })
        console.log(aset)
    }

    const addQtyBenih = (id) => {
        const idBenih = id
        const quantity = qty
        const token = "Bearer " + Cookies.get('token')
        axios({
            method : 'post',
            url : 'http://localhost:4000/channels/channel1/chaincodes/manggach1_cc',
            headers : {
                Authorization : token
            },
            data : {
                fcn: "AddKuantitasBenihByID",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com",
                ],
                chaincodeName:"manggach1_cc",
                channelName:"channel1",
                args:[quantity, idBenih]
            }
        })       
        .then((res)=>{
            console.log(res.data)
            window.location.reload()
        })
    }
    //======================== END ASET BENIH ========================//

    
    //======================== START TRANSAKSI PENANGKAR ========================//
    const [checked, setChecked] = useState([])
    
    const createTrxPenangkar = async () => {
        const token = "Bearer " + Cookies.get('token')
        await axios({
            method : 'post',
            url : 'http://localhost:4000/channels/channel1/chaincodes/manggach1_cc',
            headers : {
                Authorization : token
            },
            data : {
                fcn : "CreateTrxManggaByPenangkar",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com",
                ],
                chaincodeName: "manggach1_cc",
                channelName: "channel1",
                args: [
                    '{\"namaPenerima\":\"' + inputTrx.namaPenerima + 
                    '\",\"varietasBenih\":\"' + inputTrx.varietasBenih + 
                    '\",\"kuantitasBenih\":' + parseInt(inputTrx.kuantitasBenih) + 
                    ',\"umurBenih\":\"' + inputTrx.umurBenih + ' bulan' + 
                    '\",\"hargaBenihPerBuah\":' + parseInt(inputTrx.hargaBenihPerBuah) + 
                    ',\"caraPembayaran\":\"' + inputTrx.caraPembayaran + '\"}',   
                    "a85a967547685448669206c848e02f597f428ae894fcb4a673eb038b7b488657"                   
                ]
            }
        })
        .then((res)=>{
            console.log(res.data)
            let idTrx = res.data.result.result.txid
            console.log(res.data)
            console.log(idTrx)
            Cookies.remove('idTrx')
            history.push('/transaksi/keluar')
            //history.push(`/detail-transaksi/${idTrx}`)
        })
        .catch((err)=>console.log(err))
       
        setInputTrx({
            kuantitasBenih : '', 
            varietasBenih : '',
            umurBenih : '',
            hargaBenihPerBuah : '', 
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
            newTrx[currentIndex].id = 'idTrxPenangkarkePengumpul'
            newTrx[currentIndex].txID2 = 'idTrxPenangkarkePengumpul'
            newTrx[currentIndex].isAsset = false
        }
        aset.push(newTrx[currentIndex])
        const index = aset.length - 1
        console.log(aset)
        const idTrx = aset[index].id
        Cookies.remove("idTrx")
        history.push(`/detail-transaksi/${idTrx}`)
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
        axios({
            method : 'post',
            url : `http://localhost:4000/channels/channel1/chaincodes/manggach1_cc`,
            headers : {
                Authorization : 'Bearer ' + Cookies.get('token')
            },
            data : {
                fcn : "TanamBenih",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com",
                ],
                chaincodeName: "manggach1_cc",
                channelName: "channel1",
                args: [ 
                    '{\"pupuk\":\"' + inputTrx.pupuk + 
                    '\",\"lokasiLahan\":\"' + inputTrx.lokasiLahan + 
                    '\",\"kuantitasBenih\":' + parseInt(inputTrx.kuantitasBenih) + '}',                    
                    txID1 
                ]
            }           
        }).then((res)=>{
            let data = res.data.result
            console.log(data)
            history.push('/aset')
            //const idTrx = data.idTrx
            // history.push(`/detail-transaksi/${idTrx}`)
        }).catch((err)=> {
            console.log(err)
        })
        setInputTrx({
            pupuk : '', 
            lokasiLahan : '',
            kuantitasBenih :''
        })
    }
    //======================== END TANAM BENIH PETANI ========================//


    //======================== START PANEN PETANI ========================//
    const panenPetani = (manggaID) => {
        axios({
            method : 'post',
            url : `http://localhost:4000/channels/channel1/chaincodes/manggach1_cc`,
            headers : {
                Authorization : 'Bearer ' + Cookies.get('token')
            },
            data : {
                fcn : "PanenMangga",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com"
                ],
                chaincodeName: "manggach1_cc",
                channelName: "channel1",
                args: [
                    '{\"ukuran\":\"' + inputTrx.ukuran + 
                    '\",\"pestisida\":\"' + inputTrx.pestisida + 
                    '\",\"kadarAir\":' +  parseInt(inputTrx.kadarAir) + 
                    ',\"perlakuan\":\"' + inputTrx.perlakuan + 
                    '\",\"produktivitas\":\"' + inputTrx.produktivitas + 
                    '\",\"kuantitasManggaKg\":' + parseInt(inputTrx.kuantitasManggaKg) + '}', 
                    manggaID
                ]
            }
        }).then((res)=>{
            let data = res.data.result
            console.log(data)
            history.push('/aset')
            // const idTrx = data.idtrx
            // history.push(`/detail-transaksi/${idTrx}`)
        }).catch((err)=>console.log(err))
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
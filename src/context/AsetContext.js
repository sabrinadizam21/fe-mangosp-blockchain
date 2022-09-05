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
    const [ loading, setLoading ] = useState(false)
    const [dataTrxKeluarPending, setDataTrxKeluarPending] = useState([]) 
    const [dataTrxKeluarFailed, setDataTrxKeluarFailed] = useState([]) 
    const [dataTrxKeluarSuccess, setDataTrxKeluarSuccess] = useState([]) 
    const [dataTrxMasukPending, setDataTrxMasukPending] = useState([]) 
    const [dataTrxMasukFailed, setDataTrxMasukFailed] = useState([]) 
    const [dataTrxMasukSuccess, setDataTrxMasukSuccess] = useState([]) 
    const [ inputTrx, setInputTrx ] = useState([
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
    const [ aset, setAset ] = useState([])
    const [ detail, setDetail ] = useState([])
    const chaincodeName = Cookies.get('chaincodeName')
    const channelName = Cookies.get('channelName')
    const header = {
        Authorization : 'Bearer ' + Cookies.get('token')
    }

    const formatDate = (x) => {
        if(x !== undefined){
            if (x.toString().length < 12) { x = x*1000 }
            const date = new Date(x)
            const day = date.toLocaleString('default', {day: 'numeric'})
            const month = date.toLocaleString('default', {month: 'long'})
            const year = date.toLocaleString('default', {year: 'numeric'})
            const hour = date.toLocaleString('default', {hour : 'numeric', minute : 'numeric', hour12 : false})
            return day + ' ' + month + ' ' + year + ' - ' + hour
        }
    }

    const sortData = (data) => data.sort((a,b) => (a.tanggalTransaksi < b.tanggalTransaksi) ? 1 : -1)
    
    function numberFormat(number){
        if(number !== undefined)
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
    const showDataFiltered = (datas) => {
        // Filter Status transaksi
        if(selectedValue === 'ALL')
            return datas
        else if(selectedValue === 'SUCCESS')
            return datas.filter(data => data.Record.isConfirmed === true && data.Record.isRejected === false)
        else if(selectedValue === 'FAILED')
            return datas.filter(data => data.Record.isConfirmed === false && data.Record.isRejected === true)
        else if(selectedValue === 'PENDING')
            return datas.filter(data => data.Record.isConfirmed === false && data.Record.isRejected === false)
    }
    
    const [dataAset, setDataAset] = useState([])

    // Data untuk list aset yang akan di Transaksi
    const dataByRole = (data) => {
        return data.filter(datas => datas.Record.isEmpty === false)
    }
    //======================== END FILTER ASET ========================//

    
    //======================== START GET DATA ========================//
    // Aset
    const getAset = () => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/${channelName}/chaincodes/${chaincodeName}`,{
            headers : header,
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
            setDataAset(data)
        })
        .catch((err) => alert(err))
    }
    
    const getDetailForCommon = async (idAset) => {
        try {
            const res = await axios({
                method : 'get',
                url : `http://localhost:4000/get/channels/channel1/chaincodes/manggach1_cc`,
                params : {
                    peer : "peer0.org1.example.com",
                    fcn  : "GetManggaByID",
                    args : '["' + idAset + '"]'
                }
            })
            return res.data.result
        } catch (error) {
            const msg = error.response.data.result
            if(msg !== `${idAset} does not exist`) {
                alert(msg)
                window.location.href = '/'
            }
            else{
                try {
                    const res = await axios({
                        method : 'get',
                        url : `http://localhost:4000/get/channels/channel2/chaincodes/manggach2_cc`,
                        params : {
                            peer : "peer0.org1.example.com",
                            fcn  : "GetManggaByID",
                            args : '["' + idAset + '"]'
                        }
                    })
                    return res.data.result
                } catch (error) {
                    const msg = error.response.data.result
                    if(msg !== `${idAset} does not exist`) {
                        alert(msg)
                        window.location.href = '/'
                    }
                    else {
                        alert("ID transaksi tidak ditemukan")
                        window.location.href = '/'
                    }
                }
            }
        }
    }
    // Transaksi Keluar
    const trxKeluarPending = async() => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/${channelName}/chaincodes/${chaincodeName}`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPengirim\\":\\"' + username + 
                            '\\",\\"isConfirmed\\":false,\\"isAsset\\":false,\\"isRejected\\":false' + 
                            "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let data = res.data.result
            setDataTrxKeluarPending(data)
        })
        .catch((err) => alert(err))
    }    
    const trxKeluarFailed = async() => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/${channelName}/chaincodes/${chaincodeName}`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPengirim\\":\\"' + username + 
                            '\\",\\"isConfirmed\\":false,\\"isAsset\\":false,\\"isRejected\\":true' + 
                            "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let data = res.data.result
            setDataTrxKeluarFailed(data)
        })
        .catch((err) => alert(err))
    }
    const trxKeluarSuccess = async() => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/${channelName}/chaincodes/${chaincodeName}`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPengirim\\":\\"' + username + 
                            '\\",\\"isConfirmed\\":true,\\"isAsset\\":false,\\"isRejected\\":false' + 
                            "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let data = res.data.result
            setDataTrxKeluarSuccess(data)
        })
        .catch((err) => alert(err))
    }

    // Transaksi Masuk
    const trxMasukPending = () => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/${channelName}/chaincodes/${chaincodeName}`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPenerima\\":\\"' + username + 
                            '\\",\\"isConfirmed\\":false,\\"isAsset\\":false,\\"isRejected\\":false' + 
                            "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let data = res.data.result
            setDataTrxMasukPending(data)
            console.log(dataTrxMasukPending)
        })
        .catch((err) => alert(err))
    }
    const trxMasukFailed = () => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/${channelName}/chaincodes/${chaincodeName}`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPenerima\\":\\"' + username + 
                            '\\",\\"isConfirmed\\":false,\\"isAsset\\":false,\\"isRejected\\":true' + 
                            "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let data = res.data.result
            setDataTrxMasukFailed(data)
        })
        .catch((err) => alert(err))
    }
    const trxMasukSuccess = () => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/${channelName}/chaincodes/${chaincodeName}`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPenerima\\":\\"' + username + 
                            '\\",\\"isConfirmed\\":true,\\"isAsset\\":false,\\"isRejected\\":false' + 
                            "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let data = res.data.result
            setDataTrxMasukSuccess(data)
        })
        .catch((err) => alert(err.response.data.result))
    }
    
    const [dataTrxKeluarCh2, setDataTrxKeluarCh2] = useState([])
    const trxKeluarCh2 = async() => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/channel2/chaincodes/manggach2_cc`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPengirim\\":\\"' + username + '\\",\\"isAsset\\":false' + "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let response = res.data.result
            setDataTrxKeluarCh2(response)
        })
        .catch((err) => alert(err))
    }
    const [dataTrxKeluarCh1, setDataTrxKeluarCh1] = useState([])
    const trxKeluarCh1 = async() => {
        const username = Cookies.get('username')
        const role = Cookies.get('role').toLowerCase()
        axios.get(`http://localhost:4000/get/channels/channel1/chaincodes/manggach1_cc`,{
            headers : header,
            params : {
                peer : "peer0." + role + ".example.com",
                fcn  : "GetManggaForQuery",
                args : '["' + 
                            '{\\"selector\\":{\\"namaPengirim\\":\\"' + username + '\\",\\"isAsset\\":false' + "}}" + 
                        '"]'
            }
        })
        .then((res)=>{
            let response = res.data.result
            setDataTrxKeluarCh1(response)
        })
        .catch((err) => alert(err))
    }
    const functionGet = {
        getAset, getDetailForCommon, trxKeluarPending, trxKeluarFailed, trxKeluarSuccess,
        trxMasukPending, trxMasukFailed, trxMasukSuccess, trxKeluarCh2, dataTrxKeluarCh2, trxKeluarCh1, dataTrxKeluarCh1
    }
    //======================== END GET DATA ========================//

    
    //======================== START TRANSAKSI PENANGKAR ========================//
    const [checked, setChecked] = useState([])
    
    const createTrxPenangkar = async (chaincodeName, channelName) => {
        const chaincode = chaincodeName
        const channel = channelName
        const username = Cookies.get('username')
        setLoading(true)
        await axios({
            method : 'post',
            url : `http://localhost:4000/channels/${channel}/chaincodes/${chaincode}`,
            headers : header,
            data : {
                fcn : "CreateTrxManggaByPenangkar",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com",
                ],
                chaincodeName: chaincode,
                channelName: channel,
                args: [
                    '{\"namaPenerima\":\"' + inputTrx.namaPenerima + 
                    '\",\"kuantitasBenih\":' + parseInt(inputTrx.kuantitasBenih) + 
                    ',\"umurBenih\":\"' + inputTrx.umurBenih + ' bulan' + 
                    '\",\"hargaBenihPerBuah\":' + parseInt(inputTrx.hargaBenihPerBuah) + 
                    ',\"caraPembayaran\":\"' + inputTrx.caraPembayaran + 
                    '\",\"namaPengirim\":\"' + username + 
                    '\", \"varietasBenih\" : \"' + inputTrx.varietasBenih + '\"}'                 
                ]
            }
        })
        .then((res)=>{
            console.log(res.data.result)
            history.push('/transaksi/keluar')
            setLoading(false)
        })
        .catch((err)=>{
            alert(err.response.data.result)
            setLoading(false)
        })
       
        setInputTrx({
            kuantitasBenih : '', 
            varietasBenih : '',
            umurBenih : '',
            hargaBenihPerBuah : '', 
            namaPengirim : '', 
            namaPenerima : '', 
            caraPembayaran : []
        })
    }
    //======================== END TRANSAKSI PENANGKAR ========================//


    //======================== START TRANSAKSI PETANI ========================//
    const createTrxPetani = (manggaID) => {
        axios({
            method : 'post',
            url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
            headers : header,
            data : {
                fcn : "CreateTrxManggaByPetani",
                peers: [
                    "peer0.penangkar.example.com",
                    "peer0.petani.example.com",
                    "peer0.pengumpul.example.com",
                    "peer0.pedagang.example.com"
                ],
                chaincodeName: chaincodeName,
                channelName: channelName,
                args: [
                    '{\"namaPenerima\":\"' + inputTrx.namaPenerima + 
                    '\",\"kuantitasManggaKg\":' +  parseInt(inputTrx.kuantitasManggaKg) + 
                    ',\"hargaManggaPerKg\":' + parseInt(inputTrx.hargaManggaPerKg) + 
                    ',\"caraPembayaran\":\"' + inputTrx.caraPembayaran + '\"}', 
                    manggaID
                ]
            }
        }).then((res)=>{
            let data = res.data.result
            // const idTrx = aset[index].id
            Cookies.remove("idTrx")
            // history.push(`/detail-transaksi/${idTrx}`)
            history.push('/transaksi/keluar')
        }).catch((err)=> alert(err.response.data.result))
    
        setInputTrx({
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
            url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
            headers : header,
            data : {
                fcn : "TanamBenih",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com",
                ],
                chaincodeName: chaincodeName,
                channelName: channelName,
                args: [ 
                    '{\"pupuk\":\"' + inputTrx.pupuk + 
                    '\",\"lokasiLahan\":\"' + inputTrx.lokasiLahan + 
                    '\",\"kuantitasBenih\":' + parseInt(inputTrx.kuantitasBenih) + '}',                    
                    txID1 
                ]
            }           
        }).then((res)=>{
            let data = res.data.result
            history.push('/aset')
            //const idTrx = data.idTrx
            // history.push(`/detail-transaksi/${idTrx}`)
        }).catch((err)=> {
            alert(err.response.data.result)
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
            url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
            headers : header,
            data : {
                fcn : "PanenMangga",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com"
                ],
                chaincodeName: chaincodeName,
                channelName: channelName,
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
            history.push('/aset')
            // const idTrx = data.idtrx
            // history.push(`/detail-transaksi/${idTrx}`)
        }).catch((err)=>alert(err.response.data.result))
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
                "peer0.org1.example.com",
                "peer0.org2.example.com",
                "peer0.org3.example.com",
                "peer0.org4.example.com"
            ],
            chaincodeName: chaincodeName,
            channelName: channelName,
            args: [
                '{\"namaPenerima\":\"' + inputTrx.namaPenerima + 
                '\",\"kuantitasManggaKg\":' +  inputTrx.kuantitasManggaKg + 
                ',\"hargaManggaPerKg\":' + inputTrx.hargaManggaPerKg + 
                ',\"teknikSorting\":\"' + inputTrx.teknikSorting + 
                '\",\"metodePengemasan\":\"' + inputTrx.metodePengemasan + 
                '\",\"pengangkutan\":\"' + inputTrx.pengangkutan + 
                '\",\"caraPembayaran\":\"' + inputTrx.caraPembayaran + '\"}', 
                txID2
            ]
        }
        axios({
            method : 'post',
            url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
            headers : header,
            data : body
        }).then((res) => {
            let data = res.data.result
            const idTrx = Cookies.get('idTrx')
            Cookies.remove("idTrx")
            //history.push(`/detail-transaksi/${idTrx}`)
            history.push('/transaksi/keluar')
        }).catch((err) => alert(err.response.data.result))
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
    const createTrxPedagangCh1 = (txID3) => {
        axios({
            method : 'post',
            url : `http://localhost:4000/channels/channel1/chaincodes/manggach1_cc`,
            headers : header,
            data : {
                fcn : "CreateTrxManggaByPedagang",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com"
                ],
                chaincodeName: chaincodeName,
                channelName: channelName,
                args: [
                    '{\"kuantitasManggaKg\":' +  inputTrx.kuantitasManggaKg + 
                    ',\"hargaManggaPerKg\":' + inputTrx.hargaManggaPerKg + 
                    ',\"teknikSorting\":\"' + inputTrx.teknikSorting + 
                    '\",\"metodePengemasan\":\"' + inputTrx.metodePengemasan + 
                    '\",\"pengangkutan\":\"' + inputTrx.pengangkutan + 
                    '\",\"caraPembayaran\":\"' + inputTrx.caraPembayaran + '\"}', 
                    txID3
                ]
            }
        }).then((res) => {
            let data = res.data.result
            const idTrx = Cookies.get('idTrx')
            Cookies.remove("idTrx")
            //history.push(`/detail-transaksi/${idTrx}`)
            history.push('/transaksi/keluar')
        }).catch((err) => alert(err.response.data.result))
       
        setInputTrx({
            kuantitasManggaKg : '',
            teknikSorting : '',
            hargaManggaPerKg : '',
            metodePengemasan : '',
            pengangkutan : '',
            caraPembayaran : []
        })
    }

    const createTrxPedagangCh2 = (txID3) => {
        axios({
            method : 'post',
            url : `http://localhost:4000/channels/channel2/chaincodes/manggach2_cc`,
            headers : header,
            data : {
                fcn : "CreateTrxManggaByPedagang",
                peers: [
                    "peer0.org1.example.com",
                    "peer0.org2.example.com",
                    "peer0.org3.example.com",
                    "peer0.org4.example.com"
                ],
                chaincodeName: chaincodeName,
                channelName: channelName,
                args: [
                    '{\"kuantitasManggaKg\":' +  inputTrx.kuantitasManggaKg + 
                    ',\"hargaManggaPerKg\":' + inputTrx.hargaManggaPerKg + 
                    ',\"caraPembayaran\":\"' + inputTrx.caraPembayaran + '\"}', 
                    txID3
                ]
            }
        }).then((res) => {
            let data = res.data.result
            const idTrx = Cookies.get('idTrx')
            Cookies.remove("idTrx")
            //history.push(`/detail-transaksi/${idTrx}`)
            history.push('/transaksi/keluar')
        }).catch((err) => alert(err.response.data.result))
       
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
        const channelName = Cookies.get('channelName')
        const chaincodeName = Cookies.get('chaincodeName')
        const body = {
            fcn: "RejectTrxByID",
            peers: [
                "peer0.org1.example.com",
                "peer0.org2.example.com",
                "peer0.org3.example.com",
                "peer0.org4.example.com"
            ],
            chaincodeName: chaincodeName,
            channelName: channelName,
            args: [
                idAset,
                trxID,
                qty,
                inputTrx.rejectReason
            ]
        }
        axios({
            method : 'post',
            url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
            headers : header,
            data : body
        }).then((res) => {
            let idTrx = res.data.result.result.txid
            window.location.href =  `/detail-transaksi/${idTrx}`
        }).catch((err) => alert(err.response.data.result))
        
        setInputTrx({
            rejectReason : ''
        })
    }        

    const confirmTrx = async(trxID) => {
        const channelName = Cookies.get('channelName')
        const chaincodeName = Cookies.get('chaincodeName')
        const body ={
            fcn: "ConfirmTrxByID",
            peers: [
                "peer0.org1.example.com",
                "peer0.org2.example.com",
                "peer0.org3.example.com",
                "peer0.org4.example.com"
            ],
            chaincodeName: chaincodeName,
            channelName: channelName,
            args: [ trxID ]
        }
        setLoading(true)
        await axios({
            method : 'post',
            url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
            headers : {
                Authorization : 'Bearer ' + Cookies.get('token')
            },
            data : body
        }).then((res) => {
            let idTrx = res.data.result.result.txid
            window.location.href =  `/detail-transaksi/${idTrx}`
            setLoading(false)
        }).catch((err) => {
            alert(err.response.data.result)
            setLoading(false)
        })
    }
    //======================== END CONFIRM/REJECT TRANSAKSI ========================//

    return(
       <AsetContext.Provider value={{ 
        numberFormat, formatDate, sortData, inputTrx, setInputTrx, checked, setChecked, showDataFiltered,
        selectedValue, setSelectedValue, dataByRole, statusTrx, detail, setDetail,
        createTrxPenangkar, createTrxPetani, createTrxPengumpul, createTrxPedagangCh1, createTrxPedagangCh2, rejectTrx, confirmTrx, 
        tanamBenihPetani, panenPetani, dataAset,         
        functionGet, dataTrxKeluarPending, setDataTrxKeluarPending, dataTrxKeluarFailed, setDataTrxKeluarFailed, 
        dataTrxKeluarSuccess, setDataTrxKeluarSuccess, dataTrxMasukPending, setDataTrxMasukPending, dataTrxMasukFailed, 
        setDataTrxMasukFailed, dataTrxMasukSuccess, setDataTrxMasukSuccess,
        aset, setAset, currentIndex, setCurrentIndex, getId, setGetId, getIdBenih, setGetIdBenih, getIdMangga, 
        setGetIdMangga, elementPos, getIdTx2, setGetIdTx2, loading, setLoading
        }}>
        {props.children}
       </AsetContext.Provider>
    )

}
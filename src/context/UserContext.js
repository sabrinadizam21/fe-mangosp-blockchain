import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

export const UserContext = createContext()
export const UserProvider = props => {  
  const [ profile, setProfile ] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [ buttonText, setButtonText ] = useState("LOG IN")
  const changeBtnText = (text) => setButtonText(text)    
  let history = useHistory()
  
  // Input login
  const [input, setInput] = useState({
    userName :'', 
    password : ''
  })

  // Input for registration
  const [ inputData, setInputData ] = useState({
    namaLengkap : '',
    alamat : '',
    noTelp : '',
    tglLahir : '',
    nik : '',
    userName : '',
    email : '',
    password : '',
    confirmPassword : '',
    role: '',
    jalur: ''
  })

  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [ allUser, setAllUser ] = useState([])

  const validateInput = e => {
    let { name, value, placeholder, type } = e.target
    setError(prev => {
      const stateObj = { ...prev, [name]: "" }
      if (!value) {
          stateObj[name] = `${placeholder} tidak boleh kosong.`
      }

      if(type === 'number'){
        if(!/[^a-z]/i.test(value)){
          stateObj[name] = `${placeholder} harus berisi angka.`
        }
      }
      switch (name) {
              
        case "password":
          if (!value) {
            stateObj[name] = "Password tidak boleh kosong."
          } else if (inputData.confirmPassword && value !== inputData.confirmPassword) {
            stateObj["confirmPassword"] = "Password dan Konfirmasi Password tidak sama."
          } else if (value.length < 8) {
            stateObj[name] = "Panjang password minimal 8 karakter."
          } else {
            stateObj["confirmPassword"] = inputData.confirmPassword ? "" : error.confirmPassword;
          }
          break
    
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Konfirmasi password tidak boleh kosong."
          } else if (inputData.password && value !== inputData.password) {
            stateObj[name] = "Password dan Konfirmasi Password tidak sama."
          }
          break

        case "nik":
          if(value.length !== 16) {
              stateObj[name] = "Panjang NIK harus 16 karakter."
          }
          break
        
        case "namaPenerima":
          if(value === Cookies.get('username')) stateObj[name] = "Tidak bisa mengirim ke akun sendiri"
          break

        default:
          break
      }
    
      return stateObj
    })
  }

  const functionRegisSubmit = async() => {
    await axios({
      method : 'post',
      url : `http://localhost:4000/register`,
      data : {
        username: inputData.userName,
        password: inputData.password,
        email : inputData.email,
        namaLengkap : inputData.namaLengkap,
        noTelp : inputData.noTelp,
        tglLahir : inputData.tglLahir,
        nik : inputData.nik,
        role :  inputData.role,
        alamat : inputData.alamat,
        jalur: inputData.jalur
      }
    }).then((res)=>{
      let response = res.data
      Cookies.set('token', response.token, {expires : 1})
      if(response.message.jalur === 1){
        Cookies.set('chaincodeName', 'manggach1_cc', {expires : 1})
        Cookies.set('channelName', 'channel1', {expires : 1})
      }
      else if(response.message.jalur === 2){
        Cookies.set('chaincodeName', 'manggach2_cc', {expires : 1})
        Cookies.set('channelName', 'channel2', {expires : 1})
      }
      else if(response.message.jalur === 0){
        Cookies.set('chaincodeName', 'manggach1_cc', {expires : 1})
        Cookies.set('channelName', 'channel1', {expires : 1})
      }
    }).catch((err)=> {
      console.log(err)
    })

    const chaincodeName = await Cookies.get('chaincodeName')
    const channelName = await Cookies.get('channelName')
    const token = await 'Bearer ' + Cookies.get('token')
    await axios({
      method : 'post',
      url : `http://localhost:4000/channels/${channelName}/chaincodes/${chaincodeName}`,
      headers : {
        Authorization: token
      },
      data : {
        fcn: "CreateUser",
        peers: [
            "peer0.org1.example.com",
            "peer0.org2.example.com",
            "peer0.org3.example.com",
            "peer0.org4.example.com"
        ],
        chaincodeName:chaincodeName,
        channelName: channelName,
        args: [
          '{\"noHP\":\"' + inputData.noTelp + 
          '\",\"email\":\"' + inputData.email + 
          '\",\"namaLengkap\": \"' + inputData.namaLengkap + 
          '\",\"username\":\"' + inputData.userName + 
          '\",\"password\":\"' + inputData.password + 
          '\",\"tanggalLahir\":\"' + inputData.tglLahir + 
          '\",\"nik\":' + inputData.nik + 
          ',\"role\":\"' + inputData.role + 
          '\",\"alamat\":\"' + inputData.alamat + 
          '\",\"jalur\":' + parseInt(inputData.jalur) + '}'
        ]
      }
    }).then(async(res) => {
      console.log(res.data)
      Cookies.remove('chaincodeName')
      Cookies.remove('channelName')
      await Cookies.remove('token')
      history.push('/login')
    }).catch((err) => console.log(err))

    
    setInputData({
      namaLengkap : '',
      alamat : '',
      noTelp : '',
      tglLahir : '',
      nik : '',
      userName : '',
      email : '',
      password : '',
      confirmPassword : '',
      role: '',
      jalur: ''
    })
  }

  const getUserLogin = async(username) => {
      const token = "Bearer " + Cookies.get('token')
      axios.get(`http://localhost:4000/profile/${username}`, {
          headers : {
              Authorization : token
          }
      })
      .then((res)=>{
          let profile = res.data[0]
          setProfile(profile) 
          Cookies.set('role', profile.role)
          if(profile.jalur === 1) {
            Cookies.set('chaincodeName', 'manggach1_cc', {expires: 1})
            Cookies.set('channelName', 'channel1', {expires: 1})
          }
          else if (profile.jalur === 2) {
            Cookies.set('chaincodeName', 'manggach2_cc', {expires: 1})
            Cookies.set('channelName', 'channel2', {expires: 1})
          }
          else {
            Cookies.set('chaincodeName', 'manggach1_cc', {expires: 1})
            Cookies.set('channelName', 'channel1', {expires: 1})
          }
      }).catch((res)=>{
          alert("Terjadi kesalahan silahkan login kembali")
          console.log(res)
          Cookies.remove('token')
          Cookies.remove('username')
          Cookies.remove('role')
          Cookies.remove('idTrx')
          Cookies.remove('username')
          Cookies.remove('chaincodeName')
          Cookies.remove('channelName')
          Cookies.set('loginStatus', false)
          window.location.href ='/login'
      })
  }

  const functionLoginSubmit = async() => {
    await axios.post(`http://localhost:4000/login`, {
      username : input.userName,
      password : input.password
    }
    ).then(async (res)=>{
        let access_token = res.data.message.token
        let username = input.userName
        Cookies.set('token', access_token, {expires: 1})
        Cookies.set('username', username, {expires: 1})
        Cookies.set('loginStatus', true, {expires: 1})
        await history.push("/")
        changeBtnText("LOG IN")
    }).catch(err => {
      let message = err.response.data
      if(message.error === 'invalid username') setErrorMessage('Username salah')
      else if (message.error === 'invalid password') setErrorMessage('Password salah')
      changeBtnText("LOG IN")
    })
  }

  const logoutFunction = async() => {
    Cookies.remove('chaincodeName')
    Cookies.remove('channelName')
    Cookies.remove('token')
    Cookies.remove('username')
    Cookies.remove('role')
    Cookies.remove('idBenih')
    Cookies.remove('idTx1')
    Cookies.remove('idMangga')
    Cookies.remove('idTx2')
    Cookies.remove('idTx3')
    Cookies.set('loginStatus', false)
  }

  const getAllUser = async() => {
    await axios.get(`http://localhost:4000/all`, {
      headers : {
        Authorization : 'Bearer ' + Cookies.get('token')
      }
    }).then((res) => {
      let data = res.data.data
      setAllUser(data)
    }).catch(err => console.log(err))
  }
    
  const functionUser = {
      functionRegisSubmit,
      getUserLogin,
      validateInput,
      functionLoginSubmit,
      logoutFunction,
      getAllUser
  }

  return(
      <UserContext.Provider value={{ 
          input, setInput, functionUser, inputData, setInputData, allUser, setAllUser,
          profile, setProfile, error, setError, errorMessage, setErrorMessage, changeBtnText,
          buttonText, setButtonText
      }}>
      {props.children}
      </UserContext.Provider>
  )
}
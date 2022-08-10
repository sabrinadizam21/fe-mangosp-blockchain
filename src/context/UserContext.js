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
      jalur: 0
  })

  const [error, setError] = useState({
      username: '',
      password: '',
      confirmPassword: ''
  })

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
    
        default:
          break
      }
    
      return stateObj
    })
  }

  const functionRegisSubmit = () => {
    //axios.post(`https://mango-bm.herokuapp.com/api/registrasi`, {
    axios.post(`http://localhost:4000/register`, {
        namaLengkap : inputData.namaLengkap,
        alamat : inputData.alamat,
        noTelp : inputData.noTelp,
        tglLahir : inputData.tglLahir,
        nik : inputData.nik,
        email : inputData.email,
        username : inputData.userName,
        password : inputData.password,
        role : inputData.role,
        jalur : parseInt(inputData.jalur)
    }).then((e)=>{
        console.log(e.data)
        history.push('/login')
    }).catch((err)=> {
      let message = err.response.data
      alert(message.error)
    })
    
    const body = {
      fcn: "CreateUser",
      peers: [
          "peer0.penangkar.example.com",
          "peer0.petani.example.com",
          "peer0.pengumpul.example.com",
          "peer0.pedagang.example.com"
      ],
      chaincodeName: "manggach1_cc",
      channelName: "channel1",
      args: [{
        namaLengkap : inputData.namaLengkap,
        alamat : inputData.alamat,
        noTelp : inputData.noTelp,
        tglLahir : inputData.tglLahir,
        nik : inputData.nik,
        email : inputData.email,
        username : inputData.userName,
        password : inputData.password,
        role : inputData.role,
        jalur : parseInt(inputData.jalur)
      }]
    }

    // axios.post(`http://localhost:4000/channels/channel1/chaincodes/manggach1_cc`, {
    //   body
    // })
    console.log(body)
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
            Cookies.set('chaincodeName', 'manggach1_cc')
            Cookies.set('channelName', 'channel1')
          }
          else if (profile.jalur === 2) {
            Cookies.set('chaincodeName', 'manggach2_cc')
            Cookies.set('channelName', 'channel2')
          }
      }).catch((res)=>{
          alert("Terjadi kesalahan silahkan login kembali")
          console.log(res)
          Cookies.remove('token')
          Cookies.remove('username')
          Cookies.remove('role')
          Cookies.remove('idTrx')
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
    Cookies.remove('token')
    Cookies.remove('username')
    Cookies.remove('role')
    Cookies.remove('chaincodeName')
    Cookies.remove('channelName')
    Cookies.set('loginStatus', false)
  }
    
  const functionUser = {
      functionRegisSubmit,
      getUserLogin,
      validateInput,
      functionLoginSubmit,
      logoutFunction
  }

  return(
      <UserContext.Provider value={{ 
          input, setInput, functionUser, inputData, setInputData, 
          profile, setProfile, error, setError, errorMessage, setErrorMessage, changeBtnText,
          buttonText, setButtonText
      }}>
      {props.children}
      </UserContext.Provider>
  )
}
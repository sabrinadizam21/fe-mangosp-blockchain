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
      role: ''
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
    axios.post(`https://mango-bm.herokuapp.com/api/registrasi`, {
        namaLengkap : inputData.namaLengkap,
        alamat : inputData.alamat,
        noTelp : inputData.noTelp,
        tglLahir : inputData.tglLahir,
        nik : inputData.nik,
        email : inputData.email,
        userName : inputData.userName,
        password : inputData.password,
        role : inputData.role
    }).then((e)=>{
        console.log(e.data)
        history.push('/login')
    }).catch(err=> console.log(err))

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
        userName : inputData.userName,
        password : inputData.password,
        role : inputData.role
      }]
    }
    console.log(body)
  }

  const getUserLogin = async(username) => {
      const token = "Bearer " + Cookies.get('token')
      axios.get(`https://mango-bm.herokuapp.com/api/profile/${username}`, {
          headers : {
              Authorization : token
          }
      })
      .then((res)=>{
          let profile = res.data[0]
          setProfile(profile) 
          Cookies.set('role', profile.role)
      }).catch((res)=>{
          alert("Sesi Log In Anda telah berakhir, silahkan Log In kembali")
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
    await axios.post(`https://mango-bm.herokuapp.com/api/login`, {
      userName : input.userName,
      password : input.password
    }
    ).then(async (res)=>{
        let access_token = res.data.accessToken
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
    
  const functionUser = {
      functionRegisSubmit,
      getUserLogin,
      validateInput,
      functionLoginSubmit
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
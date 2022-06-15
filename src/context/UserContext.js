import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

export const UserContext = createContext()
export const UserProvider = props => {
    const [ loginStatus, setLoginStatus ] = useState(false)
    
    const [ profile, setProfile ] = useState([])
    
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
        let { name, value, placeholder } = e.target
        setError(prev => {
        const stateObj = { ...prev, [name]: "" }
        if (!value) {
            stateObj[name] = `${placeholder} tidak boleh kosong.`
        }
          switch (name) {
                 
            case "password":
              if (!value) {
                stateObj[name] = "Password tidak boleh kosong."
              } else if (inputData.confirmPassword && value !== inputData.confirmPassword) {
                stateObj["confirmPassword"] = "Password dan Konfirmasi Password tidak sama."
              } else if (value.length !== 8) {
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
            //console.log(profile)        
        }).catch((err)=>{
            alert(err)
            Cookies.remove('token')
            Cookies.remove('username')
            Cookies.set('loginStatus', false)
            window.location.href ='/login'
        })
    }
    
    const functionUser = {
        functionRegisSubmit,
        getUserLogin,
        validateInput
    }

    return(
       <UserContext.Provider value={{ 
           input, setInput, functionUser, inputData, setInputData, loginStatus, setLoginStatus,
           profile, setProfile, error, setError
        }}>
        {props.children}
       </UserContext.Provider>
    )

}
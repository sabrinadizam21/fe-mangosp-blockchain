import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
export const UserContext = createContext()
export const UserProvider = props => {
    const [ loginStatus, setLoginStatus] = useState(false)
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
        role: ''
    })

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

    const getUserLogin = async (userName) => {
       const token = "Bearer " + Cookies.get('token')
       await axios.get(`https://mango-bm.herokuapp.com/api/profile/${userName}`, {
            headers : {
                Authorization : token
            }
        })
        .then((res)=>{
            let profile = res.data[0]
            setProfile(profile) 
            //console.log(profile)        
        }).catch(err=> console.log(err))
    }
    
    const functionUser = {
        functionRegisSubmit,
        getUserLogin
    }

    return(
       <UserContext.Provider value={{ 
           input, setInput, loginStatus, setLoginStatus, functionUser, inputData, setInputData,
           profile, setProfile
        }}>
        {props.children}
       </UserContext.Provider>
    )

}
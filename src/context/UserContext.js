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

    const fecthDataById = async(userName) => {
        const token = "Bearer " + Cookies.get('token')
        axios.get(`https://mango-bm.herokuapp.com/api/profile/${userName}`, {
            headers : {
                Authorization : token
            }
        })
        .then((res)=>{
            let profile = res.data
            setProfile(profile)
            console.log(profile)
            // setInputData({
            //     userName : profile.userName, 
            //     password : profile.password, 
            //     email : profile.email, 
            //     namaLengkap : profile.namaLengkap, 
            //     noTelp : profile.noTelp, 
            //     tglLahir : profile.tglLahir, 
            //     nik : profile.nik, 
            //     role : profile.role, 
            //     alamat : profile.alamat, 
            //     createdAt : profile.createdAt, 
            //     UpdateAt : profile.UpdateAt
            // })
            // setCurrentIndex(profile.id)            
        }).catch(err=> console.log(err))
    }
    
    const functionUser = {
        functionRegisSubmit,
        fecthDataById
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
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'
import { useHistory } from 'react-router-dom'
import { Input } from '../../components/Input';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'
import Cookies from 'js-cookie';

function Login() {

  const { input, setInput, setLoginStatus, functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser
  const [passwordType, setPasswordType] = useState("password")
  const [ inputText, setInputText] = useState("LOG IN")
  const changeText = (text) => setInputText(text)
  
  let history = useHistory()
  
  const functionLoginSubmit = async() => {
    axios.post(`https://mango-bm.herokuapp.com/api/login`, {
      userName : input.userName,
      password : input.password
    }
    ).then((res)=>{
        let access_token = res.data.accessToken
        let username = input.userName
        Cookies.set('token', access_token, {expires: 1})
        Cookies.set('username', username, {expires: 1})
        setLoginStatus(true)
        Cookies.set('loginStatus', true, {expires: 1})
        history.push("/")
        console.log(res)
    }).catch((res)=> {
      console.log(res)
      changeText("LOG IN")
    })
}

  const handleChange = (event) => {
    let {value, name} = event.target
    setInput({...input, [name]:value})
    validateInput(event)
  }

  const handleSubmit = (event) => {
    event.preventDefault()  
    functionLoginSubmit() 
  }

  const showPassword = () => {
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  return (
    <>
        <div className="wrapper">
          <div className="section">            
            <span className="title">Login</span> 
            <div className="content">          
              <form onSubmit={handleSubmit}> 
                <Input type="text" name="userName" id="userName" placeholder='Username' errorMsg={error.userName}
                value={input.userName} onChange={handleChange} label='Username'  onBlur={validateInput}/>
              
                <Input type={passwordType} name="password" id="password" placeholder='Password' errorMsg={error.password}
                value={input.password} onChange={handleChange} label='Password' minLength={8}  onBlur={validateInput}/>
                
                <label className="show-password">
                  <input type="checkbox" onClick={showPassword} /> Lihat password
                </label>
                
                <input type="submit" value={inputText} className="btn-link" disabled={!input}
                onClick={() => {
                  changeText("Loading...");
                  setTimeout(() => {
                    changeText("LOG IN");
                  }, 5000);}} 
                />
              </form>
              <Link to='/register' className="btn-link">
                <p>Belum punya akun? Registrasi</p>
              </Link>
            </div> 
          </div>
        </div>
        
    </>
  )
}

export default Login
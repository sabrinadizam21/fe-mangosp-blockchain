import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './Login.css'
import { Input } from '../../components/Input';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'
import Cookies from 'js-cookie';

function Login() {

  const { input, setInput, setLoginStatus, functionUser, error } = useContext(UserContext)
  const { validateInput } = functionUser
  const [passwordType, setPasswordType] = useState("password");
  const [ inputText, setInputText] = useState("LOG IN")
  const changeText = (text) => setInputText(text);
  
  let history = useHistory()
  
  const functionLoginSubmit = async() => {
    axios.post(`https://mango-bm.herokuapp.com/api/login`, {
      userName : input.userName,
      password : input.password
    }
    ).then(async(res)=>{
        let access_token = res.data.accessToken
        let username = input.userName
        Cookies.set('token', access_token, {expires: 1})
        Cookies.set('username', username, {expires: 1})
        setLoginStatus(true)
        Cookies.set('loginStatus', true, {expires: 1})
        history.push("/")
    }).catch((res)=> alert(res))
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
                <Input type="text" name="userName" id="userName" placeholder='Username' 
                value={input.userName} onChange={handleChange} label='Username'  onBlur={validateInput}/>
                {error.userName && <span className='err'>{error.userName}</span>}

                <Input type={passwordType} name="password" id="password" placeholder='Password' 
                value={input.password} onChange={handleChange} label='Password' minLength={8}  onBlur={validateInput}/>
                {error.password && <span className='err'>{error.password}<br /></span>}
                
                <label className="show-password">
                  <input type="checkbox" onClick={showPassword} /> Lihat password
                </label>

                <input type="submit" value={inputText} onClick={() => changeText("Loading...")} className="btn-link" />
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
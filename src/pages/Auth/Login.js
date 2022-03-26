import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import './Login.css'
import { UserContext } from '../../context/UserContext'
import { Input } from '../../components/Input';

function Login() {

  const {loginStatus, setLoginStatus, userLists} = useContext(UserContext)

  let history = useHistory()

  const [input, setInput] = useState({
    email :'', 
    password : '',
    message:''
  })

  const handleChange = (event) => {
    let {value, name} = event.target
    setInput({...input, [name]:value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let authData = userLists.find((e) => e.email === input.email && e.password === input.password)
    if(authData){
      setLoginStatus(true)
      Cookies.set('email', authData.email, {expires: 1})
      Cookies.set('password', authData.password, {expires: 1})
      history.push("/register")
    } else {
      alert("email atau password salah")
    }
    
  }

  return (
    <>
        <div className="login__wrapper">
          <div className="login__section">            
            <span className="login__title">Login</span>            
            <form onSubmit={handleSubmit}> 
              <Input className='email' type="email" name="email" id="email" placeholder='Email' 
              value={input.email} onChange={handleChange} label='Email'/>

              <Input className='password' type="password" name="password" id="password" placeholder='Password' 
              value={input.password} onChange={handleChange} label='Password '/>

              <input type="submit" value='LOG IN' className="btn-link" />
            </form>
            <Link to='/registrasi' className="btn-link">
              <p>Belum punya akun? Registrasi</p>
            </Link>
          </div>
        </div>
        
    </>
  )
}

export default Login
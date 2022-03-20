import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import './Login.css'

function Login() {

  const [ loginStatus, setLoginStatus] = useState(false)
  let history = useHistory()

  const userLists= [
    {email :'penangkar@mail.com', password : 'password', role : 1, username : 'penangkar', name : 'pak penangkar'},
    {email :'petani@mail.com', password : 'password', role : 2, username : 'petani', name : 'pak petani'},
    {email :'pengumpul@mail.com', password : 'password', role : 3, username : 'pengumpul', name : 'pak pengumpul'},
    {email :'pedagang@mail.com', password : 'password', role : 4, username : 'pedagang', name : 'pak pedagang'}
  ]

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
              <div className="login__email">
                <div className="login__label-form">
                  <label htmlFor="">Email atau username<span style={{color: 'red'}}>*</span></label>
                </div>
                
                <div className="login__input-email">
                  <input type="email" name="email" id="email" placeholder='Email atau username' value={input.email} onChange={handleChange}  required/>
                </div>
              </div>

              <div className="login__password">
                <div className="login__label-form">
                  <label htmlFor="">Password<span style={{color: 'red'}}>*</span></label>
                </div>
                
                <div className="login__input">
                  <input type="password" name="password" id="password" placeholder='Password' value={input.password} onChange={handleChange}  required/>
                </div>
              </div>

              <input type="submit" className="btn-link" />
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
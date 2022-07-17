import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'
import { Input } from '../../components/Input'
import { UserContext } from '../../context/UserContext'

function Login() {

  const { input, setInput, functionUser, error, changeBtnText, errorMessage, buttonText } = useContext(UserContext)
  const { validateInput, functionLoginSubmit } = functionUser
  const [passwordType, setPasswordType] = useState("password")

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
                
                <input type="submit" value={buttonText} className="btn-link" disabled={!input.userName.length || !input.password.length}
                onClick={() => {
                  changeBtnText("Loading...");
                  }} 
                />

                {errorMessage && <p className="errorMessage"> {errorMessage} </p> }
              </form>
              <div className="link-login-regis">
                <Link to='/register' className='link'>
                  Belum punya akun? Registrasi
                </Link>
              </div>
            </div> 
          </div>
        </div>
        
    </>
  )
}

export default Login
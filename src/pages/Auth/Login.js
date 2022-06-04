import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './Login.css'
import { Input } from '../../components/Input';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'
import Cookies from 'js-cookie';

function Login() {

  const { input, setInput, setLoginStatus, functionUser } = useContext(UserContext)
  const { getUserLogin } = functionUser
  
  let history = useHistory()
  
  const functionLoginSubmit = () => {
    axios.post(`https://mango-bm.herokuapp.com/api/login`, {
      userName : input.userName,
      password : input.password
    }
    ).then((res)=>{
        let access_token = res.data.accessToken
        let status = res.data.status
        let username = status.substring(15)
        Cookies.set('token', access_token, {expires: 1})
        Cookies.set('username', username, {expires: 1})
        setLoginStatus(true)
        history.push("/")
    }).catch((res)=> alert(res))
}

  const handleChange = (event) => {
    let {value, name} = event.target
    setInput({...input, [name]:value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()  
    functionLoginSubmit() 
  }

  return (
    <>
        <div className="wrapper">
          <div className="section">            
            <span className="title">Login</span> 
            <div className="content">          
              <form onSubmit={handleSubmit}> 
                <Input type="text" name="userName" id="userName" placeholder='Username' 
                value={input.userName} onChange={handleChange} label='Username'/>

                <Input type="password" name="password" id="password" placeholder='Password' 
                value={input.password} onChange={handleChange} label='Password' minLength={6}/>

                <input type="submit" value='LOG IN' className="btn-link" />
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
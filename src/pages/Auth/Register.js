import React, { useState,  useContext } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { Input } from '../../components/Input';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router';

function Register() {

  const {userLists, setUserLists} = useContext(UserContext)
  const [ inputData, setInputData ] = useState({
    nama : '',
    alamat : '',
    nomorTelp : '',
    tglLahir : '',
    nik : '',
    email : '',
    username : '',
    password : '',
    role: 0
  })
  const [currentIndex, setCurrentIndex] = useState(-1)
  let history = useHistory()

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputData({...inputData, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newData = userLists
    if(currentIndex === -1){
      setUserLists([...userLists, {
        nama : inputData.nama,
        alamat : inputData.alamat,
        nomorTelp : parseInt(inputData.nomorTelp),
        tglLahir : inputData.tglLahir,
        nik : parseInt(inputData.nik),
        email : inputData.email,
        username : inputData.username,
        password : inputData.password,
        role : parseInt(inputData.role)
      }])
      history.push('/login')
      console.log(newData)
    }
    else {
        newData[currentIndex] = inputData
    }
  }
  return (
    <>
        <div className="register__wrapper">
          <div className="register__section">
            
            <span className="register__title">Register</span>
            
            <form onSubmit={handleSubmit}>              
              <div className="register__label-form">
                <label htmlFor="">Role<span style={{color: 'red'}}>*</span></label>
              </div>

              <div className="register-radio">
                <label className="register__radio-role"> Penangkar
                  <input type="radio" name="role" id="penangkar" value={1} onChange={handleChange} required/>
                  <span className="checkmark"></span>
                </label>

                <label className="register__radio-role">Petani
                  <input type="radio" name="role" value={2} onChange={handleChange} id="petani"/>
                  <span className="checkmark"></span>
                </label>

                <label className="register__radio-role">Pengumpul
                  <input type="radio" name="role" value={3} onChange={handleChange} id="pengumpul"/>
                  <span className="checkmark"></span>
                </label>

                <label className="register__radio-role">Pedagang
                  <input type="radio" name="role" value={4} onChange={handleChange} id="pedagang"/>
                  <span className="checkmark"></span>
                </label>
              </div>
              
              <Input className='text' type="text" name="nama" id="nama" placeholder='Nama Lengkap' 
              value={inputData.nama} onChange={handleChange} label='Nama lengkap'/>
              
              <Input className='text' type="text" name="alamat" id="alamat" placeholder='Alamat' 
              value={inputData.alamat} onChange={handleChange} label='Alamat'/>
              
              <Input className='number' type="number" name="nomorTelp" id="nomorTelp" placeholder='Nomor Telepon' 
              value={inputData.nomorTelp} onChange={handleChange} label='Nomor Telepon' minLength={10}/>

              <Input className='date' type="date" name="tglLahir" id="tglLahir" placeholder='Tanggal Lahir' 
              value={inputData.tglLahir} onChange={handleChange} label='Tanggal Lahir'/>

              <Input className='number' type="number" name="nik" id="nik" placeholder='NIK' 
              value={inputData.nik} onChange={handleChange} label='NIK'/>
              
              <Input className='email' type="email" name="email" id="email" placeholder='Email' 
              value={inputData.email} onChange={handleChange} label='Email'/>

              <Input className='text' type="text" name="username" id="username" placeholder='Username' 
              value={inputData.username} onChange={handleChange} label='Username'/>

              <Input className='password' type="password" name="password" id="password" placeholder='Password' 
              value={inputData.password} onChange={handleChange} label='Password' minLength={6}/>

              <input type="submit" value={'REGISTER'} className="btn-link" />

            </form>
            <Link to='/login' className="btn-link">
              <p>Sudah punya akun? Log In</p>
            </Link>
          </div>
        </div>
    </>
  )
}

export default Register
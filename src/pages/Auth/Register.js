import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { Input } from '../../components/Input';
import { UserContext } from '../../context/UserContext';

function Register() {
  const { error, inputData, setInputData, functionUser } = useContext(UserContext)
  const { functionRegisSubmit, validateInput } = functionUser

  const handleChange = (event) => {
    let {value, name} = event.target
    setInputData({...inputData, [name]:value})
    validateInput(event)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    functionRegisSubmit()
  }
  return (
    <>
        <div className="wrapper">
          <div className="section">
            <span className="title">Register</span>
            <div className="content">
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
                
                <Input className='text' type="text" name="namaLengkap" id="namaLengkap" placeholder='Nama Lengkap' 
                value={inputData.namaLengkap} onChange={handleChange} label='Nama lengkap' onBlur={validateInput}/>
                {error.namaLengkap && <span className='err'>{error.namaLengkap}</span>}
                
                <Input className='text' type="text" name="alamat" id="alamat" placeholder='Alamat' 
                value={inputData.alamat} onChange={handleChange} label='Alamat' onBlur={validateInput}/>
                {error.alamat && <span className='err'>{error.alamat}</span>}
                
                <Input className='number' type="number" name="noTelp" id="noTelp" placeholder='Nomor Telepon' 
                value={inputData.noTelp} onChange={handleChange} label='Nomor Telepon' minLength={10} onBlur={validateInput}/>
                {error.noTelp && <span className='err'>{error.noTelp}</span>}

                <Input className='date' type="date" name="tglLahir" id="tglLahir" placeholder='Tanggal Lahir' 
                value={inputData.tglLahir} onChange={handleChange} label='Tanggal Lahir' onBlur={validateInput}/>
                {error.tglLahir && <span className='err'>{error.tglLahir}</span>}

                <Input className='number' type="number" name="nik" id="nik" placeholder='NIK' 
                value={inputData.nik} onChange={handleChange} label='NIK' maxLength={16} minLength={16} onBlur={validateInput}/>
                {error.nik && <span className='err'>{error.nik}</span>}
                
                <Input className='email' type="email" name="email" id="email" placeholder='Email' 
                value={inputData.email} onChange={handleChange} label='Email' onBlur={validateInput}/>
                {error.email && <span className='err'>{error.email}</span>}

                <Input className='text' type="text" name="userName" id="userName" placeholder='Username' 
                value={inputData.userName} onChange={handleChange} label='Username' onBlur={validateInput}/>
                {error.userName && <span className='err'>{error.userName}</span>}

                <Input className='password' type="password" name="password" id="password" placeholder='Password' 
                value={inputData.password} onChange={handleChange} label='Password' minLength={8} onBlur={validateInput}/>
                {error.password && <span className='err'>{error.password}</span>}
                
                <Input className='password' type="password" name="confirmPassword" 
                id="confirmPassword" placeholder='Konfirmasi Password' value={inputData.confirmPassword} 
                onChange={handleChange} label='Konfirmasi Password' minLength={6} onBlur={validateInput} />
                {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}

                <input type="submit" value={'REGISTER'} className="btn-link" />

              </form>
              <Link to='/login' className="btn-link">
                <p>Sudah punya akun? Log In</p>
              </Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default Register
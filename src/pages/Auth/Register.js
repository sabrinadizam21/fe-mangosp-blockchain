import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'
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
    console.log(inputData)
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

                <div className="register__dropdown">
                  <select className='register__role' name="role" id="role" onChange={handleChange} required onBlur={validateInput}>
                    <option value="" selected disabled hidden>Pilih role</option>
                    <option id="penangkar" value={1}>Penangkar</option>
                    <option id="petani" value={2}>Petani</option>
                    <option id="pengumpul" value={3}>Pengumpul</option>
                    <option id="pedagang" value={4}>Pedagang</option>
                  </select>
                  {error.role && <span className='err'>Pilih salah satu role</span>}
                </div>
                
                <Input className='text' type="text" name="namaLengkap" id="namaLengkap" placeholder='Nama Lengkap' 
                value={inputData.namaLengkap} onChange={handleChange} label='Nama lengkap' onBlur={validateInput}
                errorMsg={error.namaLengkap} />
                
                <Input className='text' type="text" name="alamat" id="alamat" placeholder='Alamat' 
                value={inputData.alamat} onChange={handleChange} label='Alamat' onBlur={validateInput}
                errorMsg={error.alamat} />
                
                <Input className='number' type="number" name="noTelp" id="noTelp" placeholder='Nomor Telepon' 
                value={inputData.noTelp} onChange={handleChange} label='Nomor Telepon' minLength={10} onBlur={validateInput}
                errorMsg={error.noTelp} />

                <Input className='date' type="date" name="tglLahir" id="tglLahir" placeholder="Tanggal Lahir" 
                value={inputData.tglLahir} onChange={handleChange} label='Tanggal Lahir' onBlur={validateInput}
                errorMsg={error.tglLahir} />

                <Input className='number' type="number" name="nik" id="nik" placeholder='NIK' 
                value={inputData.nik} onChange={handleChange} label='NIK' maxLength={16} minLength={16} onBlur={validateInput}
                errorMsg={error.nik} />
                
                <Input className='email' type="email" name="email" id="email" placeholder='Email' 
                value={inputData.email} onChange={handleChange} label='Email' onBlur={validateInput}
                errorMsg={error.email} />

                <Input className='text' type="text" name="userName" id="userName" placeholder='Username' 
                value={inputData.userName} onChange={handleChange} label='Username' onBlur={validateInput}
                errorMsg={error.userName} />

                <Input className='password' type="password" name="password" id="password" placeholder='Password' 
                value={inputData.password} onChange={handleChange} label='Password' minLength={8} onBlur={validateInput}
                errorMsg={error.password} />
                
                <Input className='password' type="password" name="confirmPassword" 
                id="confirmPassword" placeholder='Konfirmasi Password' value={inputData.confirmPassword} 
                onChange={handleChange} label='Konfirmasi Password' minLength={6} onBlur={validateInput} 
                errorMsg={error.confirmPassword} />
                
                {inputData.role != 1 && inputData.role !='' ? 
                  <div>
                    <p>Skala Transaksi Anda<span style={{color: 'red'}}>*</span> </p>
                    <div>
                      <label>
                        <input type="radio" name="jalur" id="pedagangBesar" value={1} onChange={handleChange} required/> Lintas Provinsi
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" name="jalur" id="pedagangKecil" value={2} onChange={handleChange} /> Lintas daerah
                      </label>
                    </div>
                  </div>
                : 
                <>
                  <input type="number" name='jalur' id='Semua' onChange={handleChange} value={0} required hidden /> 
                </>
                }
                <input type="submit" value={'REGISTER'} className="btn-link" 
                disabled={!inputData.namaLengkap || !inputData.alamat || !inputData.noTelp || !inputData.tglLahir || 
                !inputData.nik || !inputData.email || !inputData.userName || !inputData.password || 
                !inputData.confirmPassword}/>

              </form>

              <div className="link-login-regis">
                <Link to='/login' className="link">Sudah punya akun? Log In</Link>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Register
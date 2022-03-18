import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <>
        <div className="login__wrapper">
          <div className="login__section">
            
            <span className="login__title">Login</span>
            
            <form action="">              
              <div className="login__label-form">
                <label htmlFor="">Role<span style={{color: 'red'}}>*</span></label>
              </div>

              <div className="login-radio">
                <label className="login__radio-role"> Penangkar
                  <input type="radio" name="role" id="penangkar" required/>
                  <span class="checkmark"></span>
                </label>

                <label className="login__radio-role">Petani
                  <input type="radio" name="role" id="petani"/>
                  <span class="checkmark"></span>
                </label>

                <label className="login__radio-role">Pengumpul
                  <input type="radio" name="role" id="pengumpul"/>
                  <span class="checkmark"></span>
                </label>

                <label className="login__radio-role">Pedagang
                  <input type="radio" name="role" id="pedagang"/>
                  <span class="checkmark"></span>
                </label>
              </div>
              
              <div className="login__email">
                <div className="login__label-form">
                  <label htmlFor="">Email atau username<span style={{color: 'red'}}>*</span></label>
                </div>
                
                <div className="login__input-email">
                  <input type="email" name="email" id="email" placeholder='Email atau username' required/>
                </div>
              </div>

              <div className="login__password">
                <div className="login__label-form">
                  <label htmlFor="">Password<span style={{color: 'red'}}>*</span></label>
                </div>
                
                <div className="login__input">
                <span class="btn-show-pass">
                  <i class="zmdi zmdi-eye"></i>
                </span>
                  <input type="password" name="password" id="password" placeholder='Password' required/>
                </div>
              </div>

              <input type="submit" value='LOG IN' className="btn-link" />

              {/* <Link type='submit' className="btn-link" >
                <Button buttonSize='btn--wide' buttonColor='primary'>
                  LOG IN
                </Button>
              </Link> */}
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
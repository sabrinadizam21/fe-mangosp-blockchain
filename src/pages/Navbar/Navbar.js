import { React, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { MdFingerprint } from 'react-icons/md'
import { Button } from '../../components/Button'
import './Navbar.css'
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie';

function Navbar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  const showButton = () => {
    if(window.innerWidth <= 720){
      setButton(false)
    }
    else{
      setButton(true)
    }
  }
  window.addEventListener('resize', showButton);
  
  const { setLoginStatus } = useContext(UserContext)

  const handleLogout = async () => {
    Cookies.remove('token')
    Cookies.remove('username')
    Cookies.remove('role')
    //await setLoginStatus(false)
    Cookies.set('loginStatus', false)
    window.location.href ='/login'
  }
  

  return (
    <>
        <div className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
              <MdFingerprint className='navbar-icon' /> MangoSP
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes/> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link to='/' className="nav-links" onClick={closeMobileMenu}>Beranda</Link>
              </li>
              { Cookies.get('token') !== undefined && (
              <>
                <li className="nav-item">
                  <Link to='/aset' className="nav-links" onClick={closeMobileMenu}>Aset</Link>
                </li>
                <li className="nav-item">
                <Link to='/transaksi' className="nav-links" onClick={closeMobileMenu}>Transaksi</Link>
                {/* <div class="dropdown">
                  <a className="dropbtn nav-links">Transaksi</a>
                  <div className="dropdown-content">
                    <a href="/transaksi/pilih-aset" onClick={closeMobileMenu}>Buat Transaksi</a>
                    <a href="/transaksi/masuk" onClick={closeMobileMenu}>Transaksi Masuk</a>
                    <a href="/transaksi/keluar" onClick={closeMobileMenu}>Transaksi Keluar</a>
                  </div>
                </div> */}
                </li>
                <li className="nav-item">
                  <Link to={'/profil'} className="nav-links" onClick={closeMobileMenu}>Profil</Link>
                </li> 
                <li className="nav-btn">
                  {button ? (
                    <Button className="btn-link" buttonStyle='btn--outline' onClick={handleLogout}>LOG OUT</Button>
                    
                  ) : 
                    <Button className='btn-link' onClick={()=>{closeMobileMenu(); handleLogout()}} buttonStyle='btn--outline' buttonSize='btn--mobile'>LOG OUT</Button>
                   }                
                </li>
              </>
              )}

              {Cookies.get('token') === undefined && (
              <>
                <li className="nav-btn">
                  {button ? (
                    <Link to='/register' className="btn-link">
                      <Button buttonStyle='btn--outline'>REGISTER</Button>
                    </Link>
                  ) : <Link to='/register' className='btn-link' onClick={closeMobileMenu}>
                    <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>REGISTER</Button>
                  </Link> }                
                </li>
                <li className="nav-btn">
                  {button ? (
                    <Link to='/login' className="btn-link">
                      <Button buttonStyle='btn--outline' onClick={handleLogout}>LOGIN</Button>
                    </Link>
                  ) : <Link to='/login' className='btn-link' onClick={closeMobileMenu}>
                    <Button buttonStyle='btn--outline' buttonSize='btn--mobile' onClick={handleLogout}>LOG IN</Button>
                  </Link> }                
                </li>
              </>
              )}  
            </ul>
          </div>
        </div>
    </>
  )
}

export default Navbar
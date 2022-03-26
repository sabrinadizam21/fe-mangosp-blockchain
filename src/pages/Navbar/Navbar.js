import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { MdFingerprint } from 'react-icons/md'
import { Button } from '../../components/Button'
import './Navbar.css'

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
              {/* <li className="nav-item">
                <Link to='/channel' className="nav-links" onClick={closeMobileMenu}>Channel</Link>
              </li>
              <li className="nav-item">
                <Link to='/aset' className="nav-links" onClick={closeMobileMenu}>Aset</Link>
              </li>
              <li className="nav-item">
                <Link to='/transaksi' className="nav-links" onClick={closeMobileMenu}>Transaksi</Link>
              </li>
              <li className="nav-item">
                <Link to='/Profil' className="nav-links" onClick={closeMobileMenu}>Profil</Link>
              </li> 
              <li className="nav-btn">
                {button ? (
                  <Link to='/logout' className="btn-link">
                    <Button buttonStyle='btn--outline'>LOG OUT</Button>
                  </Link>
                ) : <Link to='/logout' className='btn-link' onClick={closeMobileMenu}>
                  <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>LOG OUT</Button>
                </Link> }                
              </li> */}
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
                    <Button buttonStyle='btn--outline'>LOGIN</Button>
                  </Link>
                ) : <Link to='/login' className='btn-link' onClick={closeMobileMenu}>
                  <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>LOG IN</Button>
                </Link> }                
              </li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default Navbar
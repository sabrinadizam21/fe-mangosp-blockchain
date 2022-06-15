import React, {useContext, useEffect} from 'react'
import { UserContext } from '../../context/UserContext'
import { FiUser } from "react-icons/fi"
import './Profil.css'
import Cookies from 'js-cookie'

function Profil() {
  const { profile, functionUser } = useContext(UserContext)
  const { getUserLogin } = functionUser
  
  const userRole = (role) => {
    if (role === 1) return 'Penangkar'
    else if (role === 2) return 'Petani'
    else if (role === 3) return 'Pengumpul'
    else if (role === 4) return 'Pedagang'
  }

  useEffect(()=>{
    getUserLogin(Cookies.get('username'))
  }, [])

  return (
    <>
      <div className="wrapper">
        <div className="section">
          <div className="header">
            <div className="title">Profil</div>
          </div>
          <div className="content">
            <div className="head-profile">
              <FiUser className='iconProfile'/>
              <div className='head-profile-text'>
                <p className='namaLengkap'>{profile.namaLengkap}</p>
                <p className='role'>{userRole(profile.role)}</p>
              </div>
            </div>
            <div className="bottom-profile">
              <div className="profile-detail">
                <p>Username</p>
                <p>{profile.userName}</p>
              </div>
              <div className="profile-detail">
                <p>Email</p>
                <p>{profile.email}</p>
              </div>        
              <div className="profile-detail">
                <p>Tanggal Lahir</p>
                <p>{profile.tglLahir}</p>
              </div>
              <div className="profile-detail">
                <p>NIK</p>
                <p>{profile.nik}</p>
              </div>
              <div className="profile-detail">
                <p>Nomor Telepon</p>
                <p>{profile.noTelp}</p>
              </div>
              <div className="profile-detail">
                <p>Alamat</p>
                <p>{profile.alamat}</p>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </>
  )
}

export default Profil
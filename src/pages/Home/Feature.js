import React from 'react';
import './Feature.css';
import { FaFire } from 'react-icons/fa';
import { BsXDiamondFill } from 'react-icons/bs';
import { GiCrystalize } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';

function Feature() {
  return (
    <IconContext.Provider value={{ color: '#fff', size: 64 }}>
      <div className='feature__section'>
        <div className='feature__wrapper'>
          <h1 className='feature__heading'>Fitur Kami</h1>
          <div className='feature__container'>
            <Link to='/aset' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                <FaFire className='icon'/>
                <h3>Aset</h3>
                <p>Cek aset yang Anda miliki</p>
              </div>
            </Link>
            <Link to='/transaksi' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                  <BsXDiamondFill className='icon'/>
                <h3>Transaksi</h3>
                <p>Lihat list transaksi masuk dan keluar</p>
              </div>
            </Link>
            <Link to='/transaksi/buat' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                  <GiCrystalize className='icon'/>
                <h3>Buat Transaksi</h3>
                <p>Lakukan transaksi dengan pengguna lain</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default Feature;
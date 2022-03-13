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
            <Link to='/channel' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                <div className='icon'>
                  <FaFire />
                </div>
                <h3>Channel</h3>
                <p>asfsafsadf</p>
              </div>
            </Link>
            <Link to='/aset' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                <div className='icon'>
                  <BsXDiamondFill />
                </div>
                <h3>Aset</h3>
                <p>asfsafsadf</p>
              </div>
            </Link>
            <Link to='/transaksi' className='feature__container-card'>
              <div className='feature__container-cardInfo'>
                <div className='icon'>
                  <GiCrystalize />
                </div>
                <h3>Transaksi</h3>
                <p>asfsafsadf</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default Feature;
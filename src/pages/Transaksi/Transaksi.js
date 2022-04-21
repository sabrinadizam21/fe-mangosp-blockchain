import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import './Transaksi.css'
import { GrLinkBottom, GrLinkTop } from "react-icons/gr"

function Transaksi() {
  return (
    <>
        <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>
                        <div className="title">Transaksi</div>
                        <div className="subtitle">Daftar transaksi yang anda lakukan</div>
                    </div>
                    <div className="btn-header">
                    <Link to='/transaksi/buat'>
                        <Button buttonColor='primary'>BUAT TRANSAKSI</Button>
                    </Link>
                    </div>
                </div>
                <div className="content">
                    <div className="trx-type">
                        <Link to='/transaksi/masuk' className="trx-btn">
                            <div className="trx-btn-info">
                                <GrLinkBottom className='iconTrx'/>
                                <span>Transaksi Masuk</span>
                            </div>
                        </Link>
                        <Link to='/transaksi/keluar' className="trx-btn">
                            <div className="trx-btn-info">
                                <GrLinkTop className='iconTrx'/>
                                <span>Transaksi Keluar</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Transaksi
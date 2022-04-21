import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Navbar from '../pages/Navbar/Navbar'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Footer from '../pages/Footer/Footer'
import Home from '../pages/Home/Home'
import Aset from '../pages/Aset/Aset'
import DaftarAset from '../pages/Aset/DaftarAset'
import { AsetProvider } from '../context/AsetContext'
import DetailTransaksi from '../pages/Transaksi/DetailTransaksi'
import Transaksi from '../pages/Transaksi/Transaksi'
import TransaksiMasuk from '../pages/Transaksi/TransaksiMasuk'
import TransaksiKeluar from '../pages/Transaksi/TransaksiKeluar'
import TransaksiForm from '../pages/Transaksi/TransaksiForm'

function Routes() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />            
            <Route path='/login' exact component={Login} />
            <Route path='/detail-transaksi' exact component={DetailTransaksi} />
            <Route path='/transaksi' exact component={Transaksi} />
            <Route path='/transaksi/masuk' exact component={TransaksiMasuk} />
            <Route path='/transaksi/keluar' exact component={TransaksiKeluar} />
            <Route path='/transaksi/buat' exact component={TransaksiForm} />
            <AsetProvider>
              <Route path='/aset' exact component={Aset} />
              <Route path='/aset/daftaraset' exact component={DaftarAset} />
            </AsetProvider>
        </Switch>
        <Footer />
    </Router>
  )
}

export default Routes
import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Cookies from 'js-cookie'
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
import TanamBenih from '../pages/Aset/TanamBenih'
import Panen from '../pages/Aset/Panen'
import { UserProvider } from '../context/UserContext'
import RoleBasedRouting from '../components/RoleBasedRouting'
import KonfirmasiTransaksi from '../pages/Transaksi/KonfirmasiTransaksi'
import Profil from '../pages/Profile/Profil'
import ListAsetTransaksi from '../pages/Transaksi/ListAsetTransaksi'

function Routes() {
  const LoginRoute = ({...props}) => {
    if(Cookies.get('token') !== undefined){
      return <Redirect to="/" />
    } else if(Cookies.get('token') === undefined){
      return <Route {...props} />
    }
  }
  const PrivateRoute = ({...props}) => {
      if(Cookies.get('token') !== undefined){
        return <Route {...props} />
      }else if(Cookies.get('token') === undefined){
        return <Redirect to="/login" />
      }
  }
  
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
            <LoginRoute path='/register' exact component={Register} />            
            <LoginRoute path='/login' exact component={Login} />
            <PrivateRoute path='/detail-transaksi' exact component={DetailTransaksi} />
            <PrivateRoute path='/transaksi' exact component={Transaksi} />
            <PrivateRoute path='/transaksi/masuk' exact component={TransaksiMasuk} />
            <PrivateRoute path='/transaksi/keluar' exact component={TransaksiKeluar} />
            <PrivateRoute path='/transaksi/pilih-aset' exact component={ListAsetTransaksi} />
            <PrivateRoute path='/profil' exact component={Profil} /> 
            <RoleBasedRouting path='/tanam-benih' exact component={TanamBenih} roles={2} />
            <RoleBasedRouting path='/panen' exact component={Panen} roles={2}/>
            <AsetProvider>
              <PrivateRoute path='/konfirmasi' exact component={KonfirmasiTransaksi}/>
              <PrivateRoute path='/transaksi/buat' exact component={TransaksiForm} />
              <PrivateRoute path='/aset/daftaraset' exact component={DaftarAset} />
              <PrivateRoute path='/aset' exact component={Aset} />
            </AsetProvider>    
        </Switch>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default Routes
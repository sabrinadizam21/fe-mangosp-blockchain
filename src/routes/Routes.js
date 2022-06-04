import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Cookies from 'js-cookie';
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
import TanamBenih from '../pages/Aset/TanamBenih';
import Panen from '../pages/Aset/Panen';
import { UserProvider } from '../context/UserContext';
import RoleBasedRouting from '../components/RoleBasedRouting';
import Profil from '../pages/Profil';

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
            <PrivateRoute path='/profil' exact component={Profil} />
            <PrivateRoute path='/detail-transaksi' exact component={DetailTransaksi} />
            <PrivateRoute path='/transaksi' exact component={Transaksi} />
            <PrivateRoute path='/transaksi/masuk' exact component={TransaksiMasuk} />
            <PrivateRoute path='/transaksi/keluar' exact component={TransaksiKeluar} />
            <PrivateRoute path='/transaksi/buat' exact component={TransaksiForm} />
            <RoleBasedRouting path='/tanam-benih' exact component={TanamBenih} roles={2} />
            {/* <PrivateRoute path='/panen' exact component={Panen} /> */}
            <RoleBasedRouting path='/panen' exact component={Panen} roles={2}/>
            <AsetProvider>
              <PrivateRoute path='/aset' exact component={Aset} />
              <PrivateRoute path='/aset/daftaraset' exact component={DaftarAset} />
            </AsetProvider>
        </Switch>
        <Footer />
        </UserProvider>
    </Router>
  )
}

export default Routes
import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Navbar from '../pages/Navbar/Navbar'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Footer from '../pages/Footer/Footer'
import Home from '../pages/Home/Home'
import Aset from '../pages/Aset/Aset'
import DaftarAset from '../pages/Aset/DaftarAset'

function Routes() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />            
            <Route path='/login' exact component={Login} />
            <Route path='/aset' exact component={Aset} />
            <Route path='/aset/daftaraset' exact component={DaftarAset} />
        </Switch>
        <Footer />
    </Router>
  )
}

export default Routes
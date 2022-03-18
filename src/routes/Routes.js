import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Navbar from '../components/Navbar'
import Login from '../components/pages/Auth/Login'
import Register from '../components/pages/Auth/Register'
import Footer from '../components/pages/Footer/Footer'
import Home from '../components/pages/Home/Home'

function Routes() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />            
            <Route path='/login' exact component={Login} />
        </Switch>
        <Footer />
    </Router>
  )
}

export default Routes
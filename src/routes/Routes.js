import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Feature from '../components/pages/Home/Feature'
import Navbar from '../components/Navbar'
import Footer from '../components/pages/Footer/Footer'
import Home from '../components/pages/Home/Home'

function Routes() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
        </Switch>
        <Feature />
        <Footer />
    </Router>
  )
}

export default Routes
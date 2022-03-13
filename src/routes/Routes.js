import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Navbar from '../components/pages/Navbar'

function Routes() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/' />
        </Switch>
    </Router>
  )
}

export default Routes
import React, { useContext } from 'react'
import './App.css'
import Routes from './routes/Routes'
import { UserProvider } from './context/UserContext'
import { AsetProvider } from './context/AsetContext'
function App() {
  return (
    <>
      <UserProvider>
        <AsetProvider>
          <Routes />
        </AsetProvider>
      </UserProvider>
    </>
  )
}

export default App

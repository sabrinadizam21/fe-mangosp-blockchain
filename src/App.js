import React from 'react';
import './App.css'
import Routes from './routes/Routes';
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <>
      <UserProvider>
          <Routes />
      </UserProvider>
    </>
  );
}

export default App;

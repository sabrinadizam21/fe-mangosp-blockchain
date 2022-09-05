import React, { useContext } from 'react';
import './App.css'
import Routes from './routes/Routes';
import { UserProvider } from './context/UserContext'
import { AsetContext } from './context/AsetContext';
import { Loading } from './components/Loading';

function App() {
  const { loading } = useContext(AsetContext)
  return (
    <>
    {loading === true ? <Loading /> : 
      <UserProvider>
          <Routes />
      </UserProvider>
    }
    </>
  );
}

export default App;

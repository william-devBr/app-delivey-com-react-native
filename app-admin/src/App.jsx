import AppRoute from './routes/AppRoute';
import AuthRoute from './routes/AuthRoute';
import './App.css';
import './globals/global.module.css';
import { useContext } from 'react';
import { AuthContext } from './contexts/User';



function App() {

  const { user } = useContext(AuthContext)

  return ( !user?.token ? <AuthRoute/> : <AppRoute/> )
}

export default App

import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
const LoginPage = lazy(() => import('./components/LoginPage'));
const RegisterForm = lazy(() =>  import('./components/RegisterForm'));
import Contacts from './components/Contacts'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />     
          <Route path="/loggin" element={<LoginPage />} />   
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
    </div>
  );
}

export default App;

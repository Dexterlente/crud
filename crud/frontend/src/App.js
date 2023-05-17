import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import Contacts from './components/Contacts'
import FriendListDetail from './components/FriendListDetail'

const LoginPage = lazy(() => import('./components/LoginPage'));
const RegisterForm = lazy(() =>  import('./components/RegisterForm'));


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />     
          <Route path="/loggin" element={<LoginPage />} />   
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<FriendListDetail />} />
        </Routes>
    </div>
  );
}

export default App;

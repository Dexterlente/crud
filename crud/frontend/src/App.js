import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
const LoginPage = lazy(() => import('./components/LoginPage'));
const RegisterForm = lazy(() =>  import('./components/RegisterForm'));

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />     
          <Route path="/loggin" element={<LoginPage />} />   
        </Routes>
    </div>
  );
}

export default App;

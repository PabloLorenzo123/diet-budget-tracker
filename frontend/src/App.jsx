import react from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Root from './pages/Root';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import CreateFood from './pages/CreateFood';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/create-food-product" element={<CreateFood />}/>
        </Routes>
      </BrowserRouter>    
      <ToastContainer />  
    </>
  )
}

export default App

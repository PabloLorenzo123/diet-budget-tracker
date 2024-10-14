import react from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Home from './pages/home';
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/signup" element={<Signup/>}/>
          
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App

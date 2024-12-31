import react, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages.
import Index from './pages/Index';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import CreateFood from './pages/CreateFood';
import DietPlans from './pages/DietPlans';

import ProtectedRoute from './components/ProtectedRoute';
import { isAuthorized } from './lib/isAuthorizedFunc';

import { ToastContainer } from 'react-toastify';
import LoadingSpinner from './components/LoadingSpinner';
import DietPlan from './pages/DietPlan';

// Styles.
import 'react-toastify/dist/ReactToastify.css';
import './styles/custom-table.css';

function App() {

  const [authorized, setAuthorized] = useState(null);
  const [currentPath, setCurrentPath] = useState(null); // URL current path.
  
 
  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthorized();
      setAuthorized(result); // Update the state with the result
    };

    checkAuth(); // Call the async function
  }, [])

  if (authorized == null) {
    return (
        <LoadingSpinner />
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* If user is authorized the '/' page will be the index otherwise the homepage */}
          {authorized == true?
            <Route
              path="/"
              element={
              <ProtectedRoute authorized={authorized} setAuthorized={setAuthorized} currentPath={currentPath} setCurrentPath={setCurrentPath}>
                <Index />
              </ProtectedRoute>
              }/>
            :
            <Route path="/" element={<Home />}/>
          }

          {/* Auth Routes */}
          <Route path="/login" element={<Login setAuthorized={setAuthorized}/>}/>
          <Route path="/logout" element={<Logout setAuthorized={setAuthorized}/>}/>
          <Route path="/signup" element={<Signup setAuthorized={setAuthorized}/>}/>
          
          {/* App Routes */}
          <Route path="/food-products" element={
            <ProtectedRoute authorized={authorized} setAuthorized={setAuthorized} currentPath={currentPath} setCurrentPath={setCurrentPath}>
              <CreateFood />
            </ProtectedRoute>}
          />

          <Route path="/dietplans" element={
            <ProtectedRoute authorized={authorized} setAuthorized={setAuthorized} currentPath={currentPath} setCurrentPath={setCurrentPath}>
              <DietPlans />
            </ProtectedRoute>}
          />

          <Route path="/dietplans/:uuid" element={
            <ProtectedRoute authorized={authorized} setAuthorized={setAuthorized} currentPath={currentPath} setCurrentPath={setCurrentPath}>
              <DietPlan />
            </ProtectedRoute>}
          />

        </Routes>

        
      </BrowserRouter>

      <ToastContainer
        position='top-center'
      />

    </>
  )
}

export default App

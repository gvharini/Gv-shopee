import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add.jsx";  // ✅ Ensure Add.jsx has a default export
import List from "./pages/List/List.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Login from "./components/Login/Login.jsx"

import { ToastContainer, toast } from 'react-toastify';




export const backendUrl = "http://localhost:4000"
export const currency = "$"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token' || ''));

  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])

  return (

    <div className="app-container">
      <ToastContainer/>
      {
        token === '' ? (
          <Login setToken={setToken}/>
        ) : (
          <>
            <hr className="app-divider" />
            <div className="app-content">
              <Sidebar setToken={setToken}/>
              <div className="page-content">
                <Routes>
                  <Route path="/add" element={<Add token={token}/>} />   {/* ✅ No errors */}
                  <Route path="/list" element={<List token={token}/>} />
                  <Route path="/orders" element={<Orders token={token}/>} />
                </Routes>
              </div>
            </div>
            </>
        )
      }
    </div>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import authService from '../src/appwrite/auth';
import { login, logout } from './store/AuthSlice'
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <div className="min-h-screen flex justify-center items-center bg-gray-400">
      <div className="w-full-block">
        <Header />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

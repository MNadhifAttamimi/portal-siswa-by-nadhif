import React, { useState } from 'react';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard'; // Import komponen Dashboard
import styles from '../styles/Login.module.css';

export default function Home() {
  const pages = ['page-register', 'page-login', 'page-dashboard']; // Tambahkan 'page-dashboard' ke daftar halaman
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const nextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const previousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div>
      {currentPageIndex === 0 && <Login nextPage={nextPage} />}
      {currentPageIndex === 1 && <Register nextPage={nextPage} previousPage={previousPage} />}
      {currentPageIndex === 2 && <Dashboard previousPage={previousPage} />} {/* Tambahkan halaman Dashboard */}
      <div id="response"></div>
    </div>
  );
}

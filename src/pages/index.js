// pages/home/index.js
import React, { useState } from 'react';
import Register from './register';
import Login from './login';
import CheckToken from './checkToken';
import Logout from './logout';
import styles from '../styles/Login.module.css';

export default function Home() {
  const pages = ['page-register', 'page-login', 'page-check-token', 'page-logout'];
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
      {currentPageIndex === 0 && <Register nextPage={nextPage} />}
      {currentPageIndex === 1 && <Login nextPage={nextPage} previousPage={previousPage} />}
      {currentPageIndex === 2 && <CheckToken nextPage={nextPage} previousPage={previousPage} />}
      {currentPageIndex === 3 && <Logout previousPage={previousPage} />}
      <div id="response"></div>
    </div>
  );
}

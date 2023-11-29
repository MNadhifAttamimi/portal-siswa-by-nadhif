import React, { useState, useEffect } from 'react';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Home() {
  const pages = ['page-register', 'page-login', 'page-dashboard'];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      let myToken = '';

      if (localStorage.getItem('keepLogin') === 'true') {
        myToken = getCookie('token');
      } else {
        myToken = sessionStorage.getItem('token');
      }

      if (myToken && currentPageIndex !== 2) {
        router.push('/dashboard');
      } else if (!myToken && currentPageIndex === 2) {
        router.push('/login');
      }
    };

    checkLoginStatus();
  }, [currentPageIndex, router]);

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
      {currentPageIndex === 2 && <Dashboard previousPage={previousPage} />}
      <div id="response"></div>
    </div>
  );
}

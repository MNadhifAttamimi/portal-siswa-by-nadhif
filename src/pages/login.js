// Login.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

export default function Login() {
  const router = useRouter();

  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [isKeepLogin, setKeepLogin] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    const data = { nis, password, isKeepLogin };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await res.json();

      if (res.ok) {
        console.log('responseData: ', responseData);
        localStorage.setItem('keepLogin', responseData.isKeepLogin);

        if (!responseData.isKeepLogin) {
          sessionStorage.setItem('token', responseData.token);
        }

        alert('sukses login');
        router.push('/dashboard');
      } else {
        console.error('Gagal melakukan permintaan:', res.status);
        console.log(responseData);
        setLoginError(responseData.message);
      }
    } catch (error) {
      console.log('error: ', error);
      alert('Terjadi Kesalahan, harap hubungi tim support');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.enter}>Enter your NIS and password to sign in!</p>
        <form id="login-form" className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="nis">NIS</label>
            <input
              type="text"
              id="nis"
              className={styles.input}
              placeholder="Enter your NIS"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.checkboxFlex}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                onChange={(e) => {
                  console.log(e.target.checked);
                  let isChecked = e.target.checked;
                  localStorage.setItem('keepLogin', isChecked);
                  setKeepLogin(isChecked);
                }}
                id="keepLoggedIn"
                className={styles.checkbox}
              />
              <label htmlFor="keepLoggedIn">Keep me logged in</label>
            </div>
            <div className={styles.checkboxContainer}>
              <Link legacyBehavior href="/register" passHref>
                <a>Forget password?</a>
              </Link>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className={styles.signInButton}
          >
            Sign In
          </button>
          {loginError && <p className={styles.errorMessage}>{loginError}</p>}
        </form>
        <div className={styles.registerText}>
          Not registered yet? <Link legacyBehavior href="/register" passHref><a>Create an Account</a></Link>
        </div>
      </div>
    </div>
  );
}

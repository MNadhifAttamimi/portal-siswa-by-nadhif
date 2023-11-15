import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Impor useRouter dari next/router
import styles from '../styles/Login.module.css';

export default function Login() {
    const router = useRouter(); // Menggunakan useRouter untuk navigasi

    const [nis, setNis] = useState('');
    const [password, setPassword] = useState('');
    const [isKeepLogin, setKeepLogin] = useState('');
    const [loginError, setLoginError] = useState('');



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
                            <input type="checkbox"
                                onChange={(e) => {
                                console.log(e.target.checked);
                                let isChecked = e.target.checked;
                                localStorage.setItem('keepLogin', isChecked);
                                setKeepLogin(isChecked);
                            }} id="keepLoggedIn" className={styles.checkbox} />
                            <label htmlFor="keepLoggedIn">Keep me logged in</label>
                        </div>
                        <div className={styles.checkboxContainer}>
                            <a href="#">Forget password?</a>
                        </div>
                    </div>
                    <button type="button" onClick={async (e) => {
            const data = { nis, password, isKeepLogin };
            console.log('click daftar by: ', data);

            try {
              const res = await fetch('/api/login', {
                method: 'POST', // Corrected the typo in 'method'
                body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
                headers: {
                  'Content-Type': 'application/json', // Specifying the content type as JSON
                },
              });
              const responseData = await res.json();
              if (res.ok) {
                // Periksa apakah respons memiliki status code 200 (OK)
                // Mendapatkan data JSON dari respons
                console.log('responseData: ', responseData); //ex: {token: 'Id2Qs257T0', isKeepLogin: true}
                localStorage.setItem('keepLogin', responseData.isKeepLogin);

                if (!responseData.isKeepLogin) {
                  sessionStorage.setItem('token', responseData.token);
                }

                alert('sukses login');
                router.push('/dashboard');
              } else {
                console.error('Gagal melakukan permintaan:', res.status);
                console.log(responseData);
                alert(responseData.message);
              }
            } catch (error) {
              console.log('error: ', error);
              alert('Terjadi Kesalahan, harap hubungi team support');
            }
          }} className={styles.signInButton}>Sign In</button>
                    {loginError && <p className={styles.errorMessage}>{loginError}</p>}
                </form>
                <div className={styles.registerText}>
                    Not registered yet?<a href="#">Create an Account</a>
                </div>
            </div>
        </div>
    );
}

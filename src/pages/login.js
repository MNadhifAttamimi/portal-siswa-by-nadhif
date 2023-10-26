import React from 'react';
import styles from '../styles/Login.module.css';

export default function Login({ nextPage, previousPage }) {
    const login = () => {
        // Tambahkan logika login di sini
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Sign in</h1>
                <p className={styles.enter}>Enter your email and password to sign in!</p>
                <button className={styles.googleSignInButton}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAjVBMVEVHcEz////9/f38/Pz////4+fn9/f38/P3v8PH19vb///////87q1n8wAnrSz5HifXqOijsUUMfpUYvfvQwqVhDhvRnm/bg7ur74eDykIrznpj609DI5c/uZUj/78rG2PyzzPKJyJj5zMn/++37xSf81XhqsFCa0KV1v4f0kCGvtTCCyJyXt/hyofZDj9Yia4J9AAAAC3RSTlMAojhxnKGw/RkrfoV/rhcAAAFQSURBVDiNlVPZYoMgENQYRCIgclRNNKlpm/T+/88rl3jmofPEMuPu7LpE0X+wO8RpGh9222wW5wFxtuYntJUsaATzBSCaFV/SBhMryF9dm46xrjn5cMzh8p9KRsuypJSVTgLn/o6stKAa7Gqv9r6/kadMQ/NHX8R1u7f5Dc+aGsK6CbxPYY+dLk9rd12PnYQWz6SjbEJMW03M4Y2Qj2ZjFslg4ZUQcrZXTwMug4nUHDRPXqxAFBpKKfFsovSBwGiCYFFCGKiiEKHEYPLza/T2owpRDSaRa/MmeTXwla4j7AmFQd0kxtIrYKEK9R0G5Uy0HGPM+wrC6i41L+A4avez7kYhuYbO9ess+p8VARv0RuEgue0xB/OFaaX5GEvJsTMTFsYX0ZJ3XQP3rQ8nu7+5tLO1ztZrv3w7YM6DaIUMhCwQbDw9+z4SkKYgQdvsA/wBrYgleUhdXncAAAAASUVORK5CYII=" alt="Google Logo" />
                    <p style={{ marginTop: "4px" }} >Sign in with Google</p>
                </button>


                <p className={styles.or}>or</p>
                <form id="login-form" className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">NIS</label>
                        <input type="email" id="email" className={styles.input} placeholder="Enter your email" />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className={styles.input} placeholder="Password" />
                    </div>
                    <div className={styles.checkboxFlex}>
                    <div className={styles.checkboxContainer}>
                        <input type="checkbox" id="keepLoggedIn" className={styles.checkbox} />
                        <label htmlFor="keepLoggedIn">Keep me logged in</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <a href="#">Forget password?</a>
                    </div>
                    </div>
                    <button type="button" onClick={login} className={styles.signInButton}>Sign In</button>
                </form>
                <div className={styles.registerText}>
                    Not registered yet?<a href="#">Create an Account</a>
                </div>
            </div>
        </div>
    );
}

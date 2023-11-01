import React from 'react';
import styles from '../styles/Register.module.css'; // Ubah nama file CSS jika diperlukan

export default function Register({ nextPage, previousPage }) {
    const register = () => {
        // Tambahkan logika pendaftaran di sini
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <h1 className={styles.title}>Sign up</h1>
                <p className={styles.enter}>Enter your information to create an account!</p>
                <form id="register-form" className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="fullName">Nama Lengkap</label>
                        <input type="text" id="fullName" className={styles.input} placeholder="Enter your full name" />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">NIS</label>
                        <input type="email" id="email" className={styles.input} placeholder="Enter your NIS" />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className={styles.input} placeholder="Password" />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" className={styles.input} placeholder="Confirm your password" />
                    </div>
                    <div className={styles.checkboxFlex}>
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" id="agreeTerms" className={styles.checkbox} />
                            <label htmlFor="agreeTerms">I agree to the terms and conditions</label>
                        </div>
                    </div>
                    <button type="button" onClick={register} className={styles.registerButton}>Register</button>
                </form>
                <div className={styles.registerText}>
                    Already have an account? <a href="#">Sign in</a>
                </div>
            </div>
        </div>
    );
}

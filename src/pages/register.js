import React from 'react';
import styles from '../styles/Login.module.css';

export default function Register({ nextPage, previousPage }) {
    const register = () => {
        // Tambahkan logika pendaftaran di sini
    };

    return (
        <div className={`${styles.page} ${styles.active}`}>
            <h2 className={styles.title}>Daftar Siswa</h2>
            <form id="register-form">
                <input type="text" id="reg-displayName" className={styles.input} placeholder="Nama" />
                <input type="text" id="reg-NIS" className={styles.input} placeholder="NIS" />
                <input type="password" id="reg-password" className={styles.input} placeholder="Password" />
                <button type="button" onClick={register} className={styles.button}>
                    Daftar
                </button>
            </form>
            <div className={styles.navigation}>
                <button className={styles.nextButton} onClick={() => nextPage('page-login')}>
                    Selanjutnya
                </button>
            </div>
        </div>
    );
}

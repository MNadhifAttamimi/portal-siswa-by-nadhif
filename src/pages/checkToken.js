// CheckToken.js
import React from 'react';
import styles from '../styles/Login.module.css';


export default function CheckToken({ nextPage, previousPage }) {
    const checkToken = () => {
        // Tambahkan logika cek token di sini
    };

    return (
        <div className={`${styles.page} ${styles.active}`}>
            <h2 className={styles.title}>Cek Token</h2>
            <form id="check-token-form">
                <input type="text" id="token" className={styles.input} placeholder="Token" />
                <button type="button" onClick={checkToken} className={styles.button}>
                    Cek Token
                </button>
            </form>
            <div className={styles.navigation}>
                <button className={styles.previousButton} onClick={previousPage}>
                    Sebelumnya
                </button>
                <button className={styles.nextButton} onClick={() => nextPage('page-logout')}>
                    Selanjutnya
                </button>
            </div>
        </div>
    );
}

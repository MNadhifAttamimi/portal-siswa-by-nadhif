import React from 'react';
import styles from '../styles/Login.module.css';

export default function Logout({ previousPage }) {
    const logout = () => {
        // Tambahkan logika logout di sini
    };

    return (
        <div className={`${styles.page} ${styles.active}`}>
            <h2 className={styles.title}>Logout</h2>
            <form id="logout-form">
                <input type="text" id="logout-token" className={styles.input} placeholder="Token" />
                <button type="button" onClick={logout} className={styles.button}>Logout</button>
            </form>
            <div className={styles.navigation}>
                <button className={styles.previousButton} onClick={previousPage}>
                    Sebelumnya
                </button>
            </div>
        </div>
    );
}

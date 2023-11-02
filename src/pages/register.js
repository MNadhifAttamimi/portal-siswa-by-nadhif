import React, { useState } from 'react';
import styles from '../styles/Register.module.css'; // Ubah nama file CSS jika diperlukan

export default function Register({ nextPage, previousPage }) {
    const [name, setName] = useState('');
    const [nis, setNis] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        // Mengambil nilai dari input
        const nameValue = name;
        const nisValue = nis;
        const passwordValue = password;

        // Tampilkan nilai di konsol (sebagai contoh)
        console.log('Name:', nameValue);
        console.log('NIS:', nisValue);
        console.log('Password:', passwordValue);

        // Di sini Anda dapat melakukan apa pun yang Anda butuhkan dengan nilai-nilai tersebut, seperti mengirimnya ke server atau menyimpannya di database.
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <h1 className={styles.title}>Sign up</h1>
                <p className={styles.enter}>Enter your information to create an account!</p>
                <form id="register-form" className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <button type="button" onClick={register} className={styles.registerButton}>
                        Register
                    </button>
                </form>
                <div className={styles.registerText}>
                    Already have an account? <a href="#">Sign in</a>
                </div>
            </div>
        </div>
    );
}


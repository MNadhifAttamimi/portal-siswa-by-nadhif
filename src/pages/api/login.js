import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import Users from '@/pages/models/users';
import { generateRandomToken } from '@/utils/RandomToken';

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'metode tidak diizinkan' });
        }

        const { nis, password } = req.body;

        // Validasi kosong atau tidak
        if (!nis) {
            return res.status(400).json({ error: true, message: 'tidak ada NIS' });
        }

        if (!password) {
            return res.status(400).json({ error: true, message: 'tidak ada Password' });
        }

        // Validasi sesuai kreteria atau tidak
        if (nis.length !== 5) {
            return res.status(400).json({
                error: true,
                message: 'nis harus 5 karakter',
            });
        }

        if (password.length < 6 || password.length >= 10) {
            return res.status(400).json({
                error: true,
                message: 'password harus di antara 6 sampai 10 karakter',
            });
        }


        // Cek apakah user ada
        const user = await Users.findOne({ nis, password });

        console.log('user: ', user, "nilaiPerbandingan:", !user || !user.nis, " nis:", user.nis);

        if (!user || !user.nis) {
            return res.status(400).json({
                error: true,
                message: 'user tidak ditemukan',
            });
        }

        // Lengkapi data yang kurang
        const token = generateRandomToken(10);

        // Simpan token di cookie
        const tokenExpiration = 60 * 60 * 24 * 30; // 1 bulan dalam detik
        setCookie('token', token, { req, res, maxAge: tokenExpiration });

        // Jika sudah sesuai, simpan token
        const updatedUser = await Users.findOneAndUpdate(
            { nis, password },
            { token },
            { new: true }
        );
        console.log('user setelah diupdate: ', updatedUser);

        // Kasih tahu client (hanya data yang diperbolehkan)
        return res.status(200).json({ token });
    } catch (error) {
        console.log('error:', error);
        res
            .status(500)
            .json({ error: true, message: 'terdapat masalah, harap hubungi pengembang' });
    }
}

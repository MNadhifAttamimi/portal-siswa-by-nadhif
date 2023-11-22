// Import library dan modul yang diperlukan
import { generateRandomToken } from '@/utils/RandomToken';
import Users from '@/pages/models/users';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

// Handler untuk API login
export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'method tidak diijinkan' });
        }

        const { nis, password, isKeepLogin } = req.body;

        // Validasi kosong atau tidak
        if (!nis) {
            return res.status(400).json({ error: true, message: 'tidak ada NIS' });
        }

        if (!password) {
            return res
                .status(400)
                .json({ error: true, message: 'tidak ada Password' });
        }

        // Validasi sesuai kriteria atau tidak
        if (nis.length !== 5) {
            return res.status(400).json({
                error: true,
                message: 'nis harus 5 karakter',
            });
        }

        if (password.length < 6 || password.length >= 10) {
            return res.status(400).json({
                error: true,
                message: 'password harus diantar 6 sampai 10 karakter',
            });
        }

        // Cek apakah user ada
        const user = await Users.findOne({ nis });

        if (!user || !user.nis ) {
            return res.status(400).json({
                error: true,
                message: 'user tidak ditemukan',
            });
        }

        // Lengkapi data yang kurang
        const token = generateRandomToken(10);

        if (isKeepLogin) {
            setCookie('token', token, { req, res, maxAge: 60 * 60 * 24 * 30 }); // 1 bulan
        }

        // Jika sudah sesuai, simpan token
        const updatedUser = await Users.findOneAndUpdate(
            { nis },
            { token },
            { new: true }
        );

        // Kasih tahu client (hanya data yang diperbolehkan)
        return res.status(200).json({ token, isKeepLogin: !!isKeepLogin });
    } catch (error) {
        console.log('error:', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({
                error: true,
                message: 'Duplikat entry, user sudah terdaftar',
            });
        }
        res
            .status(500)
            .json({ error: true, message: 'ada masalah harap hubungi developer' });
    }
}

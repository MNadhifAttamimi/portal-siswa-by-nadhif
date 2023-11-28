import Tasks from '@/models/tasks';
import Users from '@/models/users';
import { connectMongoDB } from '@/db/mongoDB';

connectMongoDB();

export default async function handler(req, res) {
    try {
        // Memastikan method yang digunakan adalah POST
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'Method tidak diijinkan' });
        }

        // Memastikan client mengirimkan token di headers authorization
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({ error: true, message: 'Tidak ada token' });
        }

        // Memastikan user yang mengakses adalah seorang Admin
        const user = await Users.findOne({ token });
        if (!user || !user.nis) {
            return res.status(400).json({
                error: true,
                message: 'Token tidak valid',
            });
        }

        // Cek apakah user sebagai admin
        if (user.role !== 1) {
            return res.status(400).json({
                error: true,
                message: 'Anda tidak memiliki hak akses/authorization',
            });
        }

        // Mengekstrak data dari body
        const { date, deadline, link, note } = req.body;

        // Memastikan data yang diperlukan sudah diberikan
        if (!date || !deadline || !link) {
            return res.status(400).json({
                error: true,
                message: 'Data yang dikirim belum lengkap',
            });
        }

        // Menyiapkan data yang akan disimpan
        const data = { date, deadline, note, link, teacher_id: user.id, status: 1 };

        // Membuat instance TaskModel dan menyimpannya
        const task = new Tasks(data);
        await task.save();

        // Memberikan respons
        return res.status(201).json({ message: 'Data sudah berhasil diinputkan' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

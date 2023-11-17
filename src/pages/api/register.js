import { generateRandomToken } from '@/utils/RandomToken';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://mnadhif:9841185n@cluster0.jp7etyc.mongodb.net/portal-siswa',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

connectMongoDB();

let Users;

if (mongoose.models.user) {
    Users = mongoose.model('user');
} else {
    Users = mongoose.model('user', new mongoose.Schema({
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        nis: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: generateRandomToken(),
        },
    }));
}

export default async function handler(req, res) {
    try {
        // pengecekan method
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'metode tidak diizinkan' });
        }

        const { name, nis, password } = req.body;

        // Validasi dari client (ada atau tidak)
        if (!name) {
            return res.status(400).json({ error: true, message: 'tidak ada Nama' });
        }

        if (!nis) {
            return res.status(400).json({ error: true, message: 'tidak ada NIS' });
        }

        if (!password) {
            return res
                .status(400)
                .json({ error: true, message: 'tidak ada Password' });
        }

        // Validasi sesuai kriteria atau tidak
        if (name.length < 3 || name.length >= 20) {
            return res.status(400).json({
                error: true,
                message: 'name harus diantar 3 sampai 20 karakter',
            });
        }

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

        // Cek apakah id atau nis sudah digunakan
        const user = await Users.findOne({ nis });
        console.log('user: ', user);

        if (user && user.nis) {
            return res.status(400).json({
                error: true,
                message: 'nis sudah pernah didaftarkan',
            });
        }

        // Lengkapi data yang kurang
        const id = uuid();

        const data = { id, name, nis, password };

        // Jika sudah sesuai, simpan
        const newUser = new Users(data);
        await newUser.save();

        // Kasih tahu client (hanya data yang diperbolehkan)
        return res.status(201).json({ id: newUser.id, nis: newUser.nis });
    } catch (error) {
        console.log('error:', error);
        res
            .status(500)
            .json({ error: true, message: 'ada masalah harap hubungi pengembang' });
    }
}

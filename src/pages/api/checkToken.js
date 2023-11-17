import { generateRandomToken } from '@/utils/RandomToken';
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://mnadhif:9841185n@cluster0.jp7etyc.mongodb.net/',
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
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        nis: {
            type: String,
            require: true,
        },
        token: {
            type: String,
            default: '',
        },
    }));
}

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'mehtod tidak diijinkan' });
        }

        const { token } = req.body;
        // validasi kosong atau tidak

        if (!token) {
            return res.status(400).json({ error: true, message: 'tidak ada token' });
        }

        // cek apakah user ada
        const user = await Users.findOne({ token });
        console.log('user: ', user);

        if (!user || !user.nis) {
            deleteCookie('token', { req, res });

            return res.status(400).json({
                error: true,
                message: 'token tidak valid',
            });
        }

        // kasih tahu client (hanya data yg diperbolehkan)
        return res.status(200).json({
            id: user.id,
            nis: user.nis,
            name: user.name,
            role: user.role,
            status: user.status,
        });
    } catch (error) {
        console.log('error:', error);
        res
            .status(500)
            .json({ error: true, message: 'ada masalah harap hubungi developer' });
    }
}


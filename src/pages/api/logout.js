import { deleteCookie } from 'cookies-next';
import { connectMongoDB } from '@/db/mongoDB';


connectMongoDB();

let Users;

if (mongoose.models.user) {
    Users = mongoose.model('user');
} else {
    Users = mongoose.model(
        'user',
        new mongoose.Schema({
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
        })
    );
}

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'method tidak diijinkan' });
        }

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: true, message: 'tidak ada token' });
        }

        const user = await Users.findOne({ token });

        if (!user || !user.nis) {
            return res.status(400).json({
                error: true,
                message: 'token tidak valid atau sudah logout',
            });
        }

        console.log('user before update: ', user);

        const updatedUser = await Users.findOneAndUpdate(
            { nis: user.nis },
            { token: '' },
            { new: true }
        );

        console.log('user after update: ', updatedUser);

        deleteCookie('token', { req, res });

        return res.status(200).json({ error: false, message: 'berhasil logout' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({
            error: true,
            message: 'ada masalah, harap hubungi developer',
        });
    }
}

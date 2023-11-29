import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
        default: '',
    },
    role: {
        // 0: santri/anggota, 1: adalah admin
        type: Number,
        default: 0,
    },
    status: {
        // 0: tidak aktif, sedangkan 1: aktif
        type: Number,
        default: 1,
    },
});

let UserModel;

// Check if the model 'UserModel' already exists
if (mongoose.models.UserModel) {
    UserModel = mongoose.model('UserModel');
} else {
    UserModel = mongoose.model('UserModel', userSchema);
}

export default UserModel;

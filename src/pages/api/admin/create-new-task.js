// create-new-task.js
import TaskModel from "@/models/tasks";
import Users from "@/models/users";
import { connectMongoDB } from "@/db/mongoDB";
connectMongoDB();

export default async function handler(req, res) {
    try {
        // Pemeriksaan metode, hanya izinkan metode POST
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        // Pemeriksaan token di headers Authorization
        const token = req.headers.authorization;
        if (!token) {
            return res
                .status(400)
                .json({ error: true, message: "Tidak ada token" });
        }

        // Cek apakah user ada
        const user = await Users.findOne({ token });

        // Jika user tidak ditemukan
        if (!user || !user.nis) {
            return res
                .status(400)
                .json({ error: true, message: "Token tidak valid" });
        }

        // Cek apakah sebagai admin
        if (user.role !== 1) {
            return res.status(400).json({
                error: true,
                message:
                    "Anda tidak memiliki hak akses/authorization sebagai admin",
            });
        }

        // Destructuring data yang diterima dari client
        const { date, deadline, link, note } = req.body;

        // Pemeriksaan apakah data yang dibutuhkan sudah ada
        if (!date || !deadline || !link) {
            return res
                .status(400)
                .json({
                    error: true,
                    message: "Data yang Anda kirimkan belum lengkap",
                });
        }

        // Siapkan data yang akan disimpan
        const data = {
            date,
            deadline,
            note,
            link,
            teacher_id: user.id,
            status: 1,
        };

        // Simpan data ke database menggunakan model Tasks
        const tasks = new TaskModel(data);
        await tasks.save();

        // Berikan respons sukses
        return res
            .status(201)
            .json({ message: "Data sudah berhasil diinputkan" });
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json({ message: "Silahkan hubungi tim support" });
    }
}
import Tasks from "@/models/tasks";
import { connectMongoDB } from "@/db/mongoDB";
connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "PUT") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: true,
                message:
                    "Anda tidak memiliki hak akses/authorization sebagai admin",
            });
        }

        const taskId = req.query.id;
        if (!taskId) {
            return res
                .status(400)
                .json({ error: true, message: "ID tugas tidak diberikan" });
        }

        const { date, deadline, link, note } = req.body;

        if (!date || !deadline || !link) {
            return res.status(400).json({
                error: true,
                message: "Data yang Anda kirimkan belum lengkap",
            });
        }

        const updatedTask = await Tasks.findByIdAndUpdate(
            taskId,
            { date, deadline, link, note },
            { new: true }
        );

        if (!updatedTask) {
            return res
                .status(404)
                .json({ error: true, message: "Tugas tidak ditemukan" });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json({ message: "Silahkan hubungi tim support" });
    }
}
import Tasks from '@/models/tasks';

export default async function handler(req, res) {
    try {
        const taskId = req.query.id;
        if (!taskId) {
            return res.status(400).json({ error: true, message: 'ID tugas tidak diberikan' });
        }

        const updatedTask = await Tasks.findByIdAndUpdate(taskId, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: true, message: 'Tugas tidak ditemukan' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

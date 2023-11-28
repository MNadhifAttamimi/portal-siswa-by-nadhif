import Tasks from '@/models/tasks';

export default async function handler(req, res) {
    try {
        const tasks = await Tasks.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

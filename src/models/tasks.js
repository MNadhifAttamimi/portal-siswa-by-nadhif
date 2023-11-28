import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        default: '',
    },
    teacher_id: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    },
});

let TaskModel;

// Check if the model already exists to avoid overwriting
if (mongoose.models.Task) {
    TaskModel = mongoose.model('Task');
} else {
    TaskModel = mongoose.model('Task', taskSchema);
}

export default TaskModel;

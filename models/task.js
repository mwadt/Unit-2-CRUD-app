const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName: String,
    todayDate: String,
    dueDate: String,
    dueTime: String,
    taskType: {
        type: String,
        default: 'none'
    },
    description: String,
    priority: Number,
    
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
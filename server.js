const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const methodOverride = require('method-override')

const Task = require('./models/task.js')

mongoose.connection.on('connected', () => {
    console.log(`Connected to ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})
//presents the user with a form to create a new task
app.get('/tasks/new', (req, res) => {
    res.render('tasks/new.ejs')
   
})

app.get('/tasks', async (req, res) => {
    const allTasks = await Task.find()
    res.render('tasks/index.ejs', {
        tasks: allTasks
    })
})

app.get('/tasks/:id', async (req, res) => {
    const findTasksId = await Task.findById(req.params.id)
    res.render('tasks/show.ejs', {
        tasks: findTasksId
    })
})

app.get('/tasks/:id/edit', async (req, res) => {
    const findTaskById = await Task.findByIdAndUpdate(req.params.id)
    res.render('tasks/edit.ejs', {
        tasks: findTaskById
    })
})

app.put('/tasks/:id', async (req, res) => {
    const updatedTask = (req.body)
    await Task.findByIdAndUpdate(req.params.id, updatedTask)
    res.redirect('/tasks')
})

app.post('/tasks', async (req, res) => {
    await Task.create(req.body)
    res.redirect('/tasks')
})

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.redirect('/tasks')
})

app.listen(3000, () => {
    console.log('Listening on port 3012')
})
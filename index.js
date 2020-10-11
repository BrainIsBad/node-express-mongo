const express = require('express')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
const todosRoutes = require('./routes/todos')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(todosRoutes)

app.use(express.static(path.join(__dirname, 'public')))

async function start() {
    try {
        await  mongoose.connect('mongodb+srv://root:root123@cluster0.kocsa.mongodb.net/todos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
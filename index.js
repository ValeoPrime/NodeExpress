const express = require('express')
const app = express() // аналог поднятия сервера на чистой ноде
const expressHandlebars = require('express-handlebars')
const path = require('path')


const handlebars = expressHandlebars.create({ //Создание и настрйока хандлбарса
    defaultLayout: 'main', // Дефолтный шаблон
    extname: 'hbs' // Сокращение для расширения файлов
})

app.engine('hbs', handlebars.engine) //Регистрация движка в приложени на експресс
app.set('view engine', 'hbs')//Начало пользования движком
app.set('views', 'views') //второй параметр место хранения шаблонов


app.get('/', (req, res)=>{
    res.status(200)

    // res.sendFile(path.join(__dirname, 'views', 'index.hbs'))
    res.render('index')
})

app.get('/about', (req, res) => {
    res.status(200)
    // res.sendFile(path.join(__dirname, 'views', 'about.html'))
    res.render('about')
})












const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server run, port ${PORT}`);
})
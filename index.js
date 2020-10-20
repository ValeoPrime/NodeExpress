const express = require('express')
const app = express() // аналог поднятия сервера на чистой ноде
const expressHandlebars = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')


const handlebars = expressHandlebars.create({ //Создание и настрйока хандлбарса
    defaultLayout: 'main', // Дефолтный шаблон
    extname: 'hbs' // Сокращение для расширения файлов
})

app.engine('hbs', handlebars.engine) //Регистрация движка в приложени на експресс
app.set('view engine', 'hbs')//Начало пользования движком
app.set('views', 'views') //второй параметр место хранения шаблонов

app.use(express.static('public')) // регистрация папки в качетстве статичной (иначе не видит сиэсэс и пр)
app.use('/',homeRoutes)//Приложение получает доступ к корневому роуту
app.use('/add',addRoutes)//Приложение получает доступ к корневому роуту
app.use('/courses',coursesRoutes)//Приложение получает доступ к корневому роуту


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server run, port ${PORT}`);
})
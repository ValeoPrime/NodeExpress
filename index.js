const express = require('express')

const app = express() // аналог поднятия сервера на чистой ноде

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server run, port ${PORT}`);
})
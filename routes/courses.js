const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/',async (req, res) => {
    const allCourses = await Course.getAll()
    res.status(200)
    // res.sendFile(path.join(__dirname, 'views', 'about.html'))
    res.render('courses', {
        title: 'Все курсы',
        isCourses:  true,
        allCourses: allCourses
    })
})

module.exports = router
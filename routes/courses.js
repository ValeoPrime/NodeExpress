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

router.get('/:id/edit', async (req, res) => {

    const course = await Course.getById(req.params.id)
    res.render('course-edit', {
        course: course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('course', {
        layout: 'empty',
        course: course
    })
})

module.exports = router
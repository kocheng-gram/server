const router = require('express').Router()
const postRoutes = require('./post')

router.use('/post', postRoutes)

module.exports = router
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/Record')

router.use('/record', record)
router.use('/', home)

module.exports = router
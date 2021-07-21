const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// Create new expense record
router.get('/new', (req, res) => {
  const categories = []
  return Category.find()
   .lean()
   .then(category => categories.push(...category))
   .then(() => {
     return res.render('new', { categories })
   })
   .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  return Record.create(req.body) 
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router


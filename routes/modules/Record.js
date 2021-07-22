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
  const record = req.body   // 整筆紀錄存放在 object 中
  Category.findOne({ name: record.category })
    .then(category => {
      record.category = category._id    // 找到對應的 category._id

      Record.create(record) 
        .then(record => {
          category.records.push(record._id)   // 更新 categories collection 中對應的類別
          category.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

module.exports = router


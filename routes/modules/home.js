const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const categories = []
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.log(error))

  Record.find()
  .lean()
  .then(record => {
    let totalAmount = 0
    record.forEach(record => totalAmount += record.amount)
    res.render('index', { categories, record, totalAmount})
  })
})

module.exports = router
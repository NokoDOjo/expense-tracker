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
  .populate('category')
  .then((records) => {
    let totalAmount = 0
    records.forEach(record => totalAmount += record.amount)
    res.render('index', { categories, records, totalAmount })
  })
  .catch(error => console.log(error))
})

module.exports = router
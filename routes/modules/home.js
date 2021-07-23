const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const categories = []
  const filterCategory = req.query.filterCategory
  const filter = {}
  let categoryName = ""
  if (filterCategory) { filter.category = filterCategory }


  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.log(error))

  if (filterCategory.length !== 0 ) {
  Category.findById(filterCategory)
    .lean()
    .then(category => categoryName = category.name)
    .catch(error => console.log(error))
  }
  
  Record.find(filter)
  .lean()
  .populate('category')
  .then((records) => {
    let totalAmount = 0
    records.forEach(record => totalAmount += record.amount)
    res.render('index', { categories, records, totalAmount, filterCategory, categoryName })
  })
  .catch(error => console.log(error))
})

module.exports = router
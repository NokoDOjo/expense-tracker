const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const categories = require('../../category.json')
const monthList = require('../../month.json')
const { getIcon } = require('../../tools/utility')

router.get('/', (req, res) => {
  const userId = req.user._id

  Record.find({ userId })
  .lean()
  .sort({ date: 'desc' })
  .then( records => {
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      record.icon = getIcon(record.category, categories)
    })
    return res.render('index',{
      records,
      monthList,
      categories,
      totalAmount
    })
  })
  .catch(err => console.log(err))
})

router.post('/filter', (req, res) => {
  const userId = req.user._id
  const filterCategory = req.body.filterCategory || ''
  const filterCategoryRegExp = new RegExp(filterCategory, "i")
  const filterMonth = req.body.filterMonth ||''
  const filterMonthRegExp = new RegExp("2021-"+ filterMonth, "i")

  Record.find({
    userId,
    date: {
      $regex: filterMonthRegExp
    },
    category: {
      $regex: filterCategoryRegExp
    }
  })
  .lean()
  .sort({ date: 'desc' })
  .then( records => {
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      record.icon = getIcon(record.category, categories)
    })
    return res.render('index',{
      records,
      monthList,
      categories,
      totalAmount,
      filterCategory,
      filterMonth
    })
  })
  .catch(err => console.log(err))
})
module.exports = router
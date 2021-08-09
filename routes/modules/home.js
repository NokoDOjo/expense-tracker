const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const categories = require('../../category.json')
const monthList = require('../../month.json')

router.get('/', (req, res) => {
  const userId = req.user._id
  const filterCategory = req.query.filterCategory || ''
  const filterCategoryRegExp = new RegExp(filterCategory, "i")
  const filterMonth = req.query.filterMonth ||''
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
  .then( records => {
    let totalAmount = 0
    records.forEach(record => totalAmount += record.amount)
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
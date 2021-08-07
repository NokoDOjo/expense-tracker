const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')


// modified category data
const categories = []
Category.find()
  .lean()
  .then( category => categories.push(...category))
  .catch(error => console.log(error))


// Create new expense record
router.get('/new', (req, res) => {
  return res.render('new', { categories })
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

// Edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Record.findById(id)
    .lean()
    .populate('category')
    .then((record) => { 
      const currentDate = record.date.replace(/\D/g, '-')
      res.render('edit', { record, categories, currentDate }) })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  const update = req.body

  Record.findById(id)
    .then(record => {
      Category.findById(record.category)
        .then(category => {
          category.records = category.records.filter(record => record.toString() !== id)
          category.save()
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
  
  return Category.findOne({ name: update.category})
    .then(category => {
      update.category = category._id
      Record.findById(id, (err, record) => {
        if (err) return console.error(err)
        Object.assign(record, update)
        return record.save()
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error)) 
      category.records.push(id)
      return category.save()
    })
})

// Delete

router.delete('/:id', (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Record.findOneAndRemove({ _id: id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))   
})

module.exports = router


const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const categories = require('../../category.json')
const Record = require('../../models/record')


// Create new expense record
router.get('/new', (req, res) => {
  return res.render('new', { categories })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// Edit
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.redirect('back')
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      res.render('edit', { record, categories})
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.redirect('back')

  return Record.findOne({ _id, userId }, (err, record) => {
    if (err) return console.error(err)
    Object.assign(record, req.body)
    return record.save()
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err)) 
})

// Delete

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.redirect('back')
  return Record.findOneAndRemove({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))   
})

module.exports = router


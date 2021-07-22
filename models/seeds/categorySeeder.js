const Category = require('../category')
const db = require('../../config/mongoose')

const categoryList = require('../../category.json')


db.once('open', () => {
  Category.create(categoryList)
    .then(() => {
      return db.close()
    })
    .then(() => {
      return console.log('database connection close')
    })
})
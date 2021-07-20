const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create({ name: 'test-category' })
    .then(() => {
      return db.close()
    })
    .then(() => {
      return console.log('database connection close')
    })
})
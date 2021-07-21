const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.find()
    .then(() => {
      return db.close()
    })
    .then(() => {
      return console.log('database connection close')
    })
})
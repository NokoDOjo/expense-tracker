const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create({name: 'empty-record'})
    .then(() => {
      return db.close()
    })
    .then(() => {
      return console.log('database connection close')
    })
})
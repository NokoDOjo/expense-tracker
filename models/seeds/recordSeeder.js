const Record = require('../record')
const Category = require('../category')
const recordData = require('../../record.json')
const db = require('../../config/mongoose')


db.once('open', () => {
  createRecords()
  console.log('recordSeeder.js done ^_^')
})

function createRecords() {
  const categoryList = {}
  Category.find()
    .lean()
    .then( categories => { 
      categories.forEach(category => {
      categoryList[category.name] = category._id
      })
      recordData.forEach( record => {
        record.category = categoryList[record.category]
      })
    })
    .then(() => {
      Record.create(recordData)
        .then(records => {               // 將對應 record_id 存入 category 的 collection 中
          records.forEach(record => {
            Category.findById(record.category)
              .then(category => {
                category.records.push(record._id)
                category.save()
              })
          })
        })
    })
    .catch(error => console.error(error))
}
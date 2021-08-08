const Category = require('../category')
const db = require('../../config/mongoose')

const SEED_CATEGORY = require('../../category.json')


db.once('open', () => {
  return Promise.all(Array.from(
    { length: SEED_CATEGORY.length },
    (_, i) => Category.create({ ...SEED_CATEGORY[i] })
  ))
    .then(() => {
      console.log('categorySeeder done')
      process.exit()
    })
})
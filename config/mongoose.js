const mongoose = require('mongoose')
const Record = require('../models/record')
const MONGODB_URI = "mongodb+srv://root:12345@cluster0.dq2ck.mongodb.net/Record?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
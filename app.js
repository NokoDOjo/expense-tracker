const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
require('./config/mongoose')

const routes = require('./routes')

const app = express()
const PORT = 3000


app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
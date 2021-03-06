const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const helpers = require('handlebars-helpers')()
const { logErrors } = require('./middleware/error')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const routes = require('./routes')
const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT || 3000 


app.engine('hbs', exphbs({helpers, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: '12345',
  resave: false, 
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.login_msg = req.flash('login_msg')
  next()
})

app.use(logErrors)
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
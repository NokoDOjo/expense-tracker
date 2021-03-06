const express = require('express')
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const { check, validationResult } = require('express-validator')
 
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', check('email').isEmail(), (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!'})
  }
  if (validationResult(req)) {
    errors.push({ message: '無效的email'})
  }
  if (errors.length) {
    return res.render('register', {
      errors, 
      name, 
      email, 
      password, 
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個Email已經註冊過了。'})
      return res.render('register', {
        errors,
        name, 
        email, 
        password, 
        confirmPassword
      })
    } 
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name, 
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(next)
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Successfully logout !!!')
  res.redirect('/users/login')
})

module.exports = router
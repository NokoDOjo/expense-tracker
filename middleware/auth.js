module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning', 'Please login first !!!')
    res.redirect('/users/login')
  }
}
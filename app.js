const express = require('express')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const session = require('express-session')
app.use(session({
  secret: 'restaurant list secret',
  resave: false,
  saveUninitialized: true,
}))

const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

const flash = require('connect-flash')
app.use(flash())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/AC_S3_restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use('/', express.static('public'))

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

const { authenticated } = require('./config/auth')
app.all('*', authenticated)

// routes
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))

// for any other unused routes
app.use(function (req, res, next) {
  res.status(404).render('error404');
});

app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})

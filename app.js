const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const morgan = require('morgan')
const User = require('./database/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { movieSearch } = require('./movie-search.js')

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'keyboard cat' }))

app.set('view engine', 'ejs')
app.locals.moment = require('moment')

app.get('/', (req, res) => {
		res.render('index.ejs')
})

app.route('/login')
	.get((req, res) => {
		console.log(req.session.user);
		res.render('login.ejs', { data: req.session.user })
	})
	.post((req, res) => {
		const plainTxtPassword = req.body.password
		User.findUserByEmail(req.body.email)
		.then(user => {
			if (!user) {
				console.log('wrong email')
			} else if (!bcrypt.compare(plainTxtPassword, user.password)) {
				console.log('wrong password')
			} else {
				req.session.userid = user.id
				res.redirect('/')
			}
		})
		.catch((error) => {
			console.log(error)
		})
	})

app.route('/register')
	.get((req, res) => {
		res.render('register.ejs')
	})
	.post((req, res) => {
		User.createUser(req.body.name, req.body.email, req.body.password)
		.then(() => {
			res.redirect('login')
		})
		.catch((error) => {
			console.log(error)
		})
	})

app.post('/search', (req, res) => {
	const searchQuery = req.body.search
	User.createSearchHist(req.session.userid, searchQuery)
	movieSearch(searchQuery)
	.then(movieNames => {
		res.render('searchResults', { searchQuery: searchQuery, movieNames: movieNames })
	})
	.catch((error) => {
		console.log(error)
	})
})

app.get('/history', (req, res) => {
	const output = {
		searchTerm: [],
		searchDate: []
	}
	User.findSearchHist(req.session.userid).then(searchData => {
		const searchHist = searchData
		res.render('searchHistory', { searchHist: searchHist })
	})
})

const port = 3000

app.listen(port, () => {
	console.log('Express server running on port:', port)
})

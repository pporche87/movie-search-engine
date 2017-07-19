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

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'keyboard cat' }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())

app.set('view engine', 'ejs')


// passport.use(new LocalStrategy((email, password, done) => {
// 	console.log(email, password);
// 	User.findUserByEmail(email).then(user => {
// 		if (!user) {
// 			return done(null, false, { message: 'Incorrect email' })
// 		}
// 		if (!User.isValidPassword(user, password)) {
// 			return done(null, false, { message: 'Incorrect password' })
// 		}
// 		return done(null, user)
// 	})
// }))
//
// passport.serializeUser((user, done) => {
// 	done(null, user.id)
// })
//
// passport.deserializeUser((id, done) => {
// 	User.findUserById(id).then(user => {
// 		done(null, user)
// 	})
// })

app.get('/', (req, res) => {
		res.render('index.ejs')
})

app.route('/login')
	.get((req, res) => {
		console.log(req.session.user);
		res.render('login.ejs', { data: req.session.user })
	})
	// .post(passport.authenticate('local', (req, res) => {
	// 	res.redirect('/')
	// }))
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

const port = 3000

app.listen(port, () => {
	console.log('Express server running on port:', port)
})

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.route('/login')
	// get route to render login page
	// remember to redirect here
	.get((req, res) => {
		res.render('login.ejs')
	})

app.route('/register')
	// get route to render login page
	// remember to redirect here
	.get((req, res) => {
		res.render('register.ejs')
	})

const port = 3000

app.listen(port, () => {
	console.log('Express server running on port:', port)
})

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('index.ejs')
})

const port = 3000

app.listen(port, () => {
	console.log('Express server running on port:', port)
})

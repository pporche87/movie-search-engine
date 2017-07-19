const promise = require('bluebird')
const options = { promiseLib: promise }
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/movie_search_engine'
const db = pgp(connectionString)
const bcrypt = require('bcrypt')
const queries = require('./queries')

const createUser = (name, email, password) => {
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)

	return db.one(queries.createUser(), [name, email, hash])
}

const findUserByEmail = email => {
	return db.one(queries.findByEmail(), [email])
}

const findUserById = id => {
	return db.one(queries.findById(), [id])
}

// const authPassword = (user, password) => {
// 	new Promise((resolve, reject) => {
// 		bcrypt.compare(password, user.password, (error) => {
// 			if (error) reject({ error, message: 'Incorrect Password' })
// 			return resolve(user)
// 		})
// 	})
// }

module.exports = {
	// isValidPassword,
	createUser,
	findUserByEmail,
	findUserById
	// authPassword
}

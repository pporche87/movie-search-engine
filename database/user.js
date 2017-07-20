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

const createSearchHist = (user_id, search_term) => {
	return db.none(queries.saveSearchById(), [user_id, search_term])
}

const findSearchHist = (user_id) => {
	return db.any(queries.findSearchHist(), [user_id])
}

// const findSearchDates = (user_id) => {
// 	return db.any(queries.findSearchDateById(), [user_id])
// }

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
	findUserById,
	createSearchHist,
	findSearchHist
	// findSearchDates
	// authPassword
}

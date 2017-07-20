const queries = {
	createUser: () => {
		return `
			INSERT INTO users
				(name, email, password)
			VALUES
				($1, $2, $3)
			RETURNING *
		`
	},

	findByEmail: () => {
		return `
			SELECT * FROM users
			WHERE email=$1
		`
	},

	findById: () => {
		return `
			SELECT * FROM users
			WHERE id=$1
		`
	},
	saveSearchById: () => {
		return `
			INSERT INTO queries
				(user_id, search_term)
			VALUES
				($1, $2)
		`
	},
	findSearchHist: () => {
		return `
			SELECT search_term, search_date
			FROM queries
			WHERE user_id=$1
			ORDER BY search_date ASC
		`
	},
}

module.exports = queries

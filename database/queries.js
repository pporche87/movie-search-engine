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
	}
}

module.exports = queries

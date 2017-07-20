const cheerio = require('cheerio')
const rp = require('request-promise')

const movieSearch = search => {
	const options = {
		uri: `http://www.imdb.com/find`,
		qs: {
			ref_: 'fn_al_tt_mr',
			q: search,
			s: 'tt'
		},
		transform: body => {
			return cheerio.load(body)
		}
	}

	return rp(options)
		.then(($) => {
			const movieNames = $('.findSection').first()
				.find('.result_text')
				.not('small a')
				.slice(0, 5)
				.map((i, ele) => $(ele).text())
				.toArray()

			const movieImages = $('.findSection')
				.find('.primary_photo img')
				.slice(0, 5)
				.map((i, ele) => $(ele).attr('src'))
				.toArray()

			let output = {"movies": []}
			for (let i = 0; i < movieNames.length; i++) {
				let movieObject = {}
				movieObject.name = movieNames[i]
				movieObject.image = movieImages[i]
				output.movies.push(movieObject)
			}
			return output
		})
		.catch((error) => {
			console.log(error)
		})
}

module.exports = { movieSearch }

CREATE DATABASE movie_search_engine;

\c movie-search-engine

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE queries (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	search_term VARCHAR(255) NOT NULL,
	search_date DATE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

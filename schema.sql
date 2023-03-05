DROP TABLE IF EXISTS topmovie;

CREATE TABLE IF NOT EXISTS topmovie (
    num SERIAL PRIMARY KEY,
    id  VARCHAR(255),
    title VARCHAR(255),
    release_date VARCHAR(255),
    poster_path VARCHAR(10000),
    overview  VARCHAR(10000)
);
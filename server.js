'use strict';

//import the express framework
const express = require('express');
//import cors
const cors = require('cors');

const server = express();



const axios = require('axios');

const { response } = require('express');
require('dotenv').config();
const pg = require('pg');




//server open for all clients requests
server.use(cors());
server.use(errorHandler)
server.use(express.json());

const PORT = 3000;

const client = new pg.Client(process.env.DATABASE_URL);

//constructor
function Movies(id, title , release_date , poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

//Routes
server.get('/', homeHandler)
server.get('/test', testHandler)
server.get('/newMovie', newMovieHandler)
server.get('/Search', searchHandler)
server.get('/Trending', trendingHandler)
server.get('/Certifications', certificationsHandler)
server.post('/addMovie', postMovieHandler)
server.get('/getMovies', getMovieHandler)
server.get('/myMovies/:num',getUpdatedMovie)
server.delete('/myMovie/:num',deleteMovie)
server.put('/myMovies/:num',updateMovie)
server.get('*', defaltHandler)


// Functions Handlers
function homeHandler(req, res) {
    res.send("Hello from the HOME route");
}

function testHandler(req, res) {
    let str = "Hello from the backend";
    console.log("Hiiiii");
    res.status(200).send(str);
}

function defaltHandler(req, res) {
    res.status(404).send("defualt route");
}

// 

function newMovieHandler(req, res) {
   
    try {

        const APIKey = process.env.APIKey;
        console.log(APIKey)
        const url = `https://api.themoviedb.org/3/movie/550?api_key=${APIKey}`;
        
        axios.get(url)
            .then((result) => {
                //code depends on axios result
                
                

                let movieResult = result.data;
                let singleMovie = new Movies(movieResult.id, movieResult.title, movieResult.release_date,  movieResult.poster_path, movieResult.overview);
                console.log(singleMovie);
                
                
                res.send(singleMovie);
            })
            .catch((err) => {
                console.log("sorry", err);
                res.status(500).send(err);
            })

        //code that does not depend on axios result
        
    }
    catch (error) {
        errorHandler(error,req,res);
    }
}

function searchHandler(req, res) {
   
    try {

        const APIKey = process.env.APIKey;
        console.log(APIKey)
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=The&page=2`;
        
        axios.get(url)
            .then((result) => {
                //code depends on axios result
                
                

                let searchResult = result.data;
                
                console.log(searchResult);
                
                
                res.send(searchResult);
            })
            .catch((err) => {
                console.log("sorry", err);
                res.status(500).send(err);
            })

        //code that does not depend on axios result
        
    }
    catch (error) {
        errorHandler(error,req,res);
    }
}




function trendingHandler(req, res) {
   
    try {

        const APIKey = process.env.APIKey;
        console.log(APIKey)
        const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKey}&language=en-US`;
        
        
        axios.get(url)
            .then((result) => {
                //code depends on axios result
            
                let movieGeres = result.data;
               
                console.log(movieGeres);
                
                
                res.send(movieGeres);
            })
            .catch((err) => {
                console.log("sorry", err);
                res.status(500).send(err);
            })

        //code that does not depend on axios result
        
    }
    catch (error) {
        errorHandler(error,req,res);
    }
}

function certificationsHandler(req, res) {
   
    try {

        const APIKey = process.env.APIKey;
        console.log(APIKey)
        const url = `https://api.themoviedb.org/3/certification/movie/list?api_key=${APIKey}&number=3`;
        
        
        axios.get(url)
            .then((result) => {
                //code depends on axios result
                
                

                let certifications = result.data;
               
                console.log(certifications);
                
                
                res.send(certifications);
            })
            .catch((err) => {
                console.log("sorry", err);
                res.status(500).send(err);
            })

        //code that does not depend on axios result
        
    }
    catch (error) {
        errorHandler(error,req,res);
    }
}




function postMovieHandler(req,res) {
    const favMovie = req.body; //by default we cant see the body content
    console.log(favMovie);
    const sql = `INSERT INTO topmovie (id, title, release_date, poster_path, overview) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const values = [favMovie.id, favMovie.title, favMovie.release_date,  favMovie.poster_path, favMovie.overview];
    console.log(sql);

    client.query(sql,values)
    .then((data) => {
        res.send("your data was added !");
    })
        .catch(error => {
            // console.log(error);
            errorHandler(error, req, res);
        });
}

function getMovieHandler(req,res) {
    // return all fav recipes (favREcipes tabel content)
    const sql = `SELECT * FROM topmovie`;
    client.query(sql)
    .then((data)=>{
        res.send(data.rows);
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })
}

function deleteMovie(req,res) {
    //delete some data from the database
    // console.log(req.params.id); //to get the path prameters
    const num = req.params.num;
    const sql = `DELETE FROM topmovie WHERE num=${num}`;
    client.query(sql)
    .then((data)=>{
        res.status(204).json({});
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })

}



function updateMovie(req,res) {
    const num = req.params.num;
    console.log(num);
    console.log(req.body);
    const sql = `UPDATE topmovie SET id=$1, title=$2, release_date=$3, poster_path=$4, overview=$5 WHERE num=${num} RETURNING *`;
    const values = [req.body.id,req.body.title,req.body.release_date,req.body.poster_path,req.body.overview];
    client.query(sql,values)
    .then((data)=>{
        res.status(200).send(data.rows);
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })
}

function getUpdatedMovie(req,res){
    const num = req.params.num;
    const sql = `SELECT * FROM topmovie WHERE num=${num}`;
    client.query(sql)
    .then((data)=>{
        res.send(data.rows);
    })
    .catch((err)=>{
        errorHandler500(err,req,res);
    })
}



//middleware function
function errorHandler(error, req, res, next) {
    const err = {
      status: 500,
      message: error.message,
    };
    res.status(500).json(err);
  }
  



// http://localhost:3000 => (Ip = localhost) (port = 3000)
client.connect()
.then(()=>{
    server.listen(PORT, () => {
        console.log(`listening on ${PORT} : I am ready`);
    });  
})


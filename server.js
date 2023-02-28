'use strict';

//import the express framework
const express = require('express');
//import cors
const cors = require('cors');

const server = express();



const axios = require('axios');
const { response } = require('express');
require('dotenv').config();




//server open for all clients requests
server.use(cors());
server.use(errorHandler)

const PORT = 3000;

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



//middleware function
function errorHandler(error, req, res, next) {
    const err = {
      status: 500,
      message: error.message,
    };
    res.status(500).json(err);
  }
  



// http://localhost:3000 => (Ip = localhost) (port = 3000)
server.listen(PORT, () => {
    console.log(`listening on ${PORT} : I am ready`);
})



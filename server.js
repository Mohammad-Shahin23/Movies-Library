'use strict';

//import the express framework
const express = require('express');
//import cors
const cors = require('cors');

const server = express();



const axios = require('axios');
require('dotenv').config();

//server open for all clients requests
server.use(cors());
server.use(errorHandler)

const PORT = 3000;

//constructor
function Recipe(id, title,release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

//Routes
server.get('/', homeHandler)
server.get('/test', testHandler)
server.get('/newRecipes', newMovieHandler)
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
        console.log("before axios");
        axios.get(url)
            .then((result) => {
                //code depends on axios result
                console.log("axios result");

                let mapResult = result.data.map((item) => {
                    let singleMovie = new Recipe(item.id, item.title, item.release_date,  item.poster_path, item.overview);
                    return singleMovie;
                })
                res.send(mapResult);
            })
            .catch((err) => {
                console.log("sorry", err);
                res.status(500).send(err);
            })

        //code that does not depend on axios result
        console.log("after axios");
    }
    catch (error) {
        errorHandler(error,req,res);
    }
}

//middleware function
function errorHandler(erorr, req, res) {
    const err = {
        status: 500,
        massage: erorr
    }
    res.status(500).send(err);
}



// http://localhost:3000 => (Ip = localhost) (port = 3000)
server.listen(PORT, () => {
    console.log(`listening on ${PORT} : I am ready`);
})



'use strict';

//import the express framework
const express = require('express');
//import cors
const cors = require('cors');

var fs = require('fs');
const { info } = require('console');

const server = express();

//server open for all clients requests
server.use(cors());

const PORT = 3000;



const movInfo = require('./Movie-data/data.json');



function MovieInfo (title, genre_ids , original_language, original_title , poster_path , video , vote_average , overview , release_date , vote_count , id , adult, backdrop_path, popularity, media_type  )  {
    this.title = title;
    this.genre_ids = genre_ids;
    this.email = email;
    this.original_language = original_language;
    this.original_title = original_title;
    this.poster_path = poster_path;
    this.video = video;
    this.vote_average = vote_average;
    this.overview = overview;
    this.release_date = release_date;
    this.vote_count = vote_count;
    this.id = id;
    this.adult = adult;
    this.backdrop_path =backdrop_path;
    this.popularity = popularity;
    this.media_type = media_type;

  }


  

//   fs.readFile('Movie-data/data.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
  
//     const movie = JSON.parse(data);
  
//     eval(fs.readFileSync('server.js', 'utf8'));
  
//     const movieData = movie.map(MovieInfo => new MovieInfo(MovieInfo.title = title,MovieInfo.genre_ids = genre_ids, MovieInfo.email = email,  MovieInfo.original_language = original_language, MovieInfo.original_title = original_title,  MovieInfo.poster_path = poster_path, MovieInfo.video = video, MovieInfo.vote_average = vote_average, MovieInfo.overview = overview, MovieInfo.release_date = release_date, MovieInfo.vote_count = vote_count, MovieInfo.id = id, MovieInfo.adult = adult, MovieInfo.backdrop_path =backdrop_path , MovieInfo.popularity = popularity, MovieInfo.media_type = media_type,));
//     console.log(movieData);

//   });

//Routes
//home route
server.get('/', (req, res) => {

    let info =`{ <br> title: ${movInfo.title},<br> poster_path: ${movInfo.poster_path},<br> overview: ${movInfo.overview}.<br> }`;

     res.send(info);

})

    


// http://localhost:3000/test



server.get('/favarit',(req,res)=>{
    let str = "HWelcome to Favorite Page";
    
    res.status(200).send(str);
})

// //default route

function handleServerError(error, req, res, next) {
    console.error(error.stack);
    res.status(500).send({
        status: 500,
        responseText: 'Sorry, something went wrong.',
    });
}


server.get('*',(req,res)=>{
    res.status(404).send("Page not found");
})








// const jsonData = new ('Spider-Man: No Way Home', [28,12, 878], 'en', "Spider-Man: No Way Home", "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", false,  8.4 , "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.", "2021-12-15", 3160 , 634649,  false, "/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg",  10039.54, "movie" );

//  res.send (fs.readFile('/data.json',(err, data) => {

//     const jsonData = new ('Spider-Man: No Way Home', [28,12, 878], 'en', "Spider-Man: No Way Home", "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", false,  8.4 , "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.", "2021-12-15", 3160 , 634649,  false, "/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg",  10039.54, "movie" );

//     return res.jsonData();
//   }));  

// server.get('/', (req, res) => {
//   res.json(jsonData);
// });






// http://localhost:3000 => (Ip = localhost) (port = 3000)



server.listen(PORT, () =>{
    // console.log(`listening on ${PORT} : I am ready`);
})

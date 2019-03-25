require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var processArgv = process.argv;
var command = processArgv[2];
var unique = processArgv[3];

for (var i = 4; i < processArgv.length; i++) {
  unique += ("+" + processArgv[i]); 
}

basic();

function basic() {
  
  switch(command) {
      case "concert-this":
      concertThis();
      break;

      case "spotify-this-song":
      spotifyFunction();
      break;

      case "movie-this":
      movieThis();
      break;

      case "do-what-it-says":
      checkRandom();
      break;
  }
}

function concertThis() {
  // console.log(unique);
  var queryURL = "https://rest.bandsintown.com/artists/" + unique + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      // console.log(response);
      for (i = 0; i < response.data.length; i++) {
        var venueName = ("Venue Name: " + response.data[i].venue.name);
        var venueLocation;
        var dateEvent = ("Date of Event: " + moment(response.data[i].datetime).format("L"));

        if (response.data[i].venue.region === "") {
          venueLocation = ("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country)
        }

        else {
          venueLocation = ("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
        }
        
        console.log(venueName);
        console.log(venueLocation);
        console.log(dateEvent);
        console.log(" ");

        fs.appendFile("log.txt", venueName + "\n" + venueLocation + "\n" + dateEvent + "\n" + " " + "\n", function(error) {

          // If an error was experienced it will be logged.
          if (error) {
            console.log(error);
          } 
        });

      }
    }
  );
}

function spotifyFunction() {
//  console.log(unique);

  if (unique === undefined) {
    unique = "The+Sign+Ace+of+Base";
  }

  spotify.search({ type: 'track', query: unique, limit: 1})
  .then(function(response) {

      var artists = ("Artists: " + response.tracks.items[0].album.artists[0].name);
      var songName = ("Song Name: " + response.tracks.items[0].name);
      var songPreview = ("Song Preview: " + response.tracks.items[0].preview_url);
      var albumName = ("Album Name: " + response.tracks.items[0].album.name);


      fs.appendFile("log.txt", artists + "\n" + songName + "\n" + songPreview + "\n" + albumName + "\n" + " " + "\n", function(error) {

        // If an error was experienced it will be logged.
        if (error) {
          console.log(error);
        }
      
        // If no error is experienced, the information is logged to the node console.
        else {
          console.log(artists);
          console.log(songName);
          console.log(songPreview);
          console.log(albumName);
          console.log(" ");
        }
      
      });

  });

}

function movieThis() {
  if (unique === undefined) {
    unique = "Mr.+Nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + unique + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      // console.log(response);
      // console.log("* Title: " + response.data.Title);
      // console.log("* Year: " + response.data.Year);
      // console.log("* IMDB Rating: " + response.data.imdbRating);
      // console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      // console.log("* Countries: " + response.data.Country);
      // console.log("* Languages: " + response.data.Language);
      // console.log("* Plot: " + response.data.Plot);
      // console.log("* Actors: " + response.data.Actors);


      var title = ("* Title: " + response.data.Title);
      var year = ("* Year: " + response.data.Year);
      var imdbRatingLog = ("* IMDB Rating: " + response.data.imdbRating);
      var rottenTomatoes = ("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      var countries = ("* Countries: " + response.data.Country);
      var languages = ("* Languages: " + response.data.Language);
      var plot = ("* Plot: " + response.data.Plot);
      var actors = ("* Actors: " + response.data.Actors);



      fs.appendFile("log.txt", title + "\n" + year + "\n" + imdbRatingLog + "\n" + rottenTomatoes + "\n" + countries + "\n" + languages + "\n" + plot + "\n" + actors + "\n" + " " + "\n", function(error) {

        // If an error was experienced it will be logged.
        if (error) {
          console.log(error);
        }
      
        // If no error is experienced, the information is logged to the node console.
        else {
          console.log(title);
          console.log(year);
          console.log(imdbRatingLog);
          console.log(rottenTomatoes);
          console.log(countries);
          console.log(languages);
          console.log(plot);
          console.log(actors);
          console.log(" ");
        }
      
      });
    });
}


function checkRandom() {
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  unique = "";
  
  var dataArr = data.split(",");

  var dataArrInput = dataArr[1].split(" ")


  unique = dataArrInput[0];

  for (var j = 1; j < dataArrInput.length; j++) {
    unique += ("+" + dataArrInput[j]); 
  }
  
  //gets rid of the double quotation marks
  unique = unique.replace(/["]/g, '');

  command = dataArr[0];

  // console.log(command);
  // console.log(unique);
  basic();

  });
}
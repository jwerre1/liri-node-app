require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var unique = process.argv[3];

switch(command) {
    case "concert-this":
    concertThis();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    break;

    case "do-what-it-says":
    break;
}

function concertThis() {

}

function spotify() {

}
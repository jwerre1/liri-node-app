# LIRI Node App

Language Interpretation and Recognition Interface (LIRI) Application in Node, able to generate information on a musical arists' upcoming concerts, your favorite song, or a particular movie.

## Getting Started

After obtaining the code, run the following in the terminal:
```
npm i
```

This will install all of the necessary npm modules (*axios*, *dotenv*, *moment*, and *node-spotify-api*).

## Functionality

The LIRI Node App follows four basic commands. Each generates infromation in the log and additionally appends it to `log.txt`:

1. concert-this: type `node liri.js concert-this <artist/band name here>`.
    * Provides the venue name, location, and date for all upcoming concerts. The concert location appears as City, State, unless it is outside the USA, in which case, the location is written as City, Country. 

![concert-this](/gifs/concertThis.gif)

2. spotify-this-song: type `node liri.js spotify-this-song <song name here>`.
 * Provides the artists, song name, a song preview, and the album name for a given song. 

![song-this-midnight-train](/gifs/spotifyMidnight.gif)

* If a song is not provided, the application defaults to "The Sign" by Ace of Base. 

![song-this-the-sign](/gifs/spotifyTheSign.gif)

3. movie-this: type: 
4. do-what-it-says
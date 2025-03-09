import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=YOUR_API_KEY";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        searchMovies("Avengers"); // Default search
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        }
    };

    const addToWatchlist = (movie) => {
        setWatchlist([...watchlist, movie]);
    };

    const removeFromWatchlist = (movie) => {
        setWatchlist(watchlist.filter((m) => m.imdbID !== movie.imdbID));
    };

    return (
      <div className="app">
          <h1 className="title">Movie Search & Recommendation</h1>
          
          <div className="search">
              <input
                  className="search-input"
                  placeholder="Enter movie title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
          </div>
  
          <div className="main-container">
              <div className="container">
                  {movies.length > 0 ? (
                      movies.map((movie) => (
                          <MovieCard 
                              key={movie.imdbID} 
                              movie={movie} 
                              addToWatchlist={() => addToWatchlist(movie)}
                          />
                      ))
                  ) : (
                      <h2>No movies found</h2>
                  )}
              </div>
  
              {watchlist.length > 0 && (
                  <div className="watchlist">
                      <h2>My Watchlist</h2>
                      <div className="container">
                          {watchlist.map((movie) => (
                              <MovieCard 
                                  key={movie.imdbID} 
                                  movie={movie} 
                                  removeFromWatchlist={() => removeFromWatchlist(movie)}
                                  isWatchlist={true}
                              />
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>
  );
  
};

export default App;

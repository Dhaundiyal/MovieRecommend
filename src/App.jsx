import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import MovieCard from "./MovieCard";
import Watchlist from "./Watchlist"; // Import Watchlist Page
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=8f9d36fc";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        searchMovies("Avengers"); // Default search
        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(savedWatchlist);
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        }
    };

    const addToWatchlist = (movie) => {
        const updatedWatchlist = [...watchlist, movie];
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist)); // Save to localStorage
    };

    return (
        <Router>
            <div className="app">
                <h1 className="title">Movie Search & Recommendation</h1>

                {/* Navigation Links */}
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/watchlist" className="nav-link">Watchlist</Link>
                </nav>

                <Routes>
                    {/* Home Page */}
                    <Route 
                        path="/" 
                        element={
                            <>
                                <div className="search">
                                    <input
                                        className="search-input"
                                        placeholder="Enter movie title..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
                                </div>

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
                            </>
                        } 
                    />

                    {/* Watchlist Page */}
                    <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import "./App.css";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(savedWatchlist);
    }, []);

    const removeFromWatchlist = (movie) => {
        const updatedWatchlist = watchlist.filter((m) => m.imdbID !== movie.imdbID);
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist)); // Update localStorage
    };

    return (
        <div className="app">
            <h1 className="title">My Watchlist</h1>

            {/* Back to Home Button */}
            <Link to="/" className="back-button">🔙 Back to Home</Link>

            <div className="container">
                {watchlist.length > 0 ? (
                    watchlist.map((movie) => (
                        <MovieCard 
                            key={movie.imdbID} 
                            movie={movie} 
                            removeFromWatchlist={() => removeFromWatchlist(movie)}
                            isWatchlist={true}
                        />
                    ))
                ) : (
                    <h2>No movies in watchlist</h2>
                )}
            </div>
        </div>
    );
};

export default Watchlist;

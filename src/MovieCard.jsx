import React from "react";

const MovieCard = ({ movie, addToWatchlist, removeFromWatchlist, isWatchlist }) => {
    return (
        <div className="movie">
            <div>
                <p>{movie.Year}</p>
            </div>

            <div>
                <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} 
                    alt={movie.Title} 
                />
            </div>

            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>

            <div className="movie-actions">
                {isWatchlist ? (
                    <button onClick={removeFromWatchlist}>Remove from Watchlist</button>
                ) : (
                    <button onClick={addToWatchlist}>Add to Watchlist</button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;

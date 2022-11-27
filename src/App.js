import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const apiKey = ""; // Your OMDB API Key goes here

const apiURL = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiURL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  if (apiKey === "")
    return (
      <div className="error">
        <h1>Missing API Key</h1>
      </div>
    );

  return (
    <div className="app">
      <title>Search Movies</title>
      <h1>Search Movies</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchMovies(searchTerm);
          }}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

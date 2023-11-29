import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=INCLUDE-API-HERE`);
    const data = await response.json();
    onSearch(data.Search);
  };

  return (
    <div className='search'>
      <input placeholder='Movie' type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const MovieItem = ({ movie }) => {
  return (
    <div className='card'>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <ul>
        <li>Year: {movie.Year}</li>
        <li>IMDB ID: {movie.imdbID}</li>
        <li>Type: {movie.Type}</li>
      </ul>
    </div>
  );
};

const MovieList = ({ movies }) => (
  <div className='movies'>
    {movies.map(movie => (
      <MovieItem key={movie.imdbID} movie={movie} />
    ))}
  </div>
);

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <div>
      <SearchBar onSearch={setMovies} />
      <MovieList movies={movies} />
    </div>
  );
}

export default App;

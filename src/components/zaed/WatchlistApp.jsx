import React, { useState } from 'react'
import Header from '../home/pageComponents/Header';
import Footer from '../home/pageComponents/Footer';

const WatchlistApp = () => {
  const [movies, setMovies] = useState([{ id: 1, title: 'Movie 1', watched: false }])
  const [newMovie, setNewMovie] = useState('')

  const addMovie = () => {
    if (newMovie.trim()) {
      setMovies([...movies, { id: movies.length + 1, title: newMovie, watched: false }])
      setNewMovie('')
    }
  }

  const deleteMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id))
  }

  const clearAll = () => {
    setMovies([])
  }

  return (
    <>
    <Header/>
    <div className="WatchlistApp">
      <header className="WatchlistApp-header">
        <h1>Watchlisted Movies</h1>
      </header>
      <div className="watchlist-controls">
        <input type="text" placeholder="New movie title" value={newMovie} onChange={(e) => setNewMovie(e.target.value)} />
        <button onClick={addMovie}>Add</button>
        <button onClick={clearAll}>Clear All</button>
      </div>
      <div className="watchlist-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Watch</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(m => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>
                  <input type="checkbox" checked={m.watched} onChange={() => setMovies(movies.map(mm => mm.id === m.id ? { ...mm, watched: !mm.watched } : mm))} />
                </td>
                <td>
                  <button onClick={() => deleteMovie(m.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default WatchlistApp
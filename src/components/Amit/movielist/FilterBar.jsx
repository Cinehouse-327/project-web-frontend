import React, { useState } from 'react';

/**
 * FilterBar Component
 * @component
 *
 * @param {Object} props - The props object.
 * @param {Array} props.movies - Array of movie objects to filter.
 * @param {Function} props.onFilter - Callback function to pass filtered movies to the parent component.
 *
 * @returns {JSX.Element} The rendered FilterBar component.
 */
function FilterBar({ movies, onFilter }) {
  /** @type {[string, Function]} State to manage the search query input. */
  const [query, setQuery] = useState('');
  
  /** @type {[string, Function]} State to manage the selected year filter. */
  const [year, setYear] = useState('');
  
  /** @type {[string, Function]} State to manage the selected category filter. */
  const [category, setCategory] = useState('');
  
  /** @type {[string, Function]} State to manage the selected type filter. */
  const [type, setType] = useState('');

  /**
   * Filters the movie list based on the selected query, year, category, and type.
   * Calls the `onFilter` callback with the filtered movie list.
   */
  const handleFilter = () => {
    const filtered = movies.filter((movie) => (
      (!query || movie.name.toLowerCase().includes(query.toLowerCase())) &&
      (!year || movie.year === year) &&
      (!category || movie.category === category) &&
      (!type || movie.type === type)
    ));
    onFilter(filtered);
  };

  return (
    <div className="filter-bar">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Year Filter Dropdown */}
      <select onChange={(e) => setYear(e.target.value)} value={year}>
        <option value="">Year</option>
        {movies.map((movie, index) => (
          <option key={index} value={movie.year}>
            {movie.year}
          </option>
        ))}
      </select>

      {/* Category Filter Dropdown */}
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Category</option>
        <option value="Action">Action</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Crime">Crime</option>
      </select>

      {/* Type Filter Dropdown */}
      <select onChange={(e) => setType(e.target.value)} value={type}>
        <option value="">Type</option>
        <option value="Hollywood">Hollywood</option>
        <option value="Bollywood">Bollywood</option>
      </select>

      {/* Filter Button */}
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}

export default FilterBar;

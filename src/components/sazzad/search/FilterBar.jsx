import React, { useState } from 'react';

/**
 * FilterBar component allows users to filter movies based on search query, year, category, and type.
 *
 * @param {Object} props - The component props
 * @param {Array} props.movies - An array of movie objects to filter.
 * @param {Function} props.onFilter - A callback function that is triggered when the filter is applied with the filtered movie list.
 * @returns {JSX.Element} The FilterBar component JSX
 */
function FilterBar({ movies, onFilter }) {
  
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedYear, setSelectedYear] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState(''); 

  /**
   * Handles the filter logic based on user input.
   * Filters the movies array based on search query, selected year, category, and type.
   */
  const handleFilter = () => {
    
    const filteredMovies = movies.filter((movie) =>
      (!searchQuery || movie.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedYear || movie.year === selectedYear) &&
      (!selectedCategory || movie.category === selectedCategory) &&
      (!selectedType || movie.type === selectedType)
    );
    
    onFilter(filteredMovies);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <select
        onChange={(event) => setSelectedYear(event.target.value)}
        value={selectedYear}
      >
        <option value="">Year</option>
        {movies.map((movie, index) => (
          <option key={index} value={movie.year}>
            {movie.year}
          </option>
        ))}
      </select>
      <select
        onChange={(event) => setSelectedCategory(event.target.value)}
        value={selectedCategory}
      >
        <option value="">Category</option>
        <option value="Action">Action</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Crime">Crime</option>
      </select>
      <select
        onChange={(event) => setSelectedType(event.target.value)}
        value={selectedType}
      >
        <option value="">Type</option>
        <option value="Hollywood">Hollywood</option>
        <option value="Bollywood">Bollywood</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}

export default FilterBar;

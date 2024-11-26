import React, { useState } from 'react';

function FilterBar({ movies, onFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

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
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
        <option value="">Year</option>
        {movies.map((movie, index) => (
          <option key={index} value={movie.year}>
            {movie.year}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">Category</option>
        <option value="Action">Action</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Crime">Crime</option>
      </select>
      <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
        <option value="">Type</option>
        <option value="Hollywood">Hollywood</option>
        <option value="Bollywood">Bollywood</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}

export default FilterBar;

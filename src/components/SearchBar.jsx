import { useCallback } from 'react';

/**
 * SearchBar Component
 *
 * A reusable, controlled input for searching recipes by name.
 * - The parent component (Home page) owns the search term state.
 * - This component simply receives the current value and callbacks as props.
 */
function SearchBar({ value, onChange, onSubmit, onClear }) {
  // Handle "Enter" key to trigger search for better UX.
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by name (e.g. chicken, pasta)..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className="search-bar__input"
      />
      <button type="button" onClick={onSubmit} className="search-bar__button">
        Search
      </button>
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="search-bar__button search-bar__button--secondary"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;


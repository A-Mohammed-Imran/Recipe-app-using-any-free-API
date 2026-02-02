import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import Loader from '../components/Loader.jsx';
import { searchMealsByFirstLetter, searchMealsByName } from '../services/recipeApi.js';

/**
 * Home Page
 *
 * - Lets the user search for recipes by name.
 * - Shows loading and error states.
 * - Displays a grid of recipe cards when results are found.
 */
function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Load some featured recipes on first render so
  // the page doesn't feel empty.
  useEffect(() => {
    const loadFeatured = async () => {
      setIsLoading(true);
      setError('');

      try {
        const featuredMeals = await searchMealsByFirstLetter('a');
        setMeals(featuredMeals);
      } catch (err) {
        // We keep this silent (no big error) so that
        // the user can still search manually.
        setError(err.message || 'Unable to load featured recipes.');
        setMeals([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatured();
  }, []);

  const handleSearch = async () => {
    // Reset previous error message
    setError('');
    setHasSearched(true);

    // Guard against empty input
    if (!searchTerm.trim()) {
      setMeals([]);
      setError('Please enter a recipe name to search.');
      return;
    }

    setIsLoading(true);

    try {
      const results = await searchMealsByName(searchTerm);

      if (results.length === 0) {
        setMeals([]);
      } else {
        setMeals(results);
      }
    } catch (err) {
      setMeals([]);
      setError(err.message || 'Unable to fetch recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page--home">
      <header className="page__header">
        <h1 className="page__title">Recipe Finder</h1>
        <p className="page__subtitle">
          Search for delicious recipes from around the world using TheMealDB API.
        </p>
      </header>

      <section className="page__section">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={handleSearch}
          onClear={() => {
            setSearchTerm('');
            setError('');
            setHasSearched(false);
          }}
        />
        {error && <p className="page__message page__message--error">{error}</p>}
      </section>

      <section className="page__section">
        {isLoading && <Loader />}

        {!isLoading && hasSearched && meals.length === 0 && !error && (
          <p className="page__message">No recipes found. Try a different search term.</p>
        )}

        {!isLoading && meals.length > 0 && (
          <div className="recipes-grid">
            {meals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                id={meal.idMeal}
                title={meal.strMeal}
                thumbnail={meal.strMealThumb}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;


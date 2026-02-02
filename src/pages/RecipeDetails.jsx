import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { getMealById } from '../services/recipeApi.js';

/**
 * Helper to extract ingredients + measures from TheMealDB meal object.
 * The API returns fields like strIngredient1..20 and strMeasure1..20.
 */
function extractIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }

  return ingredients;
}

/**
 * Recipe Details Page
 *
 * - Fetches a single recipe by ID from the URL.
 * - Displays image, category, area, ingredients, instructions, and YouTube link.
 */
function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMeal = async () => {
      setIsLoading(true);
      setError('');

      try {
        const result = await getMealById(id);

        if (!result) {
          setError('Recipe not found.');
          setMeal(null);
        } else {
          setMeal(result);
        }
      } catch (err) {
        setError(err.message || 'Unable to load recipe details.');
        setMeal(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeal();
  }, [id]);

  if (isLoading) {
    return (
      <div className="page page--details">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page--details">
        <p className="page__message page__message--error">{error}</p>
        <Link to="/" className="page__back-link">
          ← Back to search
        </Link>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="page page--details">
        <p className="page__message">No recipe details available.</p>
        <Link to="/" className="page__back-link">
          ← Back to search
        </Link>
      </div>
    );
  }

  const ingredients = extractIngredients(meal);

  return (
    <div className="page page--details">
      <Link to="/" className="page__back-link">
        ← Back to search
      </Link>

      <div className="details-layout">
        <div className="details-layout__image-wrapper">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="details-layout__image" />
        </div>

        <div className="details-layout__content">
          <h1 className="page__title">{meal.strMeal}</h1>
          <p className="details-layout__meta">
            <span>
              <strong>Category:</strong> {meal.strCategory || 'Unknown'}
            </span>
            <span>
              <strong>Area:</strong> {meal.strArea || 'Unknown'}
            </span>
          </p>

          <section className="details-section">
            <h2 className="details-section__title">Ingredients</h2>
            <ul className="ingredients-list">
              {ingredients.map(({ ingredient, measure }) => (
                <li key={ingredient} className="ingredients-list__item">
                  <span className="ingredients-list__ingredient">{ingredient}</span>
                  {measure && <span className="ingredients-list__measure"> - {measure}</span>}
                </li>
              ))}
            </ul>
          </section>

          <section className="details-section">
            <h2 className="details-section__title">Instructions</h2>
            <p className="details-section__text">{meal.strInstructions}</p>
          </section>

          {meal.strYoutube && (
            <section className="details-section">
              <h2 className="details-section__title">Video Tutorial</h2>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="details-section__link"
              >
                Watch on YouTube
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;


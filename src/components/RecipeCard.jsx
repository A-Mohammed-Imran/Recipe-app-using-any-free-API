import { Link } from 'react-router-dom';

/**
 * RecipeCard Component
 *
 * Displays a single recipe in a card layout.
 * - Shows the recipe image and title.
 * - Provides a "View Recipe" button that navigates to the details page.
 */
function RecipeCard({ id, title, thumbnail }) {
  return (
    <article className="recipe-card">
      <img src={thumbnail} alt={title} className="recipe-card__image" />
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{title}</h3>
        <Link to={`/recipe/${id}`} className="recipe-card__button">
          View Recipe
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;


// Centralized API helper functions for TheMealDB.
// Keeping API logic here makes our React components cleaner and easier to test.

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Search meals by name using TheMealDB.
 *
 * @param {string} query - The text the user typed in the search bar.
 * @returns {Promise<Array>} - A promise that resolves to an array of meal objects.
 *                             If no meals are found, this returns an empty array.
 * @throws {Error} - Throws an error if the network request fails.
 */
export async function searchMealsByName(query) {
  // Trim whitespace so that "  chicken  " works like "chicken"
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    // Return an empty array instead of calling the API for an empty query.
    return [];
  }

  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(trimmedQuery)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Non-2xx HTTP status codes (e.g., 500, 404)
      throw new Error('Failed to fetch recipes. Please try again.');
    }

    const data = await response.json();

    // TheMealDB returns { meals: null } when there are no matches.
    if (!data.meals) {
      return [];
    }

    // Extra safety: filter client-side so that results always
    // contain the search text in the meal name. This helps when
    // the API returns broader matches than expected.
    const loweredQuery = trimmedQuery.toLowerCase();
    const filteredMeals = data.meals.filter((meal) =>
      meal.strMeal?.toLowerCase().includes(loweredQuery),
    );

    return filteredMeals;
  } catch (error) {
    // Re-throw with a user-friendly message that the UI can display.
    throw new Error(error.message || 'Something went wrong while fetching recipes.');
  }
}

/**
 * Get meals by the first letter of their name.
 *
 * This is useful to show some featured recipes on the home page
 * before the user searches for anything.
 *
 * @param {string} letter - A single character, e.g. "a".
 * @returns {Promise<Array>} - Array of meal objects or [] if none are found.
 */
export async function searchMealsByFirstLetter(letter) {
  const trimmed = letter.trim().toLowerCase();

  if (!trimmed) {
    return [];
  }

  const url = `${BASE_URL}/search.php?f=${encodeURIComponent(trimmed[0])}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch recipes. Please try again.');
    }

    const data = await response.json();

    if (!data.meals) {
      return [];
    }

    return data.meals;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong while fetching recipes.');
  }
}

/**
 * Get a single meal by its ID.
 *
 * This will be used on the Recipe Details page.
 *
 * @param {string} id - The meal ID from TheMealDB.
 * @returns {Promise<Object|null>} - A promise that resolves to a meal object or null if not found.
 */
export async function getMealById(id) {
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details. Please try again.');
    }

    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      return null;
    }

    // API returns an array with a single meal.
    return data.meals[0];
  } catch (error) {
    throw new Error(error.message || 'Something went wrong while fetching recipe details.');
  }
}


## Recipe Finder Web App

A beginner-to-intermediate friendly **Recipe Finder** built with **React + Vite** that uses the free **TheMealDB** API to search and explore real recipes with images, ingredients, and instructions.

### Tech Stack

- **React (Vite)**
- **Functional components** with **React Hooks** (`useState`, `useEffect`)
- **React Router** for routing
- **Fetch API** for HTTP requests (no backend)
- Simple, responsive **CSS**

### API Used

- **TheMealDB** – free recipe API  
  - Website: `https://www.themealdb.com/api.php`
  - Endpoints used:
    - Search by name: `https://www.themealdb.com/api/json/v1/1/search.php?s=<query>`
    - Get details by ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=<id>`

### Features

- **Home Page**
  - Search recipes by name (e.g. "chicken", "pasta").
  - Shows a grid of recipe cards with image and title.
  - Loading indicator while fetching.
  - Friendly error and "no results" messages.

- **Recipe Details Page**
  - Large recipe image.
  - Category and area (cuisine).
  - Ingredients with measures.
  - Step-by-step cooking instructions.
  - YouTube link to a video tutorial (when available).

- **UI/UX**
  - Clean, responsive layout (mobile-first).
  - Reusable components: search bar, recipe card, loader.
  - Simple styling focused on readability and usability.

### Folder Structure

```text
src/
 ├── components/
 │   ├── Loader.jsx
 │   ├── RecipeCard.jsx
 │   └── SearchBar.jsx
 ├── pages/
 │   ├── Home.jsx
 │   └── RecipeDetails.jsx
 ├── services/
 │   └── recipeApi.js
 ├── App.css
 ├── App.jsx
 ├── index.css
 └── main.jsx
```

### How AI Helped in Development

- **Planning**
  - Designed the overall architecture: routing, API layer, pages, and shared components.
  - Chose TheMealDB endpoints and defined how to normalize responses (e.g. `meals: null` → empty array).

- **Implementation**
  - Wrote reusable components (`SearchBar`, `RecipeCard`, `Loader`) with clear responsibilities.
  - Implemented API helpers in `services/recipeApi.js` with error handling and comments.
  - Built `Home` and `RecipeDetails` pages with clean state management and loading/error flows.

- **Refinement**
  - Simplified and refactored repeated logic (e.g., ingredient extraction, loading states).
  - Applied a consistent, mobile-friendly design using CSS only (no heavy UI libraries).
  - Added comments aimed at beginners to explain hooks and data flow.

### How to Run the Project

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. **Open the app**

   - The terminal will show a local URL, typically `http://localhost:5173`.
   - Open it in your browser to use the Recipe Finder.

### Notes for Beginners

- The app does **not** require any backend or authentication; all data comes directly from TheMealDB.
- All API calls live in `services/recipeApi.js`, which keeps components focused on UI and state.
- State and side effects are handled with `useState` and `useEffect`, which are the core React hooks you will use in most real projects.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

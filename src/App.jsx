import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';

/**
 * App Component
 *
 * - Defines the main routes of the application.
 * - Uses React Router v6+ style routing with <Routes> and <Route>.
 */
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;

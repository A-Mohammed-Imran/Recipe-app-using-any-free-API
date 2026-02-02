/**
 * Loader Component
 *
 * A simple loading indicator that can be reused across pages.
 * This keeps our JSX clean and makes the loading state obvious to users.
 */
function Loader() {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <p className="loader__text">Loading recipes...</p>
    </div>
  );
}

export default Loader;


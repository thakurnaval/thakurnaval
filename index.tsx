import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // Pages are prerendered (prerender.ts): attach to that HTML instead of re-rendering it,
  // so the first paint is kept. The dev server serves an empty #root, so render there.
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app);
  } else {
    ReactDOM.createRoot(rootElement).render(app);
  }
} else {
  console.error("Root element not found");
}

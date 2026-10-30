import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Reveal the (hydrated) app smoothly once React has mounted, avoiding a
// flash of the prerendered static snapshot.
requestAnimationFrame(() => {
  rootElement.classList.add('ready');
});

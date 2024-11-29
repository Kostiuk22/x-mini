import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './firebase/firebase.js';

createRoot(document.getElementById('root')).render(<App />);
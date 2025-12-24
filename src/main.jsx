import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext'
import { SearchProvider } from "./context/SearchContext";
import './index.css'
import App from './App.jsx'
<script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </UserProvider>
  </StrictMode>,
)

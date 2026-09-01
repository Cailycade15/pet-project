import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Header from "./components/header/Header.tsx"
import Favorite_Page from './components/favorite_page/Favorite_page.tsx';
import Compare_Page from './components/compare_page/Compare_Page.tsx';
import Go_To_Up from './components/go_to_up/go_to_up.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="center">
        <Header />

        <Routes>
          <Route path="/" element={<App />} />
        </Routes>

        <Routes>
          <Route path="/favorit-products" element={<Favorite_Page />} />
        </Routes>

        <Routes>
          <Route path="/compare-products" element={<Compare_Page />} />
        </Routes>


        <Go_To_Up />

      </div>
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Mvpmetrics from './pages/Mvpmetrics.js';
import './stylesheet.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Mvpmetrics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

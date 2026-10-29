import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;



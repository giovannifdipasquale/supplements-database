import React from 'react'
import Table from './components/Table/Table'
import Navbar from './components/Navbar/Navbar'
import Home from "src/pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
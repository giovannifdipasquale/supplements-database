import React from 'react'
import Table from './components/Table/Table'
import Navbar from './components/Navbar/Navbar'
import Home from "src/pages/Home/Home";
import Categories from "src/pages/Categories/Categories";
import MyList from "src/pages/MyList/MyList";
import { BrowserRouter, Route, Routes } from "react-router";
import { MySupplementsProvider } from "./context/MySupplementsContext";
import { Toaster } from "sonner";

function App() {
  return (
    <MySupplementsProvider>
      <Toaster richColors position="top-center" />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/my-list" element={<MyList />} />
        </Routes>
      </BrowserRouter>
    </MySupplementsProvider>
  );
}

export default App
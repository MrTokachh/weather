import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Search from "./components/search";
import About from "./components/about";
import Details from "./components/details";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/search" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

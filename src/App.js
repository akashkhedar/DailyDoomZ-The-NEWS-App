import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import ScrollingNav from "./components/ScrollingNav.js";
import backgroundImage from "./components/BodyBack.jpg";

export default function App() {
  const [category, setCategory] = useState("general");
  const [countryCode, setCountryCode] = useState("global");
  const [countryName, setCountryName] = useState("Global");
  const [progress, setProgress] = useState(0);
  const [newsType, setNewsType] = useState("global");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null); // Updated to track the active category

  const apiKeys = process.env.REACT_APP_NEWS_API_KEY.split(",");

  function getRandomApiKey() {
    const randomIndex = Math.floor(Math.random() * apiKeys.length);
    return apiKeys[randomIndex];
  }

  const apiKey = getRandomApiKey();

  const handleCategorySelection = (event) => {
    setCategory(event.target.textContent.toLowerCase());
    setActiveCategory(event.target.textContent.toLowerCase()); // Set active category
  };

  const handleNewsSelection = (type) => {
    if (type === "global") {
      setCountryName("Global");
      setCountryCode("global");
    }
    setNewsType(type);
  };

  const handleQuerySearch = (query) => {
    setQuery(query);
    setNewsType("query");
    setCountryName("Global");
    setActiveCategory(null); // Reset active category
  };

  const handleCountrySelection = (code, name) => {
    setCountryCode(code === "global" ? "global" : code);
    setCountryName(name === "Global" ? "Global" : name);
    setNewsType(code === "global" ? "global" : "country");
  };

  const resetActiveCategory = () => {
    setActiveCategory(null); // Reset active category
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    height: "100vh",
    margin: 0,
    position: "relative",
  };

  return (
    <div style={backgroundStyle}>
      <Router>
        <LoadingBar height={3} color="#f6f5f2" progress={progress} />
        <Navbar
          handleNewsSelection={handleNewsSelection}
          handleQuerySearch={handleQuerySearch}
          newsType={newsType}
          resetActiveCategory={resetActiveCategory} // Pass the function to reset active category
        />
        <ScrollingNav
          handleCategorySelection={handleCategorySelection}
          countryName={countryName}
          handleCountrySelection={handleCountrySelection}
          countryCode={countryCode}
          category={category}
          handleNewsSelection={handleNewsSelection}
          newsType={newsType}
          activeCategory={activeCategory} // Pass the active category
          setActiveCategory={setActiveCategory} // Pass the function to set active category
        />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <News
                  newsType={newsType}
                  setProgress={setProgress}
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/search/:query"
              element={
                <News
                  newsType={newsType}
                  setProgress={setProgress}
                  apiKey={apiKey}
                  query={query}
                />
              }
            />
            <Route
              path="/:category/:countryCode"
              element={
                <News
                  countryCode={countryCode}
                  apiKey={apiKey}
                  setProgress={setProgress}
                  category={category}
                  newsType={newsType}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

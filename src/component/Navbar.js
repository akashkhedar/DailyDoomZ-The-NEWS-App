import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Logo.png";

export default function Navbar(props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      props.handleQuerySearch(query.trim());
      props.handleNewsSelection("query");
      props.resetActiveCategory(); // Reset active category
      navigate(`/search/${query.trim()}`);
      setQuery("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <nav
      className="navbar navbar-expand pr-2 d-flex align-items-center"
      style={{ height: "5rem" }}
    >
      <div className="container-fluid align-items-center h-100">
        <div className="w-25 d-flex align-items-center">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => {
              props.handleNewsSelection("global");
              props.resetActiveCategory(); // Reset active category
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-top"
              style={{ height: "auto", width: "10rem" }}
            />
          </Link>
        </div>
        <div className="w-50 d-flex">
          <form className="d-flex w-100" onSubmit={handleSearch}>
            <input
              className="form-control rounded-start-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ flex: 1 }}
              id="searchBar"
            />
            <button
              className="btn btn-light rounded-end-pill"
              type="submit"
              style={{ height: "100%" }}
              aria-label="Search Button"
              id="searchBtn"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

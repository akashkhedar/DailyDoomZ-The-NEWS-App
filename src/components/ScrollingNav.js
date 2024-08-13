import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";

const countryNames = {
  ae: "United Arab Emirates",
  ar: "Argentina",
  at: "Austria",
  au: "Australia",
  be: "Belgium",
  bg: "Bulgaria",
  br: "Brazil",
  ca: "Canada",
  ch: "Switzerland",
  cn: "China",
  co: "Colombia",
  cu: "Cuba",
  cz: "Czech Republic",
  de: "Germany",
  eg: "Egypt",
  fr: "France",
  gb: "United Kingdom",
  gr: "Greece",
  hk: "Hong Kong",
  hu: "Hungary",
  id: "Indonesia",
  ie: "Ireland",
  il: "Israel",
  in: "India",
  it: "Italy",
  jp: "Japan",
  kr: "South Korea",
  lt: "Lithuania",
  lv: "Latvia",
  ma: "Morocco",
  mx: "Mexico",
  my: "Malaysia",
  ng: "Nigeria",
  nl: "Netherlands",
  no: "Norway",
  nz: "New Zealand",
  ph: "Philippines",
  pl: "Poland",
  pt: "Portugal",
  ro: "Romania",
  rs: "Serbia",
  ru: "Russia",
  sa: "Saudi Arabia",
  se: "Sweden",
  sg: "Singapore",
  si: "Slovenia",
  sk: "Slovakia",
  th: "Thailand",
  tr: "Turkey",
  tw: "Taiwan",
  ua: "Ukraine",
  us: "United States",
  ve: "Venezuela",
  za: "South Africa",
};

const categories = [
  { name: "General", path: "general" },
  { name: "Health", path: "health" },
  { name: "Business", path: "business" },
  { name: "Sports", path: "sports" },
  { name: "Science", path: "science" },
  { name: "Technology", path: "technology" },
  { name: "Entertainment", path: "entertainment" },
];

const ScrollingNav = (props) => {
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    // Reset the active category when logo is clicked or query is searched
    if (props.newsType === "global" || props.newsType === "query") {
      setActiveCategory("");
    }
  }, [props.newsType]);

  const { scrollContainerRef, handleScroll } = useSmoothHorizontalScroll();

  const handleCategoryClick = (path, event) => {
    setActiveCategory(path);
    props.handleCategorySelection(event);
  };

  return (
    <nav
      className="navbar navbar-expand mx-2 px-3 d-flex align-items-center rounded-5 bg-dark"
      style={{ height: "3rem" }}
    >
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="dropdown">
          <Link
            className="btn btn-secondary dropdown-toggle"
            to="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {props.countryName}
          </Link>
          <div
            className="dropdown-menu"
            style={{ maxHeight: "50vh", overflowY: "auto" }}
          >
            <Link
              className="dropdown-item"
              to={`/${props.category}/global`}
              onClick={() => {
                props.handleCountrySelection("global", "Global");
                props.handleNewsSelection("global");
              }}
            >
              Global
            </Link>
            <div className="dropdown-divider"></div>
            {Object.entries(countryNames).map(([code, name]) => (
              <Link
                className="dropdown-item"
                to={`/${props.category}/${code}`}
                onClick={() => {
                  props.handleCountrySelection(code, name);
                  props.handleNewsSelection("country");
                }}
                key={code}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="vr mx-3 bg-light"
          style={{ height: "2rem" }}
        />
        <div
          className="flex-grow-1 d-flex align-items-center overflow-hidden"
          style={{ flex: "1 1 auto" }}
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              flex: "1 1 auto",
              whiteSpace: "nowrap",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <ul className="nav d-flex flex-nowrap mb-0">
              {categories.map((category) => (
                <li className="nav-item" key={category.path}>
                  <Link
                    className={`nav-link rounded-pill p-2 mx-1 mx-md-2 ${
                      activeCategory === category.path ? "border border-white" : ""
                    }`}
                    to={`/${category.path}/${
                      props.newsType === "query" ? "global" : props.countryCode
                    }`}
                    onClick={(event) => {
                      handleCategoryClick(category.path, event);
                      props.handleNewsSelection(props.newsType === "query" ? "global" : props.newsType);
                    }}
                    style={{
                      border: "1px solid #323232",
                      textAlign: "center",
                      fontSize: "0.9rem",
                      lineHeight: "1.1rem",
                      backgroundColor: "#323232",
                      color: "#FFF8F3",
                    }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ScrollingNav;
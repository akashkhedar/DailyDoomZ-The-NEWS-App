import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default function Newsitems(props) {
  const { title, description, imageUrl, articleUrl, publishedDate, sourceName } = props;

  if (title !== "[Removed]" && description !== "[Removed]" && imageUrl !== "[Removed]") {
    return (
      <a
        href={articleUrl}
        rel="noreferrer"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <div className="container my-3">
          <div className="card h-100" style={{ backgroundColor: "#F4EEE0" }}>
            <div className="img-container">
              <img
                src={imageUrl}
                className="card-img-top img-fluid"
                alt="..."
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}...</p>
              <h5>
                <span className="badge bg-dark">{sourceName}</span>
              </h5>
              <p className="card-text">
                <small className="text-muted">
                  Published: {formatDate(publishedDate)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </a>
    );
  } else {
    return null;
  }
}

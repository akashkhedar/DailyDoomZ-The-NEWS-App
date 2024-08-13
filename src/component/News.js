import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const { category, countryCode } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = "";
        switch (props.newsType) {
          case "global":
            url = `https://newsapi.org/v2/everything?q=${
              props.category === "general" ? "top-headlines" : props.category
            }&language=en&sortBy=publishedAt&apiKey=${
              props.apiKey
            }&pageSize=12&page=1`;
            break;
          case "country":
            url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=${props.apiKey}&pageSize=12&page=1`;
            break;
          default:
            url = `https://newsapi.org/v2/everything?q=${props.query}&sortBy=relevancy,publishedAt&apiKey=${props.apiKey}&pageSize=12&page=1`;
        }

        props.setProgress(30);
        setLoading(true);
        const response = await fetch(url);
        props.setProgress(50);
        const parsedData = await response.json();
        props.setProgress(70);

        // Filter out articles with [Removed] values
        const filteredArticles = parsedData.articles.filter(article =>
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.urlToImage !== "[Removed]"
        );

        setData(filteredArticles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
      } catch (error) {
        console.error(`Error fetching ${props.newsType} news:`, error);
        setLoading(false);
        props.setProgress(100);
      }
    };

    fetchNews();
    // eslint-disable-next-line
  }, [category, countryCode, props.newsType, props.query]);

  const fetchMoreNews = async () => {
    try {
      let url = "";
      switch (props.newsType) {
        case "global":
          url = `https://newsapi.org/v2/everything?q=headline&language=en&sortBy=publishedAt&apiKey=${
            props.apiKey
          }&pageSize=12&page=${page + 1}`;
          break;
        case "country":
          url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=${
            props.apiKey
          }&pageSize=12&page=${page + 1}`;
          break;
        default:
          url = `https://newsapi.org/v2/everything?q=${
            props.query
          }&sortBy=relevancy,publishedAt&apiKey=${
            props.apiKey
          }&pageSize=12&page=${page + 1}`;
      }

      const response = await fetch(url);
      const parsedData = await response.json();

      if (parsedData.articles.length > 0) {
        // Filter out articles with [Removed] values
        const filteredArticles = parsedData.articles.filter(article =>
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.urlToImage !== "[Removed]"
        );

        setData((prevData) => prevData.concat(filteredArticles));
        setTotalResults(parsedData.totalResults);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div
        id="scrollableDiv"
        style={{
          height: "76vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreNews}
          hasMore={data.length < totalResults}
          loader={<Loader />}
          scrollableTarget="scrollableDiv"
        >
          <div className="container-fluid h-10 w-full my-3 rounded-3 bg-dark">
            <div className="row">
              {!loading && data.length
                ? data.map((element, index) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                      key={[element.url, index]}
                    >
                      <Newsitem
                        title={
                          element.title
                            ? element.title.length >= 60
                              ? element.title.slice(0, 60) + "..."
                              : element.title
                            : ""
                        }
                        description={
                          element.description
                            ? element.description.length > 90
                              ? element.description.slice(0, 90)
                              : element.description
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                        }
                        articleUrl={element.url}
                        publishedDate={element.publishedAt}
                        sourceName={
                          element.source.name
                            ? element.source.name.length > 20
                              ? element.source.name.slice(0, 20)
                              : element.source.name
                            : ""
                        }
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

News.propTypes = {
  category: PropTypes.string,
  newsType: PropTypes.string,
  query: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
};

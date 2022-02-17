import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchComponent = () => {
  const [bookData, setBookData] = useState([]);
  const [query, setQuery] = useState("java");
  const fetchData = async () => {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_APIS_KEY}`
      )
      .then((response) => {
        setBookData(response.data.items);
        console.log(response.data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [setBookData]);
  return (
    <div style={{ minHeight: "100vh" }}>
      Google book api search component
      <div className="container">
        <div className="row">
          {bookData.map((item, key) => (
            <div key={key} className="col-sm">
              <img src={item.volumeInfo.imageLinks.thumbnail} alt="thumbnail" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;

import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// component
import Header from "./component/Header";
import TopNews from "./component/TopNews";
import TechnologyNews from "./component/TechnologyNews";
import BusinessNews from "./component/BussinessNews";

// css
import "./css/App.css";

// others
import axios from "axios";

const App = () => {
  // search news detail
  const [searchNews, setSearchNews] = useState([]);

  // search input value
  const [searchValue, setSearchValue] = useState("");

  // search news data fetch
  const showNewsHandler = (e) => {
    setSearchValue(e.target.value);
    axios
      .get(
        `http://api.mediastack.com/v1/news?access_key=4a67daf24e149973101bca6e4bf17184&languages=en&limit=5&keywords=${e.target.value}`
      )
      .then((response) => {
        setSearchNews(response.data.data);
      });
  };

  return (
    <>
      {/* navbar */}
      <Header showNews={showNewsHandler} />

      {/* search news section */}
      {searchValue !== "" ? (
        <div className="search__result">
          {searchNews.map((eachNews, eachNewsIndex) => {
            return (
              <a href={eachNews.url} key={eachNewsIndex}>
                {eachNews.title}
              </a>
            );
          })}
        </div>
      ) : null}

      {/* paths */}
      <Switch>
        <Route exact path="/" component={TopNews} />
        <Route path="/technology" component={TechnologyNews} />
        <Route path="/bussiness" component={BusinessNews} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;

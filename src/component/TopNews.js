import React, { useEffect, useState } from "react";
import Modal from "react-modal";

// component
import Banner from "../component/Banner";
import SidebarNews from "../component/SidebarNews";
import Weather from "../component/Weather";
import Card from "../component/Card";
import Footer from "./Footer";
import FullNews from "./FullNews";

// css
import "../css/TopNews.css";
import "../css/App.css";

// image
import topBannerImg from "../image/topBanner.svg";

// others
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const TopNews = () => {
  // sidebar news detail
  const [sidebarNewsDetail, setSidebarNewsDetail] = useState([]);

  // weather detail
  const [weatherDetail, setWeatherDetail] = useState({
    name: "",
    temp: "",
    description: "",
    icon: "",
  });

  // carousel news detail
  const [carouselNewsDetail, setCarouselNewsDetail] = useState([]);

  // top news detail
  const [topNews, setTopNews] = useState([]);

  // full news is open or not value
  const [isOpen, setIsOpen] = useState(false);

  // full news detail
  const [fullNews, setFullNews] = useState([
    {
      title: "",
      urlToImage: "",
      description: "",
      publishedAt: "",
      author: "",
    },
  ]);

  // sidebar news data fetch
  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3081ea8510f14c59804b8fde69422151"
      )
      .then((response) => {
        setSidebarNewsDetail(response.data.articles);
      });
  }, []);

  // sidebar news card making
  const allSidebarNews = sidebarNewsDetail.map((eachNews, eachNewsIndex) => {
    return (
      <SidebarNews
        bbcImg={eachNews.urlToImage}
        bbcHeading={eachNews.title}
        key={eachNewsIndex}
      />
    );
  });

  // weather data fetch
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=malda&appid=142edd739fe653be18bd7941f7adf3ca&units=metric"
      )
      .then((response) => {
        setWeatherDetail({
          name: response.data.name,
          temp: `${response.data.main.temp}° celsius`,
          description: response.data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
        });
      });
  }, []);

  // carousel news data fetch
  useEffect(() => {
    axios
      .get(
        "http://newsapi.org/v2/top-headlines?country=us&apiKey=3081ea8510f14c59804b8fde69422151"
      )
      .then((response) => {
        const carouselData = response.data.articles.slice(0, 5);
        setCarouselNewsDetail(carouselData);
      });
  }, []);

  // carousel making
  const allCarouselNews = carouselNewsDetail.map((eachNews, eachNewsIndex) => {
    return (
      <SplideSlide className="carousel__detail" key={eachNewsIndex}>
        <div className="carousel__link">
          <img src={eachNews.urlToImage} alt="" />
          <h1>{eachNews.title}</h1>
        </div>
      </SplideSlide>
    );
  });

  // top news data fetch
  useEffect(() => {
    axios
      .get(
        "http://newsapi.org/v2/top-headlines?country=in&apiKey=3081ea8510f14c59804b8fde69422151"
      )
      .then((response) => {
        setTopNews(response.data.articles);
      });
  }, []);

  // full news handler functionality
  const fullNewsHandler = (index) => {
    axios
      .get(
        "http://newsapi.org/v2/top-headlines?country=in&apiKey=3081ea8510f14c59804b8fde69422151"
      )
      .then((response) => {
        const fullNewsData = response.data.articles.slice(index, index + 1);
        setFullNews(fullNewsData);
      });
    setIsOpen(!isOpen);
  };

  // top news card making
  const allTopNews = topNews.map((eachNews, eachNewsIndex) => {
    return (
      <Card
        fullNews={fullNewsHandler.bind(this, eachNewsIndex)}
        img={eachNews.urlToImage}
        heading={eachNews.title}
        key={eachNewsIndex}
      />
    );
  });

  return (
    <>
      <div className="section__width">
        {/* top banner */}
        <Banner
          bannerHeading="Welcome to TechNew's Top section."
          bannerImg={topBannerImg}
        />
        <div className="sidebar__weather__section">
          {/* sidebar news */}
          <div className="sidebar__news">
            <h1 className="sidebar__news__heading">BBC Shorts:</h1>
            {allSidebarNews}
          </div>

          {/* weather banner */}
          <Weather
            name={weatherDetail.name}
            temp={weatherDetail.temp}
            description={weatherDetail.description}
            icon={weatherDetail.icon}
          />
        </div>

        {/* top news section */}
        <div className="news__section">
          <h1 className="news__section__heading">Today's Top News</h1>

          {/* carousel */}
          <Splide className="carousel">{allCarouselNews}</Splide>

          {/* top news */}
          <div className="main__news__section">{allTopNews}</div>
        </div>

        {/* full news modal */}
        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(!isOpen);
          }}
          ariaHideApp={false}
        >
          <FullNews
            heading={fullNews[0].title}
            img={fullNews[0].urlToImage}
            description={fullNews[0].description}
            publish={fullNews[0].publishedAt}
            author={fullNews[0].author}
          />
        </Modal>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
};

export default TopNews;

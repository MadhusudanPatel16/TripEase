import React, { useState, useEffect } from "react";
import "./Home.css";
import image1 from "./HomeImages/1.jpg";
import image2 from "./HomeImages/2.jpg";
import image3 from "./HomeImages/3.jpg";
import image4 from "./HomeImages/4.jpg";
import image5 from "./HomeImages/5.jpg";
import image6 from "./HomeImages/6.jpg";
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"


const images = [image1, image2, image3, image4, image5, image6];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <>
    <Navbar/>
    <div className="home">
      <div className="image-slider">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Travel Destination"
            className={i === index ? "active" : ""}
          />
        ))}
      </div>
      <div className="home-content">
        <h1>Explore the World with TripEase</h1>
        <p>Find the best trips, explore new destinations, and make memories!</p>
        <a href="/trip/alltrips" className="explore-btn">Explore Trips</a>
      </div>
    </div>
    <Footer/>
     </>
  

};

export default Home;

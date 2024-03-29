import React, { useState, useEffect } from 'react';
import { API_URL } from '../../stores/api_url'
import './Slider.css'
import BtnSlider from './BtnSlider';

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [gameList, setGameList] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true)

  const numberImages = 5;
  const lastGames = [...gameList].slice(-numberImages);
  // const randomGames = [...gameList].sort(() => Math.random() - Math.random()).slice(0, numberImages);

    useEffect(() => {
    fetch(API_URL + 'games', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setGameList(response);
      setGamesLoading(response.length <= 0);
    })
    .catch((error) => console.log(error));
  }, [gamesLoading])

  const nextSlide = () => {
    if (slideIndex !== numberImages) {
      setSlideIndex(slideIndex + 1)
    }
    else if (slideIndex === numberImages) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if(slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    }
    else if (slideIndex === 1) {
      setSlideIndex(numberImages)
    }
  }

  const moveDot = index => {
    setSlideIndex(index)
  }

  const Images = lastGames.map((game, index) => {
    return (
      <div
      key={game.id}
      className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
      >
        <img src={game.image_url} alt={game.name}/>
      </div>
      )
  })

  return (
    <div className="container-slider">
      {gamesLoading ? <h2>"-- Games info loading --"</h2>
      : Images}
      <div className="slider-elements-container">
        <div className="slider-elements">
          <BtnSlider moveSlide={nextSlide} direction={"next"} />
          <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
          <div className="container-dots">
            {Array.from({length: numberImages}).map((item, index) => (
              <div
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
              ></div>
            ))}
          </div>
        </div>
      </div>
  </div>
  )
}

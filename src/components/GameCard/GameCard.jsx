import { useState } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { authorizationAtom } from '../../stores/cookies';
import { API_URL } from '../../stores/api_url';
import './GameCard.css';
import { FaHeart, FaRegHeart, FaRegStar, FaStar, FaKeyboard, FaTabletAlt } from "react-icons/fa";

// Displays 1 synthetic game card
// Call by "<GameCard game={my_game_var} favorite={true / false} evaluation={0,1,2,3,4 ou 5} fans={my_number_of_fans} feedbacks={my_average_evaluation} />"
function GameCard(props) {

  const [myAuthorization, setAuthorization] = useAtom(authorizationAtom);
  const [isFavorite, setIsFavorite] = useState(props.favorite);
  const [userRating, setUserRating] = useState(props.evaluation.rating);
  const noLoginMsg = "Please login or register first !"

  const submitFavorite = () => {
    props.user.id ? setIsFavorite(!isFavorite) : alert(noLoginMsg);
      const data = {
        "favorite": {
          "game_id": props.game.id,
          "user_id": props.user.id
        }
      };

      if (isFavorite){
      fetch(`${API_URL}favorites/${props.favorite.id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .catch((error) => console.log(error));
  }
  else {
    fetch(`${API_URL}favorites`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': myAuthorization
        },
        body: JSON.stringify(data)
      })
      .catch((error) => console.log(error));
  }
}

  const submitRating = () => {

    const rating = props.user.id ? parseInt(prompt("Rate this game between 1 and 5 stars !")) : alert(noLoginMsg);
    setUserRating(rating);
    const data = {
      "feedback": {
        "rating": rating,
        "game_id": props.game.id,
        "user_id": props.user.id
      }
    };
    if (props.evaluation.rating) {
      fetch(`${API_URL}feedbacks/${props.evaluation.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': myAuthorization
        },
        body: JSON.stringify(data)
      })
      .catch((error) => console.log(error));
    }
    else {
      fetch(`${API_URL}feedbacks`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': myAuthorization
        },
        body: JSON.stringify(data)
      })
      .catch((error) => console.log(error));
    }
  }

  const fiveBest = props.fivebest.map(i => {
    let scorer = props.userslist.find(user => user.id === i.user_id);
    let score = i.score;
    return <span>{scorer.nickname} {score}</span>
  }).reverse();

  const gameFavoriteIcon = () => {
    let my_favorite_icon = isFavorite ? <span><FaHeart/></span> : <span><FaRegHeart/></span>;
    return my_favorite_icon;
  }

  const gameMobileReadyIcon = (is_mobile_ready) => {
    let my_mobileready_icon = is_mobile_ready ?
    <span><FaTabletAlt/>&nbsp;<FaKeyboard/></span>
    : <span><FaKeyboard/></span>;
    return my_mobileready_icon;
  }

  const mobileReadyText = (is_mobile_ready) => {
    let my_mobileready_text = is_mobile_ready ?
    "This game can be played on both computers and touch devices."
    : "This game can be played on a computer.";
    return my_mobileready_text
  }

  const gameFeedbackIcons = (my_avg_game_eval) => {
    // Returns ⭐ to ⭐⭐⭐⭐⭐ depending on current user evaluation of "props.game"
    let my_feedback_icons = <span><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/></span>;
    switch (my_avg_game_eval) {
      case 5:
      my_feedback_icons = <span><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>;
      break;
      case 4:
      my_feedback_icons = <span><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/></span>;
      break;
      case 3:
      my_feedback_icons = <span><FaStar/><FaStar/><FaStar/><FaRegStar/><FaRegStar/></span>;
      break;
      case 2:
      my_feedback_icons = <span><FaStar/><FaStar/><FaRegStar/><FaRegStar/><FaRegStar/></span>;
      break;
      case 1:
      my_feedback_icons = <span><FaStar/><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/></span>;
      break;
      default:
        // Do nothing
        break;
      }
      return my_feedback_icons;
    }

    const gameFansCounter = (my_fan_number) => {
    // Returns the number of fans for this game, followed by a 💖 icon]**
    return(<span><FaHeart /> {my_fan_number}</span>);
  }

  const hearthTitle = isFavorite ? "" : "Add this game to your favorites !";

  const [viewMore, setViewMore] = useState(false);
  const toggleDetails = (e) => {
    if (e.target !== e.currentTarget) {
      return false;
    }
    e.nativeEvent.stopImmediatePropagation();
    setViewMore(!viewMore);
  }
  const linkName = viewMore ? '...View Less << ' : '...View More >> ';

  const showDetails =
  <div className="modal-bg" onClick={toggleDetails}>
  <div className="game-card modal">
  <img className="modal-img" src={props.game.image_url} alt={"screenshot of " + props.game.game_title}/>
  <div className="modal-favorite" onClick={(e) => submitFavorite()} title={hearthTitle}>{gameFavoriteIcon()}</div>
  <div className="modal-feedback" onClick={(e) => submitRating()} title="Rate this game !">{gameFeedbackIcons(userRating)}</div>
  <div className="modal-body">
  <h3><a href={props.user.id ? props.game.game_url : "/signup"} target="_blank" rel="noreferrer">{props.game.game_title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</a></h3>
  <h5>From <strong>{props.gameowner.nickname}</strong></h5>
  <h6 className="game-type" title={props.gametype.game_type_descr}>{props.gametype.game_type_title}</h6>
  <p>{props.game.game_descr}<span className="show-button" onClick={toggleDetails}>{linkName}</span></p>
  <div className="scores">
  {props.bestuser && <p className="score">Best Score : <strong>{props.bestuser.nickname}</strong> {props.bestscore.score}</p>}
  {props.lastuser && <p className="score">Last Score : <strong>{props.lastuser.nickname}</strong> {props.lastscore.score}</p>}
  {props.bestuserscore && <p className="score">Your Best Score : {props.bestuserscore.score}</p>}
  {props.userscore.score && <p className="score">Your Last Score : {props.userscore.score}</p>}
  {fiveBest.length !== 0 && <p className="score">Best Scores : {fiveBest}</p>}
  </div>
  </div>
  <div className="modal-footer game-card-footer">
  <div className="game-fan">{gameFansCounter(props.fans)}</div>
  <div className="game-mobile-ready">{gameMobileReadyIcon(props.game.mobile_ready)}<span className="tooltiptext">{mobileReadyText(props.game.mobile_ready)}</span></div>
  <div className="game-evaluator">{gameFeedbackIcons(props.feedbacks)}</div>
  </div>
  </div>
  </div>

  return (
    <div className="game-card">
    <div className="game-card-header">
    <img className="game-card-img" src={props.game.image_url} alt={"screenshot of " + props.game.game_title}/>
    <div className="game-favorite">{gameFavoriteIcon(props.favorite)}</div>
    <div className="game-feedback">{gameFeedbackIcons(userRating)}</div>
    </div>
    <div className="game-card-body">
    <h3>{props.game.game_title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</h3>
    <h6>{props.gametype.game_type_title}</h6>
    <p>{props.game.game_descr.slice(0,99).normalize("NFD").replace(/[\u0300-\u036f]/g, "")}<span className="show-button" onClick={toggleDetails}>{linkName}</span></p>
    </div>
    <div className="game-card-footer">
    <div className="game-fan">{gameFansCounter(props.fans)}</div>
    <div className="game-mobile-ready" title={mobileReadyText(props.game.mobile_ready)}>{gameMobileReadyIcon(props.game.mobile_ready)}</div>
    <div className="game-evaluator">{gameFeedbackIcons(props.feedbacks)}</div>
    </div>
    {viewMore && showDetails}
    </div>
    );
}

export default GameCard;

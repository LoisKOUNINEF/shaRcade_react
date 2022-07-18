import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { API_URL } from '../../stores/api_url'
import GameCard from '../GameCard/GameCard'
import './GamesIndex.css'

const GamesIndex = () => {

    const [gameList, setGameList] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [gameTypesList, setGameTypesList] = useState([]);
    const [scoresList, setScoresList] = useState([]);

    const [gamesLoading, setGamesLoading] = useState(true);
    const [gameTypesLoading, setGameTypesLoading] = useState(true);
    const [scoresLoading, setScoresLoading] = useState(true);
    const [favoritesLoading, setFavoritesLoading] = useState(true);
    const [feedbacksLoading, setFeedbacksLoading] = useState(true);

    const user = Cookies.get("fulluser") ? JSON.parse(Cookies.get("fulluser")) : "";

    useEffect(() => {
        fetch(`${API_URL}games`, {
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
    }, [gamesLoading]);

    useEffect(() => {
        fetch(`${API_URL}favorites`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setFavorites(response);
            setFavoritesLoading(response.length <= 0);
        })
        .catch((error) => console.log(error));
    }, [favoritesLoading]);

    useEffect(() => {
        fetch(`${API_URL}feedbacks`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setFeedbacks(response);
            setFeedbacksLoading(response.length <= 0);
        })
        .catch((error) => console.log(error));
    }, [feedbacksLoading]);

    useEffect(() => {
        fetch(`${API_URL}game_types`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setGameTypesList(response);
            setGameTypesLoading(response.length <= 0);
        })
        .catch((error) => console.log(error));
    },[gameTypesLoading]);

    useEffect(() => {
        fetch(`${API_URL}scores`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setScoresList(response);
            setScoresLoading(response.length <= 0);
        })
        .catch((error) => console.log(error));
    },[scoresLoading]);

    const gameCards = gameList.map(game => {

        let gameType = gameTypesList.find(gametype => gametype.id === game.game_type_id);

        let scores = scoresList.filter(score => score.game_id === game.id);
        let lastScore = scores.at(-1);
        let userScores = scores.filter(score => score.user_id === user.id);
        let lastUserScore = userScores.at(-1);
        let sortedScores = scores.sort(function(a,b) {
            return a.score - b.score;
        });
        let fiveBest = sortedScores.slice(-5);

        let feedbacksCount = feedbacks.filter(feedback => feedback.game_id === game.id);
        let feedbacksRatings = 0;
        feedbacksCount.map(feedback => {
            return feedbacksRatings += feedback.rating;
        });
        let averageRating = Math.round(feedbacksRatings / feedbacksCount.length);
        let userFeedback = feedbacksCount.find(feedback => feedback.user_id === user.id);
        let userEval = userFeedback ? userFeedback : 0;

        let favoritesCount = favorites.filter(favorite => favorite.game_id === game.id);
        let userFavorite = favoritesCount.find(favorite => favorite.user_id === user.id);
        let isFavorite = userFavorite ? true : false;

        return <GameCard game={game} fans={favoritesCount.length} feedbacks={averageRating} favorite={isFavorite} evaluation={userEval} gametype={gameType} lastscore={lastScore} key={game.id}/>
    })

    return (
        <div className="game-list">
        {gamesLoading || gameTypesLoading || scoresLoading || favoritesLoading || feedbacksLoading ? <h2>"-- Games info loading --"</h2> : gameCards}
        </div>
        )
}

export default GamesIndex

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { API_URL } from '../../stores/api_url';
import GameCard from '../GameCard/GameCard';
import './GamesIndex.css';

const GamesIndex = () => {

    const [gameList, setGameList] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [gameTypesList, setGameTypesList] = useState([]);
    const [scoresList, setScoresList] = useState([]);
    const [usersList, setUsersList] = useState([]);

    const [keysList, setKeysList] = useState([]);
    const [user, setUser] = useState([]);

    const [gamesLoading, setGamesLoading] = useState(true);
    const [gameTypesLoading, setGameTypesLoading] = useState(true);
    const [scoresLoading, setScoresLoading] = useState(true);
    const [favoritesLoading, setFavoritesLoading] = useState(true);
    const [feedbacksLoading, setFeedbacksLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [keysLoading, setKeysLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        setUser(Cookies.get("fulluser") ? JSON.parse(Cookies.get("fulluser")) : "");
        setUserLoading(false);
    }, [userLoading]);

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

    useEffect(() => {
        fetch(`${API_URL}users/actions`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setUsersList(response);
            setUsersLoading(response.length <= 0);
        })
        .catch((error) => console.log(error));
    }, [usersLoading]);

    useEffect(() => {
        fetch(`${API_URL}api_calls`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setKeysList(response);
            setKeysLoading(response.length <= 0);
        })
        .catch((error) => console.log(error));
    }, [keysLoading]);


    const gameCards = gameList.map(game => {

        let gameType = gameTypesList.find(gametype => gametype.id === game.game_type_id);
        let key = keysList.find(key => key.game_id === game.id);
        let gameOwner = key ? usersList.find(user => user.id === key.user_id) : "";

        let scores = scoresList.filter(score => score.game_id === game.id);
        let lastScore = scores.at(-1) ? scores.at(-1) : "";
        let lastUser = lastScore ? usersList.find(user => user.id === lastScore.user_id) : "";
        let sortedScores = scores.sort(function(a,b) {
            return a.score - b.score;
        });
        let bestScore = sortedScores.at(-1) ? sortedScores.at(-1) : "";
        let bestUser = bestScore ? usersList.find(user => user.id === bestScore.user_id) : "";
        let fiveBest = sortedScores.slice(-5);
        let userScores = scores.filter(score => score.user_id === user.id);
        let lastUserScore = userScores.at(-1) ? userScores.at(-1) : "";
        let sortedUserScores = userScores.sort(function(a,b) {
            return a.score - b.score;
        });
        let bestUserScore = sortedUserScores.at(-1) ? sortedUserScores.at(-1) : "";

        let feedbacksCount = feedbacks.filter(feedback => feedback.game_id === game.id);
        let feedbacksRatings = 0;
        feedbacksCount.map(feedback => {
            return feedbacksRatings += feedback.rating;
        });
        let averageRating = Math.round(feedbacksRatings / feedbacksCount.length);
        let userFeedback = feedbacksCount.filter(feedback => feedback.user_id === user.id).at(-1);
        let userEval = userFeedback ? userFeedback : 0;

        let favoritesCount = favorites.filter(favorite => favorite.game_id === game.id);
        let userFavorite = favoritesCount.find(favorite => favorite.user_id === user.id);
        let isFavorite = userFavorite ? true : false;

        return <GameCard
        game={game}
        gameowner={gameOwner}
        fans={favoritesCount.length}
        feedbacks={averageRating}
        favorite={isFavorite}
        evaluation={userEval}
        gametype={gameType}
        lastscore={lastScore}
        lastuser={lastUser}
        fivebest={fiveBest}
        bestscore={bestScore}
        bestuser={bestUser}
        user={user}
        userscore={lastUserScore}
        bestuserscore={bestUserScore}
        userslist={usersList}
        key={game.id}
        />
    }).reverse();

    return (
        <div className="game-list">
        {gamesLoading ||
        userLoading ||
        gameTypesLoading ||
        scoresLoading ||
        favoritesLoading ||
        feedbacksLoading ||
        usersLoading ? <h2>"-- Games info loading --"</h2>
        : gameCards}
        </div>
        )
}

export default GamesIndex

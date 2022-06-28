import React, { useEffect, useState } from 'react'
import { API_URL } from '../../stores/api_url'
import GameCard from '../GameCard/GameCard'
import './GamesIndex.css'

const GamesIndex = () => {

    const [gameList, setGameList] = useState([]);

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
        })
        .catch((error) => console.log(error));
    }, [])

    const gameCards = gameList.map(game => <GameCard game={game} key={game.id}/>)

    return (
        <div className="game-list">
        {gameCards}
        </div>
        )
}

export default GamesIndex

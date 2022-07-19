import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { authorizationAtom } from '../../stores/cookies';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../../stores/api_url';
import './NewGame.css';

const NewGame = () => {

  const [gameTitle, setGameTitle] = useState();
  const [gameUrl, setGameUrl] = useState();
  const [gameDescription, setGameDescription] = useState();
  const [gameTypesList, setGameTypesList] = useState([]);
  const [gameTypesLoading, setGameTypesLoading] = useState(true);
  const [gameType, setGameType] = useState(1);
  const [imageUrl, setImageUrl] = useState();
  const [mobileReady, setMobileReady] = useState(false);
  const [myAuthorization, setAuthorization] = useAtom(authorizationAtom);

    // REMINDER - Game Physical Data Model
    // id: integer
    // game_title: string
    // game_url: string
    // game_descr: text
    // game_type_id: integer
    // mobile_ready : boolean
    // image_url: string
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
      });
    }, [gameTypesLoading]);
    const submitData = (e) => {

      e.preventDefault();

      const data = {
        "game": {
          "game_title": gameTitle ? gameTitle : "Unknown",
          "game_url": gameUrl ? gameUrl : "Unknown",
          "game_descr": gameDescription ? gameDescription : "Unknown",
          "game_type_id": gameType,
          "mobile_ready": mobileReady,
          "image_url": imageUrl
        }
      };

      fetch(`${API_URL}games`, {
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

    return (
      <div className="new-game-form-container">
        <Form className="form" onSubmit={submitData}>
          <Form.Group className="mb-3" controlId="formSubmitGame">
            <Form.Label className="label">Game name</Form.Label>
            <Form.Control className="field" type="input" placeholder="Enter a game name" onChange={(e) => setGameTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubmitGame">
            <Form.Label className="label">Game link</Form.Label>
            <Form.Control className="field" type="input" placeholder="Set link for your game" onChange={(e) => setGameUrl(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubmitGame">
            <Form.Label className="label">Game description</Form.Label>
            <Form.Control className="field" type="textarea" placeholder="Describe your game" onChange={(e) => setGameDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubmitGame">
            <Form.Label className="label">Game type</Form.Label>
            <select onChange={(e) => setGameType(e.target.value)}>
              {gameTypesList.map((gametype) => (
              <option value={gametype.id}>{gametype.game_type_title}</option>
              ))}
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubmitGame">
            <Form.Label className="label">Game image URL</Form.Label>
            <Form.Control className="field" type="input" placeholder="Set an image for your game" onChange={(e) => setImageUrl(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubmitGame" onClick={(e) => setMobileReady(!mobileReady)}>
            <Form.Label className="label">{mobileReady ? "Your game can be played on touch devices." : "Your game can be played on a computer only."}</Form.Label>
            <div>{mobileReady ? <p className="mobile-btn">Computer Only</p> : <p className="mobile-btn">Mobile Ready</p>}</div>
          </Form.Group>
          <Button className="submit-btn" variant="primary" type="submit">Submit</Button>
        </Form>
      </div>
      );
  }

  export default NewGame

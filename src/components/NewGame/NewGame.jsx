import React from 'react'
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './NewGame.css';

const NewGame = () => {

    const [gameTitle, setGameTitle] = useState();
    const [gameUrl, setGameUrl] = useState();
    const [gameDescription, setGameDescription] = useState();
    const [gameType, setGameType] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [mobileReady, setMobileReady] = useState();
    
    // REMINDER - Game Physical Data Model
    // id: integer
    // game_title: string
    // game_url: string
    // game_descr: text
    // game_type_id: integer
    // mobile_ready : boolean
    // image_url: string

    return (
        <div className='new-game-form-container'>
            <Form className="form" onSubmit={fetchData}>
                <Form.Group className="mb-3" controlId="formSubmitGame">
                    <Form.Label className="label">Game name</Form.Label>
                    <Form.Control className="field" type="input" placeholder="Enter a game name" onChange={(e) => setGameTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmitGame">
                    <Form.Label className="label">Game link</Form.Label>
                    <Form.Control className="field" type="input" placeholder="Set link for our game" onChange={(e) => setGameUrl(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmitGame">
                    <Form.Label className="label">Game description</Form.Label>
                    <Form.Control className="field" type="textarea" placeholder="Describe your game" onChange={(e) => setGameDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmitGame">
                    <Form.Label className="label">Game type</Form.Label>
                    <Form.Control className="field" type="integer" placeholder="Select a category for your game" onChange={(e) => setGameType(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmitGame">
                    <Form.Label className="label">Game screenshot name (e.g. 'mariobros.jpg')</Form.Label>
                    <Form.Control className="field" type="input" placeholder="Set an image for your game" onChange={(e) => setImageUrl(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmitGame">
                    <Form.Label className="label">Playable on mobile</Form.Label>
                    <Form.Control className="field" type="checkbox" placeholder="Is your game playable on mobile ?" onChange={(e) => setMobileReady(e.target.value)} />
                </Form.Group>
                <Button className="submit-btn" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default NewGame
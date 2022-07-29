import React from 'react'
import './About.css';


const About = () => {
    return (
        <div className="container">
        <h3>Want to link your game to shaRcade so that the whole world could enjoy it ?</h3>
        <p>It's just a coppel lines away !<br/>
        You will be provided an unique API Key when you register a game.<br/>
        Here's a small exemple in JavaScript on how to send scores from your game to shaRcade :
        </p>
        <code>
        {`function submitScore() {`}<br/><br/>
        {`const data = {`}<br/>
        {`"score_token" : {`}<br/>
        {`"hi_score" : Integer,`}<br/>
        {`"api_key" : YOUR_GAME'S_API_KEY,`}<br/>
        {`"user_email" : String`}<br/>
        {`}`}<br/>
        {`};`}<br/><br/>
        {`fetch('https://sharcade-api.herokuapp.com/sharcade_api', {`}<br/>
        {`method: 'post',`}<br/>
        {`headers: {`}<br/>
        {`'Content-Type': 'application/json'`}<br/>
        {`},`}<br/>
        {`body: JSON.stringify(data)`}<br/>
        {`})`}<br/>
        {`.catch((error) => console.log(error));`}<br/><br/>
        {`}`}<br/>
        </code>
        </div>
        )
}

export default About

import React from 'react'
import './Hero.css';

const Hero = () => {
    return (
        <section className='hero-container retro'>
            <h1>Just shaRcade it !</h1>
            <div className="hero-txt">
            <div className="hero-txt-left">
            <p>Enjoy <strong>coding</strong> browser games ?</p>
            <p>shaRcade is the place to Share'em all !</p>
            </div>
            <div className="hero-txt-right">
            <p>Enjoy <strong>playing</strong> browser games ?</p>
            <p>shaRcade is the place to Find'em all !</p>
            </div>
            </div>
            <h4><a href="/signup">Join shaRcade Now !</a></h4>
        </section>
    )
}

export default Hero

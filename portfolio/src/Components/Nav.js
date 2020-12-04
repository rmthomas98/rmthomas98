import React from 'react';
import { Link } from 'react-scroll';

const Nav = () => {

    return(
        <div className="buttons">
            <a href="https://github.com/rmthomas98" target="_blank">Github</a>
            <Link to="projects" spy={true} smooth={true} duration={1000}>Projects</Link>
            <Link to="about" spy={true} smooth={true} duration={1200}>About me</Link>
        </div>
    )
}

export default Nav;
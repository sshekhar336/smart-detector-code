import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import userImage from './user.png';

export default function Logo() {
    return (
        <div>

            <Tilt className="Tilt" options={{ max: 75 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner"> <img className="Logo" src={userImage} alt='logo'/> </div>
            </Tilt>
        </div>
    )
}

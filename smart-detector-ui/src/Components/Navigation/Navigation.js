import React from 'react'
import './Navigation.css';

export default function Navigation(props) {
    return (
        <nav>
            <p className="signout" onClick={() => props.onRoutChange('signIn')} >Sign Out</p>
        </nav>
    )
}

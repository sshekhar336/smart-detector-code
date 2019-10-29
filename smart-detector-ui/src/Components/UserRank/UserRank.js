import React from 'react';
import './UserRank.css';

export default function UserRank(props) {
    return (
        <div>
            <p className="rank">
                {'Hey '+ props.user.name +', Your count is...'}
            </p>
            <p className="rankvalue">
                {props.user.entries}
            </p>
        </div>
    )
}

import React from 'react';

function Spinner(props) {
    return (
        <div className="spinner-border" role="status">
            <span className="sr-only">{props.title}</span>
        </div>
    );
}

export default Spinner;
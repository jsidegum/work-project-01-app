import React from 'react';

const CardContent = (props) => {
    return (
        <div className="container mt-4 border rounded">
            <h1 className="display-6 text-center border-bottom">{props.title}</h1>
            {props.children}
        </div>
    );
};

export default CardContent;
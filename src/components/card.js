import React from 'react';
import { Card } from 'react-bootstrap';

const CenteredCard = (props) => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    {props.children}
                </Card.Body>
            </Card>
        </div>
    );
};

export default CenteredCard;
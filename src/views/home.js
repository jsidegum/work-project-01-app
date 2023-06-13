import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <Container>
            <Row className="justify-content-center align-items-center" style={{ height: '70vh' }}>
                <Col className="text-center">
                    <h1>Bem-vindo a página inicial!!!</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;

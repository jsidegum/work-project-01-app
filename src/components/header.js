import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="primary" expand="lg" fixed="top" className="w-100">
            <Container>
                <Navbar.Brand className="text-white text-center py-3" href="/">Meu App</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;
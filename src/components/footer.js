import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer fixed-bottom bg-primary">
            <Container className="text-white text-center py-3">
                Desenvolvido por Juliana Sidegum (Front-end) e Davi Gilvanni Brinhosa Henriques (Back-end)
            </Container>
        </footer>
    );
};

export default Footer;
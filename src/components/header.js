import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';


const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem('_usuario_logado');
        console.log("Logout realizado com sucesso!");
    };

    const usuarioLogado = localStorage.getItem('_usuario_logado');

    return (
        <Navbar bg="primary" expand="lg" fixed="top" className="w-100">
            <Container>
                <Navbar.Brand className="text-white text-center py-3" href="/">Meu App</Navbar.Brand>
                {usuarioLogado && (
                    <Button onClick={handleLogout} variant="danger" className="ml-auto" href="/sair">
                        Sair
                    </Button>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
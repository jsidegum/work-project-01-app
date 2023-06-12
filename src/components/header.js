import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem('_usuario_logado');
        window.location.reload();
        //console.log("Logout realizado com sucesso!");
    };

    const usuarioLogado = localStorage.getItem('_usuario_logado');

    return (
        <Navbar bg="primary" expand="lg" fixed="top" className="w-100">
            <Container>
                <Navbar.Brand className="text-white text-center py-3" href={usuarioLogado ? "/home" : "/"}>Meu App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        {usuarioLogado && (
                            <>
                                <Nav.Link className="text-white" href="/home">Home</Nav.Link>
                                <Nav.Link className="text-white" href="/cadastrar-usuario">Usuários</Nav.Link>
                                <Nav.Link className="text-white" href="/consultar-contatos">Contatos</Nav.Link>
                                <Nav.Link className="text-white" onClick={handleLogout}>Sair</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default Header;

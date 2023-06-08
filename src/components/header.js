import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { IoLogOutOutline } from 'react-icons/io5';

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem('_usuario_logado');
        window.location.reload();
        console.log("Logout realizado com sucesso!");
    };

    const usuarioLogado = localStorage.getItem('_usuario_logado');

    return (
        <Navbar bg="primary" expand="lg" fixed="top" className="w-100">
            <Container>
                <Navbar.Brand className="text-white text-center py-3" href={usuarioLogado ? "/home" : "/"}> Meu App</Navbar.Brand>
                {usuarioLogado && (
                    <div style={{ color: 'white' }}>
                        {usuarioLogado.replace(/['"]+/g, ' ')}
                        <IoLogOutOutline
                            size={28}
                            onClick={handleLogout}
                            className="ml-auto text-white"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
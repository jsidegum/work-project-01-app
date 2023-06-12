import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/login';
import CadastrarUsuario from '../views/cadastrarUsuario';
import Home from '../views/home';
import CadastrarContatos from '../views/contatos/cadastrarContatos';
import ConsultarContatos from '../views/contatos/consultarContatos';

const Rotas = () => {

    //const isUsuarioAutenticado = true;
    const isUsuarioAutenticado = localStorage.getItem('_usuario_logado');

    return (
        <Router>
            <Routes>
                {/* Independentes de autenticação */}
                <Route exact path="/" element={<Login />} />
                <Route exact path="/cadastrar-usuario" element={<CadastrarUsuario />} />
                {/* Dependentes de autenticação */}
                {isUsuarioAutenticado ? (
                    <>
                        <Route exact path="/home" element={<Home />} />
                        <Route exact path="/cadastrar-contatos" element={<CadastrarContatos />} />
                        <Route exact path="/consultar-contatos" element={<ConsultarContatos />} />
                    </>
                ) : (
                    <Route path="/*" element={<Navigate to="/" />} />
                )}

            </Routes>
        </Router >
    );
};

export default Rotas;
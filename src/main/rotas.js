import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/login';
import CadastrarUsuario from '../views/cadastrarUsuario';
import Home from '../views/home';

const isUsuarioAutenticado = false; // provisorio

const Rotas = () => {
    return (
        <Router>
            <Routes>

                {/* Independentes de autenticação */}
                <Route exact path="/" element={<Login />} />
                <Route exact path="/cadastrar-usuario" element={<CadastrarUsuario />} />

                {/* Dependentes de autenticação */}
                {isUsuarioAutenticado ? (
                    <Route exact path="/home" element={<Home />} />
                ) : (
                    <Route path="/*" element={<Navigate to="/" />} />
                )}

            </Routes>
        </Router>
    );
};

export default Rotas;
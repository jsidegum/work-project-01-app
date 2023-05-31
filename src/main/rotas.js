import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../views/login';
import CadastrarUsuario from '../views/cadastrarUsuario';
import Home from '../views/home';

const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/cadastrar-usuario" element={<CadastrarUsuario />} />
                <Route exact path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default Rotas;
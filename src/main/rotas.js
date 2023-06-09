import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/login';
import CadastrarUsuario from '../views/cadastrarUsuario';
import Home from '../views/home';
import CadastrarContatos from '../views/contatos/cadastrarContatos';

const Rotas = () => {

    //const isUsuarioAutenticado = true;
    const isUsuarioAutenticado = localStorage.getItem('_usuario_logado');

    return (
        <div className="rotas-container">

            <Router>
                <Routes>
                    {/* Independentes de autenticação */}
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/cadastrar-usuario" element={<CadastrarUsuario />} />

                    {/* Dependentes de autenticação */}
                    {isUsuarioAutenticado ? (
                        <>
                            <Route exact path="/cadastrar-contatos" element={<CadastrarContatos />} />
                            <Route exact path="/home" element={<Home />} />
                        </>
                    ) : (
                        <Route path="/*" element={<Navigate to="/" />} />
                    )}

                </Routes>
            </Router >

            <style>
                {`
                    @media screen and (max-width: 675px) {
                        .rotas-container {
                            padding-top: 105px;
                            padding-bottom: 80px;
                        }
                    }

                    @media screen and (max-width: 375px) {
                        .rotas-container {
                            padding-top: 200px;
                            padding-bottom: 180px;
                        }
                    }
                `}
            </style>

        </div>
    );
};

export default Rotas;
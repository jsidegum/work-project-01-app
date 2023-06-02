import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CenteredCard from '../components/card';
import axios from 'axios';
import ModalAlert from '../components/modalAlert';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [mensagemModalAlert, setMensagemModalAlert] = useState('');

    const navigate = useNavigate();

    const handleCloseModalAlert = () => {
        setShowModalAlert(false);
    };

    const entrar = async () => {

        const data = {
            email: email,
            password: senha
        };

        axios.post('http://localhost:8080/userData/auth', data)
            .then(response => {
                localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
                navigate('/home');
                window.location.reload();
            })
            .catch(error => {
                setMensagemModalAlert(error.response.data);
                setShowModalAlert(true);
            });

    };

    return (
        <CenteredCard title="Faça seu Login">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite o login"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite a senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </Form.Group>

                <br />
                <div className="d-grid gap-2">
                    <Button variant="primary" type="button" className="w-100" onClick={entrar}>
                        Entrar
                    </Button>
                </div>

                <div className="d-flex justify-content-center">
                    <Form.Text className="text-muted">
                        <a href="/cadastrar-usuario">Cadastre-se</a>
                    </Form.Text>
                </div>
            </Form>

            {showModalAlert && (
                <ModalAlert
                    mensagem={mensagemModalAlert}
                    handleClose={handleCloseModalAlert}
                />
            )}

        </CenteredCard>
    );
};

export default Login;
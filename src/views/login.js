import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CenteredCard from '../components/card';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const entrar = () => {
        console.log('Email:', email);
        console.log('Senha:', senha);
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
                        <a href="#">Cadastre-se</a>
                    </Form.Text>
                </div>
            </Form>
        </CenteredCard>
    );
};

export default Login;
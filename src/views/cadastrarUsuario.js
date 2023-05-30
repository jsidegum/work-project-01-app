import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CenteredCard from '../components/card';

const CadastrarUsuario = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const cadastrar = () => {
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Senha:', senha);
        console.log('Confirmar Senha:', confirmarSenha);
    };

    return (
        <CenteredCard title="Cadastre-se">
            <Form>
                <Form.Group controlId="formBasicNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite o email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicSenha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite a senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmarSenha">
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirme a senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={cadastrar}>
                    Salvar
                </Button>
                <Button variant="secondary" className="ml-2" onClick={() => { }}>
                    Cancelar
                </Button>
            </Form>
        </CenteredCard>
    );
};

export default CadastrarUsuario;
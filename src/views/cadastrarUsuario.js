import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CenteredCard from '../components/card';
import DOMPurify from 'dompurify'; // Importando a biblioteca DOMPurify


const CadastrarUsuario = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const navigate = useNavigate();

    const nomeSanitizado = DOMPurify.sanitize(nome); //Testar: <script>alert('Teste ataque XSS!');</script>

    const cadastrar = () => {

        if (nomeSanitizado !== nome) {
            alert('O valor do campo Nome contém conteúdo malicioso.');
            return;
        }

        console.log('Nome:', nomeSanitizado);
        console.log('Email:', email);
        console.log('Senha:', senha);
        console.log('Confirmar Senha:', confirmarSenha);
    };

    const cancelar = () => {
        navigate('/');
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
                <Button variant="secondary" className="ml-2" onClick={cancelar}>
                    Cancelar
                </Button>
            </Form>
        </CenteredCard>
    );
};

export default CadastrarUsuario;
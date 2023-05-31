import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CenteredCard from '../components/card';
import DOMPurify from 'dompurify';
import ModalAlert from '../components/modalAlert';


const CadastrarUsuario = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');

    const navigate = useNavigate();
    const nomeSanitizado = DOMPurify.sanitize(nome); //Testar: <script>alert('Teste ataque XSS!');</script>

    const cadastrar = () => {

        if (nomeSanitizado !== nome) {
            setMensagemModal('O valor do campo Nome contém conteúdo malicioso.');
            setShowModal(true);
            return;
        }

        if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
            setMensagemModal('Por favor, preencha todos os campos.');
            setShowModal(true);
            return;
        }

        if (!isValidEmail(email)) {
            setMensagemModal('O email digitado não é válido.');
            setShowModal(true);
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagemModal('A senha e a confirmação de senha devem ser iguais.');
            setShowModal(true);
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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

            {showModal && (
                <ModalAlert
                    titulo="Dados incorretos"
                    mensagem={mensagemModal}
                    handleClose={handleCloseModal}
                />
            )}

        </CenteredCard>
    );
};

export default CadastrarUsuario;
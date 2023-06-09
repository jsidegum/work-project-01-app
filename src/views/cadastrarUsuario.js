import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ModalAlert from '../components/modalAlert';
import ModalSuccess from '../components/modalSuccess';
import axios from 'axios';
import { aesUtil } from '../crypto/AESUtil';
import CardCentered from '../components/cardCentered';

const CadastrarUsuario = () => {

    const url = process.env.REACT_APP_URL;
    const key = process.env.REACT_APP_KEY;

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [showModalAlert, setShowModalAlert] = useState(false);
    const [mensagemModalAlert, setMensagemModalAlert] = useState('');

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [mensagemModalSuccess, setMensagemModalSuccess] = useState('');

    const navigate = useNavigate();
    const nomeSanitizado = DOMPurify.sanitize(nome); //Testar: <script>alert('Teste ataque XSS!');</script>

    const hashedEmail = aesUtil.encrypt(key, email);
    const hashedSenha = aesUtil.encrypt(key, senha);
    const hashedName = aesUtil.encrypt(key, nomeSanitizado);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validarCampos = () => {
        if (nomeSanitizado !== nome) {
            setMensagemModalAlert('O valor do campo Nome contém conteúdo malicioso.');
            setShowModalAlert(true);
            return false;
        }

        if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
            setMensagemModalAlert('Por favor, preencha todos os campos.');
            setShowModalAlert(true);
            return false;
        }

        if (!isValidEmail(email)) {
            setMensagemModalAlert('O email digitado não é válido.');
            setShowModalAlert(true);
            return false;
        }

        // Verificar a força da senha
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:<>|./?]).{8,}$/;

        if (!strongPasswordRegex.test(senha)) {
            setMensagemModalAlert('A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
            setShowModalAlert(true);
            return false;
        }

        if (senha !== confirmarSenha) {
            setMensagemModalAlert('A senha e a confirmação de senha devem ser iguais.');
            setShowModalAlert(true);
            return false;
        }
        return true;
    };

    const cadastrar = () => {

        if (!validarCampos()) {
            return;
        }

        const data = {
            name: hashedName,
            password: hashedSenha,
            email: hashedEmail,
        };

        axios.post(url + '/userData', data)
            .then(response => {
                //console.log(response);
                setMensagemModalSuccess(response.data);
                setShowModalSuccess(true);
            })
            .catch(error => {
                //console.error(error);
                setMensagemModalAlert(error.message);
                setShowModalAlert(true);
            });

    };

    const cancelar = () => {
        navigate('/');
    };

    const handleCloseModalAlert = () => {
        setShowModalAlert(false);
    };

    const handleCloseModalSuccess = () => {
        setShowModalSuccess(false);
        navigate('/');
    };

    return (
        <CardCentered title='Cadastre-se' style={{ width: '350px' }}>
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

            {
                showModalAlert && (
                    <ModalAlert
                        mensagem={mensagemModalAlert}
                        handleClose={handleCloseModalAlert}
                    />
                )
            }

            {
                showModalSuccess && (
                    <ModalSuccess
                        mensagem={mensagemModalSuccess}
                        handleClose={handleCloseModalSuccess}
                    />
                )
            }
        </CardCentered >
    );
};

export default CadastrarUsuario;
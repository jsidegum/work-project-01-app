import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import ModalAlert from '../components/modalAlert';
import { useNavigate } from 'react-router-dom';
import { aesUtil } from '../crypto/AESUtil';
import CardCentered from '../components/cardCentered';

const Login = () => {
    const url = process.env.REACT_APP_URL;
    const key = process.env.REACT_APP_KEY;

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [mensagemModalAlert, setMensagemModalAlert] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const hashedEmail = aesUtil.encrypt(key, email);
    const hashedSenha = aesUtil.encrypt(key, senha);

    const handleCloseModalAlert = () => {
        setShowModalAlert(false);
    };

    const entrar = async () => {
        const data = {
            email: hashedEmail,
            password: hashedSenha
        };

        console.log(data);

        axios
            .post(url + '/userData/auth', data)
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <CardCentered title="Faça seu Login">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite o login"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                        Senha
                        <InputGroup>
                            <FormControl
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Digite a senha"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                            <InputGroup.Text onClick={togglePasswordVisibility}>
                                {passwordVisible ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Label>
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
                    handleClose={handleCloseModalAlert} />
            )}
        </CardCentered>
    );
};

export default Login;
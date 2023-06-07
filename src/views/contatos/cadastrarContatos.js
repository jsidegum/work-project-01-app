import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CenteredCard from '../../components/card';
import { Form, Row, Col, Button } from 'react-bootstrap';

const CadastrarContato = () => {
    const [contato, setContato] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const navigate = useNavigate();

    const cadastrar = () => {
        console.log(contato, telefone, email, cep, logradouro, numero, complemento, bairro, cidade, estado);
    }

    const cancelar = () => {
        navigate('/');
    };

    return (
        <CenteredCard width="40rem" title="Cadastrar Contato">
            <Form>
                <Row>
                    <Form.Group as={Col} xs={12} sm={12} controlId="formContato">
                        <Form.Label>Contato</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome do contato"
                            value={contato}
                            onChange={(e) => setContato(e.target.value)}
                        />

                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={3} controlId="formTelefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={9} controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={3} controlId="formCep">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={7} controlId="formLogradouro">
                        <Form.Label>Logradouro</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Logradouro"
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} xs={12} sm={2} controlId="formNumero">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="N°"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={6} controlId="formComplemento">
                        <Form.Label>Complemento</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Complemento"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={6} controlId="formBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={10} controlId="formCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={2} controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <br />
                <Row>
                    <Col xs={12}>
                        <Button variant="primary" className="mr-2" onClick={cadastrar}>
                            Salvar
                        </Button>
                        <Button variant="secondary" onClick={cancelar}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </CenteredCard>
    );
};

export default CadastrarContato;

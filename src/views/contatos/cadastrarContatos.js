import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardContent from '../../components/cardContent';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ModalAlert from '../../components/modalAlert';
import InputMask from 'react-input-mask';
import SelectMenu from '../../components/selectMenu';
import DOMPurify from 'dompurify';
import axios from 'axios';
import ModalSuccess from '../../components/modalSuccess';
import { useParams } from 'react-router-dom';

const CadastrarContato = () => {

    const url = process.env.REACT_APP_URL;

    const usuarioLogado = JSON.parse(localStorage.getItem('_usuario_logado'));

    const [idContato, setIdContato] = useState(null);
    const [contato, setContato] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [idEndereco, setIdEndereco] = useState(null);
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const [atualizando, setAtualizando] = useState(false);

    const [showModalAlert, setShowModalAlert] = useState(false);
    const [mensagemModalAlert, setMensagemModalAlert] = useState('');

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [mensagemModalSuccess, setMensagemModalSuccess] = useState('');

    const contatoSanitizado = DOMPurify.sanitize(contato); //Testar: <script>alert('Teste ataque XSS!');</script>
    const telefoneSanitizado = DOMPurify.sanitize(telefone);
    const emailSanitizado = DOMPurify.sanitize(email);
    const cepSanitizado = DOMPurify.sanitize(cep);
    const logradouroSanitizado = DOMPurify.sanitize(logradouro);
    const numeroSanitizado = DOMPurify.sanitize(numero);
    const complementoSanitizado = DOMPurify.sanitize(complemento);
    const bairroSanitizado = DOMPurify.sanitize(bairro);
    const cidadeSanitizado = DOMPurify.sanitize(cidade);

    const listaEstados = [
        { value: 'teste', label: 'Selecione' },
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'TO', label: 'Tocantins' },
    ];

    const navigate = useNavigate();
    const params = useParams();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCloseModalSuccess = () => {
        setShowModalSuccess(false);
        navigate('/consultar-contatos');
    };

    const cancelar = () => {
        navigate('/consultar-contatos');
    };

    const handleCloseModalAlert = () => {
        setShowModalAlert(false);
    };

    const validarCampos = () => {

        if (contatoSanitizado !== contato ||
            telefoneSanitizado !== telefone ||
            emailSanitizado !== email ||
            cepSanitizado !== cep ||
            logradouroSanitizado !== logradouro ||
            numeroSanitizado !== numero ||
            complementoSanitizado !== complemento ||
            bairroSanitizado !== bairro ||
            cidadeSanitizado !== cidade) {
            setMensagemModalAlert('Campo(s) com conteúdo malicioso.');
            setShowModalAlert(true);
            return false;
        }

        if (contato === '' || telefone === '' || email === '') {
            setMensagemModalAlert('Por favor, preencha os campos obrigatórios: Contato, Telefone e Email');
            setShowModalAlert(true);
            return false;
        }

        if (!isValidEmail(email)) {
            setMensagemModalAlert('O email digitado não é válido.');
            setShowModalAlert(true);
            return false;
        }

        return true;

    }

    const cadastrar = () => {

        if (!validarCampos()) {
            return;
        }

        const data = {
            user: usuarioLogado.id,
            name: contatoSanitizado,
            cellphone: telefoneSanitizado,
            email: emailSanitizado,
            address: {
                user: usuarioLogado.id,
                zipCode: cepSanitizado,
                streetAddress: logradouroSanitizado,
                buildingNumber: numeroSanitizado,
                complement: complementoSanitizado,
                district: bairroSanitizado,
                city: cidadeSanitizado,
                region: estado,
            }

        };

        axios.post(`${url}/contacts/${usuarioLogado.id}`, data)
            .then(response => {
                setMensagemModalSuccess(response.data);
                setShowModalSuccess(true);
            })
            .catch(error => {
                setMensagemModalAlert(error.response.data);
                setShowModalAlert(true);
            });
    }

    useEffect(() => {
        //Se for atualização de contato, o id estará na rota/url
        if (params.id) {
            axios
                .get(`${url}/contacts/${usuarioLogado.id}/${params.id}`)
                .then((response) => {

                    setAtualizando(true);

                    setIdContato(response.data.id);
                    setContato(response.data.name);
                    setTelefone(response.data.cellphone);
                    setEmail(response.data.email);
                    setIdEndereco(response.data.address.id);
                    setCep(response.data.address.zipCode);
                    setLogradouro(response.data.address.streetAddress);
                    setNumero(response.data.address.buildingNumber);
                    setComplemento(response.data.address.complement);
                    setBairro(response.data.address.district);
                    setCidade(response.data.address.city);
                    setEstado(response.data.address.region);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [url, usuarioLogado.id, params.id]);

    const atualizar = () => {

        if (!validarCampos()) {
            return;
        }

        const data = {
            id: idContato,
            name: contatoSanitizado,
            cellphone: telefoneSanitizado,
            email: emailSanitizado,
            address: {
                id: idEndereco,
                zipCode: cepSanitizado,
                streetAddress: logradouroSanitizado,
                buildingNumber: numeroSanitizado,
                complement: complementoSanitizado,
                district: bairroSanitizado,
                city: cidadeSanitizado,
                region: estado,
            }
        };

        axios
            .put(`${url}/contacts/${usuarioLogado.id}/${params.id}`, data)
            .then((response) => {
                console.log(response.data);
                setMensagemModalSuccess(response.data);
                setShowModalSuccess(true);
            })
            .catch((error) => {
                console.log(error);
                setMensagemModalAlert(error.response.data);
                setShowModalAlert(true);
            });
    }

    return (
        <CardContent title={atualizando ? 'Atualizar Contato' : 'Cadastrar Novo Contato'} >
            <Form>
                <Row>
                    <Form.Group as={Col} xs={12} sm={12} controlId="formContato">
                        <Form.Label>Contato *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Contato"
                            value={contato}
                            onChange={(e) => setContato(e.target.value)}
                        />

                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={4} controlId="formTelefone">
                        <Form.Label>Telefone *</Form.Label>
                        <InputMask
                            className="form-control"
                            mask="(99) 99999-9999"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={8} controlId="formEmail">
                        <Form.Label>Email *</Form.Label>
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
                        <InputMask
                            className="form-control"
                            mask="99999-999"
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
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
                                setNumero(numericValue);
                            }}
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
                    <Form.Group as={Col} xs={12} sm={6} controlId="formCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={6} controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <SelectMenu lista={listaEstados} value={estado} onChange={(e) => setEstado(e.target.value)} />
                    </Form.Group>

                </Row>

                <br />
                <Row>
                    <Col xs={12}>
                        {atualizando ?
                            <Button variant="primary" className="mr-2" onClick={atualizar}> Atualizar </Button>
                            :
                            <Button variant="primary" className="mr-2" onClick={cadastrar}> Salvar </Button>
                        }
                        <Button variant="secondary" onClick={cancelar}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
                <br />
            </Form>

            {showModalAlert && (
                <ModalAlert
                    mensagem={mensagemModalAlert}
                    handleClose={handleCloseModalAlert}
                />
            )}

            {showModalSuccess && (
                <ModalSuccess
                    mensagem={mensagemModalSuccess}
                    handleClose={handleCloseModalSuccess}
                />
            )}
        </CardContent>
    );
};

export default CadastrarContato;

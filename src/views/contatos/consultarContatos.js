import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import CenteredCard from '../../components/card';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalSuccess from '../../components/modalSuccess';
import ModalAlert from '../../components/modalAlert';

const columns = [
    { Header: 'ID', accessor: 'id', Filter: true },
    { Header: 'Contato', accessor: 'contato', Filter: true },
    { Header: 'Telefone', accessor: 'telefone', Filter: false },
    { Header: 'Email', accessor: 'email', Filter: false },
    {
        Header: 'Ações',
        accessor: 'actions',
        disableFilters: true,
        disableSortBy: true,
        Cell: () => (
            <>
                <Button variant="link">
                    <FaEdit />
                </Button>
                <Button variant="link">
                    <FaTrash />
                </Button>
            </>
        ),
    },
];

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;
    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search (${count} records)`}
            className="form-control"
        />
    );
}

function ConsultarContatos() {
    const url = process.env.REACT_APP_URL;
    const usuarioLogado = JSON.parse(localStorage.getItem('_usuario_logado'));

    const [contatos, setContatos] = useState([]);
    const [filterInput, setFilterInput] = useState('');

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [mensagemModalSuccess, setMensagemModalSuccess] = useState('');

    const [showModalAlert, setShowModalAlert] = useState(false);
    const [mensagemModalAlert, setMensagemModalAlert] = useState('');

    useEffect(() => {
        axios
            .get(`${url}/contacts/${usuarioLogado.id}`)
            .then((response) => {
                const data = response.data.map((obj) => ({
                    id: obj.id,
                    contato: obj.name,
                    telefone: obj.cellphone,
                    email: obj.email,
                }));
                setContatos(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const defaultColumn = {
        Filter: DefaultColumnFilter,
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state: { pageIndex },
        setFilter,
    } = useTable(
        {
            columns,
            data: contatos,
            defaultColumn,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const handleFilterChange = (e) => {
        const value = e.target.value || '';
        setFilter('contato', value);
        setFilterInput(value);
    };

    const navigate = useNavigate();

    const adicionar = () => {
        navigate('/cadastrar-contatos');
    };

    const handleEditar = (id) => {
        console.log('Editar ' + id);
    };

    const handleExcluir = (id) => {
        axios.delete(`${url}/contacts/${usuarioLogado.id}/${id}`)
            .then((response) => {
                setMensagemModalSuccess(response.data);
                setShowModalSuccess(true);
            })
            .catch((error) => {
                setMensagemModalAlert(error.message);
                setShowModalAlert(true);
            });
    };

    const handleCloseModalAlert = () => {
        setShowModalAlert(false);
    };

    const handleCloseModalSuccess = () => {
        setShowModalSuccess(false);
        window.location.reload();
    };

    return (
        <CenteredCard width="55rem" title="Contatos">

            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-3">
                    <Button variant="primary" onClick={adicionar}>Adicionar</Button>
                    <div className="form-group">
                        <input
                            type="text"
                            value={filterInput}
                            onChange={handleFilterChange}
                            placeholder="Buscar Contato"
                            className="form-control"
                        />
                    </div>
                </div>

                <Table {...getTableProps()} striped bordered>

                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
                                        title=""
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}

                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        if (cell.column.id === 'actions') {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    <div className="d-flex justify-content-between">
                                                        <Button variant="link" className="p-0" onClick={e => handleEditar(row.original.id)}>
                                                            <FaEdit />
                                                        </Button>
                                                        <Button variant="link" className="p-0" onClick={e => handleExcluir(row.original.id)}>
                                                            <FaTrash />
                                                        </Button>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <div className="pagination">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    <span>
                        Página{' '}
                        <strong>
                            {pageIndex + 1}
                        </strong>{' '}
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                </div>
            </div>

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

        </CenteredCard>
    );
}

export default ConsultarContatos;
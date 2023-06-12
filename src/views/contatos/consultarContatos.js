import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import CenteredCard from '../../components/card';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const data = [
    { id: 1, contato: 'Alice Mendes da Silva', telefone: '(11)12345-6789', email: 'alice.mendes.silva@example.com' },
    { id: 2, contato: 'Gabriel Santos Oliveira', telefone: '(22)98765-4321', email: 'gabriel.santos.oliveira@example.com' },
    { id: 3, contato: 'Sofia Costa Pereira', telefone: '(33)24680-1357', email: 'sofia.costa.pereira@example.com' },
    { id: 4, contato: 'Lucas Almeida Ribeiro', telefone: '(44)86420-9753', email: 'lucas.almeida.ribeiro@example.com' },
    { id: 5, contato: 'Isabella Ferreira Souza', telefone: '(55)13579-0246', email: 'isabella.ferreira.souza@example.com' },
    { id: 6, contato: 'Enzo Cardoso Rocha', telefone: '(66)97531-8642', email: 'enzo.cardoso.rocha@example.com' },
    { id: 7, contato: 'Valentina Rodrigues Castro', telefone: '(77)80246-3579', email: 'valentina.rodrigues.castro@example.com' },
    { id: 8, contato: 'Miguel Oliveira Santos', telefone: '(88)35791-8024', email: 'miguel.oliveira.santos@example.com' },
    { id: 9, contato: 'Laura Martins Lima', telefone: '(99)64208-7531', email: 'laura.martins.lima@example.com' },
    { id: 10, contato: 'Davi Barbosa Gomes', telefone: '(10)75319-6420', email: 'davi.barbosa.gomes@example.com' },
    { id: 11, contato: 'Matheus Carvalho Fernandes', telefone: '(21)90246-1537', email: 'matheus.carvalho.fernandes@example.com' },
    { id: 12, contato: 'Giovanna Ribeiro Pereira', telefone: '(32)61537-0246', email: 'giovanna.ribeiro.pereira@example.com' },
    { id: 13, contato: 'Pedro Castro Alves', telefone: '(43)40246-7531', email: 'pedro.castro.alves@example.com' },
    { id: 14, contato: 'Júlia Lima Costa', telefone: '(54)83197-6240', email: 'julia.lima.costa@example.com' },
    { id: 15, contato: 'Rafaela Sousa Cardoso', telefone: '(65)36420-9753', email: 'rafaela.sousa.cardoso@example.com' },
    { id: 16, contato: "Arthur Oliveira Costa", telefone: '(11)23456-7890', email: 'arthur.oliveira.costa@example.com' },
    { id: 17, contato: "Helena Pereira Almeida", telefone: '(22)87654-3210', email: 'helena.pereira.almeida@example.com' },
    { id: 18, contato: "Bernardo Souza Santos", telefone: '(33)46802-7531', email: 'bernardo.souza.santos@example.com' },
    { id: 19, contato: "Lara Ribeiro Ferreira", telefone: '(44)60248-9735', email: 'lara.ribeiro.ferreira@example.com' },
    { id: 20, contato: "Thiago Gomes Lima", telefone: '(55)79130-2468', email: 'thiago.gomes.lima@example.com' },
    { id: 21, contato: "Eduarda Rocha Cardoso", telefone: '(66)31579-4268', email: 'eduarda.rocha.cardoso@example.com' },
    { id: 22, contato: "Daniel Castro Rodrigues", telefone: '(77)80462-3957', email: 'daniel.castro.rodrigues@example.com' },
    { id: 23, contato: "Gabriela Santos Oliveira", telefone: '(88)37591-0426', email: 'gabriela.santos.oliveira@example.com' },
    { id: 24, contato: "Raul Lima Martins", telefone: '(99)24680-5317', email: 'raul.lima.martins@example.com' },
    { id: 25, contato: "Marina Mendes Silva", telefone: '(10)61953-2407', email: 'marina.mendes.silva@example.com' },
];

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

const handleEditar = () => {
    console.log('Editar');
};

const handleExcluir = () => {
    console.log('Excluir');
};

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
    const defaultColumn = {
        Filter: DefaultColumnFilter,
    };

    const [filterInput, setFilterInput] = useState('');

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
            data,
            defaultColumn,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const handleFilterChange = (e) => {
        const value = e.target.value || '';
        setFilter

            ('contato', value);
        setFilterInput(value);
    };

    const navigate = useNavigate();

    const adicionar = () => {
        navigate('/cadastrar-contatos');
    }

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
                                                        <Button variant="link" className="p-0" onClick={handleEditar}>
                                                            <FaEdit />
                                                        </Button>
                                                        <Button variant="link" className="p-0" onClick={handleExcluir}>
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
        </CenteredCard>
    );
}

export default ConsultarContatos;